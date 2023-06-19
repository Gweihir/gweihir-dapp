import React, { useCallback, useEffect, useRef, useState } from "react"
import { Inter } from "next/font/google"
import Image from "next/image"
import ProjectGweihir from "../public/Images/Project-Gwei-Logo.png"
import MetaMask from "../public/Images/metamask-connect.png"
import MetaMaskRed from "../public/Images/metamask-red-connect.png"
import Spinner from "../public/Images/spinner_07.png"
import { EventLog, ethers } from "ethers"
import { useForm } from "react-hook-form"
import {
  CHAINLINK_JOB_ID,
  CONSUMER_ADDRESS,
  LINK_TOKEN_ADDRESS,
  ORACLE_ADDRESS,
} from "@/app-constants"
import { GeneralConsumer__factory, LinkToken__factory } from "@/types/__generated__/contracts"
import { KusamaQuery, RequestUintValueFulfilledEvent } from "@/types"
import { QueryCacheService } from "@/utils/query-cache-service"
import DesktopTable from "./components/desktop-table"
import MobileTable from "./components/mobile-table"

export default function Home() {
  const [signer, setSigner] = useState<ethers.JsonRpcSigner>()
  const [provider, setProvider] = useState<ethers.BrowserProvider>()
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [queries, setQueries] = useState<KusamaQuery[]>([])
  const [pending, setPending] = useState<boolean>(false)
  const [waiting, setWaiting] = useState<boolean>(false)
  const [isInitiated, setIsInitiated] = useState(false)

  const cacheRef = useRef<QueryCacheService>()
  const latestChainlinkRequestIdRef = useRef<string>()

  const { register, handleSubmit, formState } = useForm<IFormData>()
  const { errors, touchedFields } = formState

  /**
   * Listen for the RequestUintValueFulfilled event to be emitted and filter for pending Chainlink requests.
   * Update the query with the latest Kusama balance on a match.
   */
  const chainlinkFulfilledListener = useCallback((runner: ethers.ContractRunner) => {
    const contract = GeneralConsumer__factory.connect(CONSUMER_ADDRESS, runner)

    const callback = (
      _chainlinkRequestId: string,
      freePlank: bigint,
      event: RequestUintValueFulfilledEvent
    ) => {
      console.log("event received", _chainlinkRequestId, freePlank, event)

      const foundMatch = cacheRef.current
        ?.getAllPendingChainlinkRequestIds()
        .includes(_chainlinkRequestId)

      // Filter by Chainlink request id
      if (foundMatch) {
        console.log("got Kusama balance", freePlank.toString())

        updateRequestByChainlinkRequestId(_chainlinkRequestId, {
          freePlank: freePlank.toString(),
        })

        // If this is the latest Chainlink request id, then stop pending UI
        if (latestChainlinkRequestIdRef.current === _chainlinkRequestId) {
          setPending(false)
        }

        // Stop listening for event
        event.removedEvent()
        // setBalancePending(false)
      }
    }

    const eventName = contract.getEvent("RequestUintValueFulfilled")

    contract.on(eventName, callback)

    return () => {
      contract.off(eventName, callback)
    }
  }, [])

  /**
   * On initial mount:
   * - Check if window.ethereum is available
   * - Set up provider
   * - Attempt to auto-connect wallet
   * - Set up event listener for fulfilled Chainlink requests events
   */
  useEffect(() => {
    if (!window.ethereum) {
      console.log("MetaMask not installed; using read-only defaults")
      return alert("MetaMask not installed") // TODO: Make more pretty
    }
    const provider = new ethers.BrowserProvider(window.ethereum)

    // Attempt to "auto-connect" wallet
    provider.listAccounts().then(async (accounts) => {
      if (!accounts.length) return
      const signer = await provider.getSigner()
      setSigner(signer)
      setIsWalletConnected(true)
    })

    setProvider(provider)

    const unsubscribe = chainlinkFulfilledListener(provider)

    return () => {
      unsubscribe()
    }
  }, [chainlinkFulfilledListener])

  // Addresses disconnect issue
  const checkPendingQueries = useCallback(
    async (provider: ethers.BrowserProvider, queries: KusamaQuery[]) => {
      const contract = GeneralConsumer__factory.connect(CONSUMER_ADDRESS, provider)

      queries
        .filter((query): query is KusamaQuery & { chainlinkRequestId: string } => {
          return !!query.chainlinkRequestId && query.freePlank === undefined
        })
        .map(async (query) => {
          const [result, isSet] = await contract.getUintRequestResult(query.chainlinkRequestId)
          console.log("lookup for", query.chainlinkRequestId, result, isSet)

          if (isSet) {
            updateRequestByChainlinkRequestId(query.chainlinkRequestId, {
              freePlank: result.toString(),
            })
          }
        })
    },
    []
  )

  /**
   * Set up the query cache on initial mount
   */
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

  // Check for pending queries if/when the user connects their wallet
  useEffect(() => {
    ;(async () => {
      if (isInitiated) return
      if (!provider) return
      if (!queries.length) return

      try {
        const accounts = await provider.listAccounts()

        if (!accounts.length) return

        checkPendingQueries(provider, queries)
      } catch (e) {
        console.error(e)
      }

      setIsInitiated(true)
    })()
  }, [queries, provider, isInitiated, checkPendingQueries])

  /**
   * Prompt user to connect their wallet if not already connected
   */
  async function connectWallet() {
    if (!provider) return

    try {
      const signer = await provider.getSigner()
      setSigner(signer)

      setIsWalletConnected(true)
    } catch (error) {
      console.error(error)
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

  const updateRequestByTxId = (txId: string, query: Partial<KusamaQuery>) => {
    if (cacheRef.current) {
      // setBalancePending(true)

      cacheRef.current.updateByTxId(txId, query)
      setQueries(cacheRef.current.getAll())
    }
  }

  const updateRequestByChainlinkRequestId = (
    chainlinkRequestId: string,
    query: Partial<Omit<KusamaQuery, "chainlinkRequestId">>
  ) => {
    if (cacheRef.current) {
      cacheRef.current.updateByChainlinkReqId(chainlinkRequestId, query)
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
      /**
       * Have end user approve GeneralConsumer smart contract to transfer LINK from end user
       * @see https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-approve-address-uint256-
       */
      const linkContract = LinkToken__factory.connect(LINK_TOKEN_ADDRESS, signer)
      const approvalTx = await linkContract.approve(CONSUMER_ADDRESS, BigInt("10000000000000000"))
      console.log("approvalTx", approvalTx)
      const approvalReceipt = await approvalTx.wait()
      console.log("approvalReceipt", approvalReceipt)

      const contract = GeneralConsumer__factory.connect(CONSUMER_ADDRESS, signer)

      const oracleResponsePath = "data,free"

      // Propose the transaction to the user
      const tx = await contract.requestValue(
        ORACLE_ADDRESS, // _oracle
        CHAINLINK_JOB_ID, // _jobId
        2, // resultType UINT_REQUEST_TYPE
        ["address", "block", "path"], // requestParamNames
        [kusamaAddress, kusamaBlockHash, oracleResponsePath] // requestParamValues
      )
      console.log("tx", tx)
      setWaiting(false)
      setPending(true)

      saveRequest({
        txId: tx.hash,
        kusamaBlock: kusamaBlockHash,
        kusamaAccount: kusamaAddress,
      })

      // Waiting for Ethereum blockchain to run the function
      const receipt = await tx.wait()
      console.log("receipt", receipt)

      setPending(true)
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

        latestChainlinkRequestIdRef.current = chainlinkRequestId

        if (!chainlinkRequestId) {
          return alert("Chainlink request ID Missing.")
          // TODO: Handle missing Chainlink request id
        }

        // Save the Chainlink Request id
        updateRequestByTxId(tx.hash, {
          chainlinkRequestId,
        })
      }
    } catch (e) {
      // TODO: Handle error
      console.error(e)
      setPending(false)
    } finally {
      setWaiting(false)
    }
  }

  return (
    <main
      className={`flex flex-col w-full min-h-screen px-0 sm:px-24 pt-12 bg-gradient-to-b from-slate-600 to-slate-800 transform duration-300 ${inter.className}`}
    >
      <div className='flex flex-row justify-center'>
        <Image
          src={ProjectGweihir}
          alt='Project Gweihir Logo'
          placeholder='blur'
          blurDataURL={"../public/Images/Project-Gwei-Logo.png"}
          className='w-[20rem] lg:w-[25rem] transform duration-300 sm:pb-16'
        />
      </div>
      <div className='mx-auto sm:fixed flex flex-col pb-7 pt-6 justify-center items-center sm:right-16 transform duration-300'>
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
          console.log("data")
          localStorage.setItem("kusamaWallet", data.kusamaWallet)
          localStorage.setItem("blockOrHash", data.blockOrHash)
          requestBalance(data.kusamaWallet, data.blockOrHash)
        })}
        className='flex flex-row justify-center'
      >
        <div className='flex flex-col items-center border-4 border-slate-500 sm:border-slate-600 justify-center px-2 bg-slate-700 mb-8 sm:mb-12 rounded mx-auto w-full lg:w-3/4 xl:w-2/3 sm:duration-200 sm:mx-0 h-96'>
          {!pending && !waiting ? (
            <>
              <h1 className='text-accent sm:text-lg lg:text-xl leading-4 pb-6 sm:pb-6'>
                Query KSM wallet on ETH Blockchain
              </h1>
              <div className='w-full flex flex-col items-center'>
                <p className='text-gray-200 text-sm leading-4 pb-1'>Kusama wallet to query</p>
                {/* Should this be an autocomplete from Headless UI */}
                <input
                  {...register("kusamaWallet", { required: true })}
                  className='pl-1.5 h-8 w-full sm:w-[27rem] bg-slate-200 rounded-sm text-black transform duration-300'
                />
                {touchedFields.kusamaWallet && errors.kusamaWallet && <p>Required</p>}
              </div>

              <div className='w-full flex flex-col justify-center items-center'>
                <p className='text-gray-200 text-sm leading-4 pb-1 mt-5'>
                  Block number or hash to query at (optional)
                </p>
                {/* Should this be an autocomplete from Headless UI */}
                <input
                  {...register("blockOrHash")}
                  className='pl-1.5 h-8 w-full sm:w-[27rem] bg-slate-200 rounded-sm text-black transform duration-300'
                />
                {touchedFields.blockOrHash && errors.blockOrHash && <p>Required</p>}
              </div>
              <button
                disabled={!isWalletConnected}
                title={isWalletConnected ? "" : "Connect your wallet to execute"}
                type='submit'
                className={`mt-7 border-2 hover:border-accent hover:text-accent rounded p-2 w-full sm:w-96 transform duration-300 ${
                  isWalletConnected ? "" : "cursor-not-allowed"
                }`}
              >
                Execute
              </button>
            </>
          ) : (
            <>
              <h1 className='pb-5 text-accent text-2xl font-semibold'>Request Initiated</h1>
              <Image alt='spinner' src={Spinner} width={40} className='animate-spin-slower' />
              <p className='pb-3 pt-5 px-4 w-full sm:w-96 text-center'>
                While you wait, please do not refresh the screen and be sure to observe the prompts
                coming from your MetaMask extension.
              </p>
              <p className=' pt-3 px-4 w-full sm:w-96 text-center text-sm text-accent'>
                * Minimum Spending Cap: 0.01 LINK
              </p>
            </>
          )}
          <button
            className={`text-slate-900 hover:bg-accent active:bg-thirdinary rounded-md bg-primary font-bold text-center mx-auto px-3 py-1 ${
              pending && waiting && "mt-5 mb-3"
            } mt-7 mb-1`}
          >
            <a href='https://faucets.chain.link/sepolia' target='_blank'>
              Get Testnet Tokens
            </a>
          </button>
          <a
            href='https://www.gweihir.io'
            target='_blank'
            className={`text-gray-200 hover:text-accent text-sm text-center mx-auto ${
              pending && waiting && "pt-5 pb-3"
            } pt-4`}
          >
            Learn more about Project Gweihir
          </a>
        </div>
      </form>
      {/**
       * TODO: Add link to subscan or polkadot app tools to verify Kusama balance matches dApp result for given block hash
       */}

      <MobileTable pending={pending} waiting={waiting} data={queries} />
      <DesktopTable pending={pending} waiting={waiting} data={queries} />
    </main>
  )
}

const inter = Inter({ subsets: ["latin"] })

export interface IFormData {
  kusamaWallet: string
  blockOrHash: string
}
