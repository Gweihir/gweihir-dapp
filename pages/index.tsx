import React, { useEffect, useRef, useState } from "react"
import { Inter } from "next/font/google"
import Image from "next/image"
import ProjectGweihir from "../public/Images/Project-Gwei-Logo.png"
import MetaMask from "../public/Images/metamask-connect.png"
import MetaMaskRed from "../public/Images/metamask-red-connect.png"
import { EventLog, ethers } from "ethers"
import { useForm } from "react-hook-form"
import { CHAINLINK_JOB_ID, CONSUMER_ADDRESS, ORACLE_ADDRESS } from "@/app-constants"
import { GeneralConsumer__factory } from "@/types/__generated__/contracts"
import { KusamaQuery } from "@/types"
import { QueryCacheService } from "@/utils/query-cache-service"
import DesktopTable from "./components/desktop-table"

export default function Home() {
  const [signer, setSigner] = useState<ethers.JsonRpcSigner>()
  const [provider, setProvider] = useState<ethers.BrowserProvider | ethers.AbstractProvider>()
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [kusamaBalance, setKusamaBalance] = useState<string>("")
  const [queries, setQueries] = useState<KusamaQuery[]>([])
  const [pending, setPending] = useState<boolean>(false)
  const [waiting, setWaiting] = useState<boolean>(false)

  const cacheRef = useRef<QueryCacheService>()

  const { register, handleSubmit, formState } = useForm<IFormData>()
  const { errors, touchedFields } = formState
  // console.log("touchedFields", touchedFields)
  // console.log("errors", errors)

  async function connectWallet(shouldPromptOnNoAccounts = false) {
    if (!window.ethereum) {
      console.log("MetaMask not installed; using read-only defaults")
      return alert("MetaMask not installed") // TODO: Make more pretty
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum)

      setProvider(provider)

      const accounts = await provider.listAccounts()

      console.log("provider.ready", provider.ready)
      // console.log("provider.hasSigner", provider.hasSigner)
      console.log("provider.listAccounts", accounts)
      console.log("provider.listenerCount", await provider.listenerCount())
      // provider.getAvatar()

      provider.ready

      if (shouldPromptOnNoAccounts && !accounts.length) {
        return
      }

      const signer = await provider.getSigner()
      setSigner(signer)

      setIsWalletConnected(true)
    } catch (error) {
      console.error(error)
      alert("MetaMask did not connect.")
    }
  }

  useEffect(() => {
    connectWallet(true)
  }, [])

  useEffect(() => {
    cacheRef.current = QueryCacheService.createInstance()

    try {
      const queries = cacheRef.current.getAll()
      setQueries(queries)
    } catch (error) {
      console.error("An error occurred:", error)
      return alert("An error has occurred.")
    }
  }, [])

  const saveRequest = (query: KusamaQuery) => {
    // Save query request to local storage
    if (cacheRef.current) {
      cacheRef.current.save(query)
      setQueries(cacheRef.current.getAll())
    }
  }

  const updateRequest = (txId: string, query: Partial<KusamaQuery>) => {
    if (cacheRef.current) {
      // setBalancePending(true)
      setPending(false)

      cacheRef.current.update(txId, query)
      setQueries(cacheRef.current.getAll())
    }
  }
  /**
   * Request kusama account balance
   * TODO: Maybe set up contract only once at connect time instead of every time we request Kusama balance
   */
  async function requestBalance(kusamaAddress: string, kusamaBlockHash: string) {
    setWaiting(true)

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

      saveRequest({
        txId: tx.hash,
        kusamaBlock: kusamaBlockHash,
        kusamaAccount: kusamaAddress,
      })

      // Waiting for Ethereum blockchain to run the function
      const receipt = await tx.wait()
      setPending(true)
      setWaiting(false)
      if (receipt) {
        setPending(true)
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
          return alert("Chainlink request ID Missing.")
          // TODO: Handle missing Chainlink request id
        }

        // Save the Chainlink Request id
        updateRequest(tx.hash, {
          chainlinkRequestId,
        })

        // Listen for the RequestUintValueFulfilled event to be emitted for the specific Chainlink request id

        contract.on(
          contract.getEvent("RequestUintValueFulfilled"),
          (_chainlinkRequestId, freePlank, event) => {
            console.log("event received", _chainlinkRequestId, freePlank, event)
            // Filter by Chainlink request id
            if (chainlinkRequestId === _chainlinkRequestId) {
              setKusamaBalance(freePlank.toString())
              updateRequest(tx.hash, {
                freePlank: freePlank.toString(),
              })

              // Stop listening for event
              event.removedEvent()
              // setBalancePending(false)
            }
          }
        )
      }
    } catch (e) {
      // TODO: Handle error
      console.error(e)
    } finally {
      setPending(false)
      setWaiting(false)
    }
  }

  return (
    <main
      className={`flex flex-col w-full min-h-screen px-0 sm:px-24 pt-6 bg-gradient-to-b from-slate-600 to-slate-800 transform duration-300 ${inter.className}`}
    >
      <div className='flex flex-row justify-center'>
        <Image
          src={ProjectGweihir}
          alt='Project Gweihir Logo'
          placeholder='blur'
          blurDataURL={"../public/Images/Project-Gwei-Logo.png"}
          className='w-[20rem] lg:w-[25rem] transform duration-300'
        />
      </div>
      <div className='mx-auto sm:fixed flex flex-col pb-5 pt-3 justify-center items-center sm:right-16 transform duration-300'>
        {/* <p className='text-gray-200 text-sm'>{isWalletConnected ? "Connected" : "Connect"}</p> */}
        <button className='transform duration-300' onClick={() => connectWallet()}>
          {isWalletConnected ? (
            <Image
              src={MetaMask}
              alt='MetaMask Logo'
              width={100}
              className='cursor-default animate-fade_in'
            />
          ) : (
            <Image
              src={MetaMaskRed}
              alt='MetaMask Logo'
              width={100}
              className='animate-pulse opacity-80 hover:opacity-100 transform duration-300'
            />
          )}
        </button>
      </div>

      <form
        onSubmit={handleSubmit((data) => {
          // setWaiting(true)
          console.log("data")
          localStorage.setItem("kusamaWallet", data.kusamaWallet)
          localStorage.setItem("blockOrHash", data.blockOrHash)
          requestBalance(data.kusamaWallet, data.blockOrHash)
        })}
        className='flex flex-col'
      >
        <div className='flex flex-col items-center justify-center px-1'>
          <div className='w-full flex flex-col items-center'>
            <p className='text-gray-200 text-sm leading-4 pb-1'>Kusama wallet to query</p>
            {/* Should this be an autocomplete from Headless UI */}
            <input
              {...register("kusamaWallet", { required: true })}
              className='pl-1.5 h-8 w-full sm:w-96 md:w-7/12 lg:w-1/2 xl:w-1/3 bg-slate-200 rounded-sm text-black transform duration-300'
            />
            {touchedFields.kusamaWallet && errors.kusamaWallet && <p>Required</p>}
          </div>

          <div className='w-full flex flex-col justify-center items-center'>
            <p className='text-gray-200 text-sm leading-4 pb-1 mt-5'>
              Block number or hash to query at (optional)
            </p>
            {/* Should this be an autocomplete from Headless UI */}
            <input
              {...register("blockOrHash", { required: true })}
              className='pl-1.5 h-8 w-full sm:w-96 md:w-7/12 lg:w-1/2 xl:w-1/3 bg-slate-200 rounded-sm text-black transform duration-300'
            />
            {touchedFields.blockOrHash && errors.blockOrHash && <p>Required</p>}
          </div>
          {/* {cacheRef.current.cache} */}
          <button
            disabled={!isWalletConnected}
            title={isWalletConnected ? "" : "Connect your wallet to execute"}
            type='submit'
            className={`my-10 border-2 hover:border-accent hover:text-accent rounded p-2 w-full sm:w-96 transform duration-300 ${
              isWalletConnected ? "" : "cursor-not-allowed"
            }`}
          >
            Execute
          </button>
        </div>
      </form>

      <DesktopTable pending={pending} waiting={waiting} data={queries} />

      <a
        href='https://www.gweihir.io'
        target='_blank'
        className='text-gray-200 hover:text-accent pb-5 text-sm text-center mx-auto pt-4'
      >
        Learn more about Project Gweihir
      </a>
    </main>
  )
}

const inter = Inter({ subsets: ["latin"] })

export interface IFormData {
  kusamaWallet: string
  blockOrHash: string
}
