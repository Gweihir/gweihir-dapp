import React, { useEffect, useRef, useState } from "react"
import { Inter } from "next/font/google"
import Image from "next/image"
import ProjectGweihir from "../public/Images/Project-Gwei-Logo.png"
import MetaMask from "../public/Images/metamask-icon.png"
import { EventLog, ethers } from "ethers"
import { useForm } from "react-hook-form"
import { CHAINLINK_JOB_ID, CONSUMER_ADDRESS, ORACLE_ADDRESS } from "@/app-constants"
import { GeneralConsumer__factory } from "@/types/__generated__/contracts"
import { KusamaQuery } from "@/types"
import { QueryCacheService } from "@/utils/query-cache-service"
import CopyButton from "./components/copy-button"
import spinnerOne from "../public/Images/spinner_01.png"
import spinnerTwo from "../public/Images/spinner_02.png"

export default function Home() {
  const [signer, setSigner] = useState<ethers.JsonRpcSigner>()
  const [provider, setProvider] = useState<ethers.BrowserProvider | ethers.AbstractProvider>()
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [kusamaBalance, setKusamaBalance] = useState<string>("")

  const cacheRef = useRef<QueryCacheService>()

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

      // Propose the transaction to the user
      const tx = await contract.requestValue(
        ORACLE_ADDRESS, // _oracle
        CHAINLINK_JOB_ID, // _jobId
        2, // resultType UINT_REQUEST_TYPE
        ["address", "blockHash", "path"], // requestParamNames
        [kusamaAddress, kusamaBlockHash, oracleResponsePath] // requestParamValues
      )

      console.log("tx", tx)

      const receipt = await tx.wait()

      if (receipt) {
        // Get the Chainlink request id from the "ChainlinkRequested" event which can be found
        // in the transaction receipt's logs
        const chainlinkRequestedEvent = receipt.logs
          .filter((log): log is EventLog => log instanceof EventLog)
          .find((log) => {
            const eventName = contract.getEvent("ChainlinkRequested").name

            return (
              // Double checking that event is from the correct address
              log.address === CONSUMER_ADDRESS && log.fragment.name === eventName
            )
          })

        const chainlinkRequestId = chainlinkRequestedEvent?.topics[1]
        console.log("requestId", chainlinkRequestId)

        if (!chainlinkRequestId) {
          // TODO: Handle missing Chainlink request id
          return
        }

        const query: KusamaQuery = {
          chainlinkRequestId,
          txId: tx.hash,
          kusamaBlock: kusamaBlockHash,
          kusamaAccount: kusamaAddress,
        }

        saveRequest(query)

        // Listen for the RequestUintValueFulfilled event to be emitted for the specific Chainlink request id
        contract.on(
          contract.getEvent("RequestUintValueFulfilled"),
          (_chainlinkRequestId, freePlank, event) => {
            console.log("event received", _chainlinkRequestId, freePlank, event)
            // Filter by Chainlink request id
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
      }
    } catch (e) {
      // TODO: Handle error
      console.error(e)
    }
  }

  return (
    <main
      className={`flex flex-col w-full min-h-screen px-10 sm:px-24 pt-12 bg-gradient-to-b from-slate-600 to-slate-800 ${inter.className}`}
    >
      <div className='z-10 w-full text-sm flex justify-center'>
        <div className='relative'>
          <Image
            src={ProjectGweihir}
            alt='Project Gweihir Logo'
            width={384}
            placeholder='blur'
            blurDataURL={"../public/Images/Project-Gwei-Logo.png"}
          />

          <div className='absolute left-[165px] xl:left-[500px] lg:left-[450px] sm:left-[400px] top-[290px] sm:top-1/4 transform -translate-y-1/2'>
            <button onClick={connectWallet}>
              <Image src={MetaMask} alt='MetaMask Logo' width={60} className='cursor-pointer' />
            </button>
            <p>{isWalletConnected ? "Connected" : "Connect"}</p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit((data) => {
          localStorage.setItem("kusamaWallet", data.kusamaWallet)
          localStorage.setItem("blockOrHash", data.blockOrHash)
          requestBalance(data.kusamaWallet, data.blockOrHash)
        })}
        className='flex flex-col pt-[135px] sm:pt-12'
      >
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full flex flex-col items-center'>
            <p className='text-gray-200 text-sm leading-4 pb-1'>Kusama wallet to query</p>
            {/* Should this be an autocomplete from Headless UI */}
            <input
              {...register("kusamaWallet")}
              className='pl-1.5 h-8 w-full sm:w-96 md:w-7/12 lg:w-1/2 xl:w-1/3 bg-slate-200 rounded-sm text-black'
            ></input>
          </div>

          <div className='w-full flex flex-col justify-center items-center'>
            <p className='text-gray-200 text-sm leading-4 pb-1 mt-5'>
              Block number or hash to query at (optional)
            </p>
            {/* Should this be an autocomplete from Headless UI */}
            <input
              {...register("blockOrHash")}
              className='pl-1.5 h-8 w-full sm:w-96 md:w-7/12 lg:w-1/2 xl:w-1/3 bg-slate-200 rounded-sm text-black'
            ></input>
          </div>
          <button
            disabled={!isWalletConnected}
            title={isWalletConnected ? "" : "Connect your wallet to execute"}
            type='submit'
            className={`mt-12 border-2 rounded p-2 w-full sm:w-96 ${
              isWalletConnected ? "" : "cursor-not-allowed"
            }`}
          >
            Execute
          </button>
          <div className='pt-10'>
            <Image
              className='animate-spin-slower'
              src={spinnerOne}
              alt='Loading spinner'
              width={20}
              height={20}
            />
          </div>
          <div className='pt-10'>
            <Image
              className='animate-spin-slow'
              src={spinnerTwo}
              alt='Loading spinner'
              width={20}
              height={20}
            />
          </div>
        </div>
      </form>

      <div className='flex flex-col justify-center border-2 rounded break-all mx-auto w-full lg:w-2/3 xl:w-1/2 mt-12'>
        <table>
          <tbody>
            <tr className='bg-slate-600'>
              <th className='border-r-2 px-2 py-1'>TX ID</th>
              <th className='border-r-2 px-2 py-1'>
                <p>Chainlink</p>
                <p>Request ID</p>
              </th>
              <th className='border-r-2 px-2 py-1'>Block hash</th>
              <th className='border-r-2 px-2 py-1'>Wallet</th>
              <th className='px-2 py-1 w-24'>Balance</th>
            </tr>
            {queries.map((query) => (
              <tr key={query.chainlinkRequestId}>
                <td className='border-r-2 px-2 py-1'>
                  <p className='line-clamp-1'>{query.txId}</p>
                </td>
                <td className='border-r-2 px-2 py-1'>
                  <p className='line-clamp-1'>{query.chainlinkRequestId}</p>
                </td>
                <td className='border-r-2 px-2 py-1'>
                  <p className='line-clamp-1'>{query.kusamaBlock}</p>
                </td>
                <td className='border-r-2 px-2 py-1'>
                  <p className='line-clamp-1'>{query.kusamaAccount}</p>
                </td>
                <td className='px-2 py-1'>
                  <div className='flex flex-row '>
                    <p className='w-7/10 line-clamp-1'>{query.freePlank}</p>
                    <p className='flex flex-col items-center'>
                      {query.freePlank && <CopyButton text={query.freePlank} />}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className='text-gray-200 pb-5 text-sm fixed bottom-0 left-0 right-0 text-center mx-auto'>
        Learn more about Project Gweihir
      </p>
    </main>
  )
}

const inter = Inter({ subsets: ["latin"] })

export interface IFormData {
  kusamaWallet: string
  blockOrHash: string
}
