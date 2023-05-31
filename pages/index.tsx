import React, { useEffect, useRef, useState } from "react"
import { Inter } from "next/font/google"
import Image from "next/image"
import ProjectGweihir from "../public/Images/Project-Gwei-Logo.png"
import SimonSays from "../public/Images/Choose_Address_Pipes.png"
import MetaMask from "../public/Images/metamask-icon.png"
import { ethers } from "ethers"
import { useForm } from "react-hook-form"
import { CHAINLINK_JOB_ID, CONSUMER_ADDRESS, ORACLE_ADDRESS } from "@/app-constants"
import { GeneralConsumer__factory } from "@/types/__generated__/contracts"
import { KusamaQuery } from "@/types"
import { QueryCacheService } from "@/utils/query-cache-service"

const inter = Inter({ subsets: ["latin"] })

export interface IFormData {
  kusamaWallet: string
  blockOrHash: string
}
export default function Home() {
  const [signer, setSigner] = useState<ethers.JsonRpcSigner>()
  const [provider, setProvider] = useState<ethers.BrowserProvider | ethers.AbstractProvider>()
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [kusamaWallet, setKusamaWallet] = useState("")
  const [blockOrHash, setBlockOrHash] = useState("")
  const [kusamaBalance, setKusamaBalance] = useState<string>("")

  const cacheRef = useRef<QueryCacheService>()

  console.log("kusamaBalance:", kusamaBalance)

  const [queries, setQueries] = useState<KusamaQuery[]>([])

  const { register, handleSubmit } = useForm<IFormData>()

  useEffect(() => {
    cacheRef.current = QueryCacheService.createInstance()

    const queries = cacheRef.current.getAll()
    setQueries(queries)
  }, [])

  async function connectWallet() {
    if (!window.ethereum) {
      console.log("MetaMask not installed; using read-only defaults")
      return alert("MetaMask not installed") // TODO: Make more pretty
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum)

      setProvider(provider)

      const signer = await provider.getSigner()
      setSigner(signer)

      setIsWalletConnected(true)
    } catch (error) {
      alert("MetaMask did not connect.")
    }
  }

  const saveRequest = (query: KusamaQuery) => {
    // Save query request to local storage
    if (cacheRef.current) {
      cacheRef.current.save(query)
      setQueries(cacheRef.current.getAll())
    }
  }

  const updateRequest = (chainlinkId: string, query: Partial<KusamaQuery>) => {
    if (cacheRef.current) {
      cacheRef.current.update(chainlinkId, query)
      setQueries(cacheRef.current.getAll())
    }
  }

  /**
   * Request kusama account balance
   * TODO: Maybe set up contract only once at connect time instead of every time we request Kusama balance
   */
  async function requestBalance(kusamaAddress: string, kusamaBlockHash: string) {
    try {
      const contract = GeneralConsumer__factory.connect(CONSUMER_ADDRESS, signer)

      const oracleResponsePath = "data,free"

      const tx = await contract.requestValue(
        ORACLE_ADDRESS,
        CHAINLINK_JOB_ID,
        2,
        ["address", "blockHash", "path"],
        [kusamaWallet, blockOrHash, oracleResponsePath]
      )

      console.log("response", tx)
      console.log("value", tx.value.toString())
      console.log("response.data", tx.data)

      const rc = await tx.wait()
      console.log("rc", rc)
      const result = await rc?.getResult()

      console.log("result", result)

      // TODO: Check if this is actually the value we want (should be the chainlink request id)
      const chainlinkRequestId = tx.data

      const query: KusamaQuery = {
        // chainlinkRequestId: chainlinkRequestId, // TODO: Check this
        chainlinkRequestId,
        txId: tx.hash,
        kusamaBlock: blockOrHash,
        kusamaAccount: kusamaWallet,
        freePlank: tx.value.toString(),
      }

      saveRequest(query)

      // TODO: Record the query (including the transaction id) to local storage
      // create({ txId: result.hash, kusamaAccount: kusamaAddress, kusamaBlock: kusamaBlockHash })

      // Listen for the RequestKusamaAccountBalanceFulfilled event to be emitted
      contract.on(
        contract.getEvent("RequestUintValueFulfilled"),
        (_chainlinkRequestId, freePlank, event) => {
          console.log("event received", _chainlinkRequestId, freePlank, event)
          // Filter by Chainlink Request ID
          if (chainlinkRequestId === _chainlinkRequestId) {
            setKusamaBalance(freePlank.toString())
            updateRequest(chainlinkRequestId, {
              freePlank: freePlank.toString(),
            })

            // Stop listening for event
            event.removedEvent()
          }
        }
      )
      console.log("result", tx)
      // response.hash contains the Ethereum transaction id (can use to view on Etherscan)
    } catch (e) {
      console.error(e)
    }
  }
  // console.log("kusamaWallet:", kusamaWallet, "blockOrHash:", blockOrHash)

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between px-10 sm:px-24 pt-12 bg-gradient-to-b from-slate-600 to-slate-800 ${inter.className}`}
    >
      <div className='z-10 w-full max-w-5xl flex items-center justify-between text-sm'>
        <div className='flex flex-col'>
          <Image
            src={SimonSays}
            alt='SimonSays Logo'
            width={60}
            className='cursor-pointer invisible'
          />
          {/* <p>Connect</p> */}
        </div>
        <Image
          src={ProjectGweihir}
          alt='Project Gweihir Logo'
          width={384}
          placeholder='blur'
          blurDataURL={"../public/Images/Project-Gwei-Logo.png"}
        />

        <div className='flex flex-col'>
          <button onClick={connectWallet}>
            <Image src={MetaMask} alt='MetaMask Logo' width={60} className='cursor-pointer' />
          </button>
          <p>{isWalletConnected ? "Connected" : "Connect"}</p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit((data) => {
          localStorage.setItem("kusamaWallet", data.kusamaWallet)
          localStorage.setItem("blockOrHash", data.blockOrHash)
          setKusamaWallet(data.kusamaWallet)
          setBlockOrHash(data.blockOrHash)
          requestBalance(data.kusamaWallet, data.blockOrHash)
        })}
        className='flex flex-col justify-center align-middle'
      >
        <div>
          <div>
            <p className='text-gray-200 text-sm leading-4 pb-1'>Kusama wallet to query</p>
            {/* Should this be an autocomplete from Headless UI */}
            <input
              {...register("kusamaWallet")}
              className='pl-1.5 h-8 w-64 bg-slate-200 rounded-sm text-black'
            ></input>
          </div>

          <div>
            <p className='w-64 text-gray-200 text-sm leading-4 pb-1 mt-5'>
              Input block number or hash to query at (optional - most recent if empty)
            </p>
            {/* Should this be an autocomplete from Headless UI */}
            <input
              {...register("blockOrHash")}
              className='pl-1.5 h-8 w-64 bg-slate-200 rounded-sm text-black'
            ></input>
          </div>
        </div>
        <button
          disabled={!isWalletConnected}
          title={isWalletConnected ? "" : "Connect your wallet to execute"}
          type='submit'
          className={`mt-12 border-2 rounded p-2 ${isWalletConnected ? "" : "cursor-not-allowed"}`}
        >
          Execute
        </button>
      </form>

      <section className='flex flex-col gap-2 items-center'>
        <label className='text-gray-200 text-sm leading-4 pb-1' htmlFor='kusama-balance-result'>
          Query result
        </label>
        <input
          id='kusama-balance-result'
          readOnly
          value={kusamaBalance}
          className='p-4 w-64 bg-slate-200 rounded-sm text-black'
        />
      </section>

      <div className='border-2 rounded'>
        <table>
          <tbody>
            <tr>
              <th className='border-r-2 rounded px-2 py-1'>TX ID</th>
              <th className='border-r-2 rounded px-2 py-1'>Chainlink Request ID</th>
              <th className='border-r-2 rounded px-2 py-1'>Block hash</th>
              <th className='border-r-2 rounded px-2 py-1'>Wallet</th>
              <th className='px-2 py-1'>Balance</th>
            </tr>
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index}>
                <td id='txId' className='border-r-2 rounded px-2 py-1'>
                  {}
                </td>
                <td id='clReqId' className='border-r-2 rounded px-2 py-1'>
                  {}
                </td>
                <td id='blockHash' className='border-r-2 rounded px-2 py-1'>
                  {}
                </td>
                <td id='wallet' className='border-r-2 rounded px-2 py-1'>
                  {}
                </td>
                <td id='balance' className='px-2 py-1'>
                  {}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className='text-gray-200 pb-5 text-sm'>Learn more about Project Gweihir</p>
    </main>
  )
}
{
  /* {queries.map((query) => {
return (
  <tr key={query.txId}>
    <th>{query.txId}</th>
    <th>{query.chainlinkRequestId}</th>
    <th>{query.kusamaBlock}</th>
    <th>{query.kusamaAccount}</th>
    <th>{query.freePlank}</th>
  </tr>
)
})} */
}
{
  /* {queries.map((query) => {
return (
  <tr key={query.txId}>
    <th>{query.txId}</th>
    <th>{query.chainlinkRequestId}</th>
    <th>{query.kusamaBlock}</th>
    <th>{query.kusamaAccount}</th>
    <th>{query.freePlank}</th>
  </tr>
)
})} */
}
