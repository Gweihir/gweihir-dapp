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
import Pending from "./components/pending-animate"
import Waiting from "./components/waiting-animate"

export default function Home() {
  const [signer, setSigner] = useState<ethers.JsonRpcSigner>()
  const [provider, setProvider] = useState<ethers.BrowserProvider | ethers.AbstractProvider>()
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [kusamaBalance, setKusamaBalance] = useState<string>("")
  const [queries, setQueries] = useState<KusamaQuery[]>([])
  const [pending, setPending] = useState<boolean>(false)
  const [waiting, setWaiting] = useState<boolean>(false)
  const [balancePending, setBalancePending] = useState<boolean>(false)

  const cacheRef = useRef<QueryCacheService>()

  const { register, handleSubmit } = useForm<IFormData>()

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

  useEffect(() => {
    cacheRef.current = QueryCacheService.createInstance()

    try {
      const queries = cacheRef.current.getAll()
      setQueries(queries)
    } catch (error) {
      console.error("An error occurred:", error)
      return alert("An error has occurred.")
    }
  }, [balancePending])

  const saveRequest = (query: KusamaQuery) => {
    // Save query request to local storage
    if (cacheRef.current) {
      cacheRef.current.save(query)
      setQueries(cacheRef.current.getAll())
    }
  }

  const updateRequest = (chainlinkId: string, query: Partial<KusamaQuery>) => {
    if (cacheRef.current) {
      // setBalancePending(true)
      setPending(false)

      cacheRef.current.update(chainlinkId, query)
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
              // setBalancePending(false)
            }
          }
        )
      }
    } catch (e) {
      // TODO: Handle error
      console.error(e)
      setPending(false)
      setWaiting(false)
    }
  }

  function plankConversion(x: string | undefined): number | undefined {
    if (x === undefined) {
      return undefined
    }
    const result = parseFloat(x) / 10 ** 12
    return parseFloat(result.toString())
  }

  function reducedPlankConversion(x: string | undefined): number | undefined {
    if (x === undefined) {
      return undefined
    }
    const result = parseFloat(x) / 10 ** 12
    return parseFloat(result.toFixed(2))
  }

  return (
    <main
      className={`flex flex-col w-full min-h-screen px-0 sm:px-24 pt-12 bg-gradient-to-b from-slate-600 to-slate-800 ${inter.className}`}
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

          <div className='absolute left-[165px] xl:left-[500px] lg:left-[450px] sm:left-[400px] sm:top-1/4 top-[230px]'>
            <button onClick={connectWallet}>
              <Image src={MetaMask} alt='MetaMask Logo' width={60} className='cursor-pointer' />
            </button>
            <p>{isWalletConnected ? "Connected" : "Connect"}</p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit((data) => {
          // setWaiting(true)
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
          {/* {cacheRef.current.cache} */}
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
        </div>
      </form>

      <div className='flex flex-col justify-center border-2 border-gray-600 rounded break-all mx-auto w-full lg:w-2/3 xl:w-1/2 mt-12 sm:duration-200 sm:hover:scale-105 '>
        <table>
          <tbody>
            <tr className='px-0 bg-slate-800'>
              <th className='border-r-2 border-gray-500 px-2 py-3 font-medium text-sm truncate'>
                Tx ID
              </th>
              <th className='border-r-2 border-gray-500 px-2 py-3 font-medium text-sm truncate'>
                Req ID
              </th>
              <th className='border-r-2 border-gray-500 px-2 py-3 font-medium text-sm truncate'>
                Block hash
              </th>
              <th className='border-r-2 border-gray-500 px-2 py-3 font-medium text-sm truncate '>
                Wallet
              </th>
              <th className='px-2 py-3 w-24 font-medium text-sm truncate'>Balance</th>
            </tr>{" "}
            {waiting && (
              <>
                <tr>
                  <td className='border-r-2 bg-slate-600 border-gray-500 px-2'>
                    <Waiting />
                  </td>
                  <td className='border-r-2 bg-slate-600 border-gray-500 px-2'>
                    <Waiting />
                  </td>
                  <td className='border-r-2 bg-slate-600 border-gray-500 px-2'>
                    <Waiting />
                  </td>
                  <td className='border-r-2 bg-slate-600 border-gray-500 px-2'>
                    <Waiting />
                  </td>
                  <td className='px-2 bg-slate-600'>
                    <Waiting />
                  </td>
                </tr>
                {queries
                  .slice(-9)
                  .reverse()
                  .map((query, index) => (
                    <tr key={query.chainlinkRequestId}>
                      <td
                        className={`border-r-2 border-gray-500 px-2 py-1 ${
                          index % 2 !== 0 ? "bg-slate-600" : "bg-none"
                        }`}
                      >
                        <p className='line-clamp-1'>{query.txId}</p>
                      </td>
                      <td
                        className={`border-r-2 border-gray-500 px-2 py-1 ${
                          index % 2 !== 0 ? "bg-slate-600" : "bg-none"
                        }`}
                      >
                        <p className='line-clamp-1'>{query.chainlinkRequestId}</p>
                      </td>
                      <td
                        className={`border-r-2 border-gray-500 px-2 py-1 ${
                          index % 2 !== 0 ? "bg-slate-600" : "bg-none"
                        }`}
                      >
                        <p className='line-clamp-1'>{query.kusamaBlock}</p>
                      </td>
                      <td
                        className={`border-r-2 border-gray-500 px-2 py-1 ${
                          index % 2 !== 0 ? "bg-slate-600" : "bg-none"
                        }`}
                      >
                        <p className='line-clamp-1'>{query.kusamaAccount}</p>
                      </td>
                      <td className={`px-2 py-1' ${index % 2 !== 0 ? "bg-slate-600" : "bg-none"}`}>
                        <div className='flex flex-row justify-center'>
                          <p className='w-7/10 line-clamp-1'>{plankConversion(query.freePlank)}</p>
                        </div>
                      </td>
                    </tr>
                  ))}
              </>
            )}
            {pending && (
              <>
                {/* <tr>
                  <td className='border-r-2 bg-slate-600 border-gray-500 px-2'>
                    <Pending />
                  </td>
                  <td className='border-r-2 bg-slate-600 border-gray-500 px-2'>
                    <Pending />
                  </td>
                  <td className='border-r-2 bg-slate-600 border-gray-500 px-2'>
                    <Pending />
                  </td>
                  <td className='border-r-2 bg-slate-600 border-gray-500 px-2'>
                    <Pending />
                  </td>
                  <td className='px-2 bg-slate-600'>
                    <Pending />
                  </td>
                </tr> */}
                {queries
                  .slice(-10)
                  .reverse()
                  .map((query, index) => (
                    <tr key={query.chainlinkRequestId}>
                      <td
                        className={`border-r-2 border-gray-500 px-2 py-1 ${
                          index % 2 !== 0 ? "bg-slate-600" : "bg-none"
                        }`}
                      >
                        <p className='line-clamp-1'>{query.txId}</p>
                      </td>
                      <td
                        className={`border-r-2 border-gray-500 px-2 py-1 ${
                          index % 2 !== 0 ? "bg-slate-600" : "bg-none"
                        }`}
                      >
                        <p className='line-clamp-1'>{query.chainlinkRequestId}</p>
                      </td>
                      <td
                        className={`border-r-2 border-gray-500 px-2 py-1 ${
                          index % 2 !== 0 ? "bg-slate-600" : "bg-none"
                        }`}
                      >
                        <p className='line-clamp-1'>{query.kusamaBlock}</p>
                      </td>
                      <td
                        className={`border-r-2 border-gray-500 px-2 py-1 ${
                          index % 2 !== 0 ? "bg-slate-600" : "bg-none"
                        }`}
                      >
                        <p className='line-clamp-1'>{query.kusamaAccount}</p>
                      </td>
                      <td className={`px-2 py-1' ${index % 2 !== 0 ? "bg-slate-600" : "bg-none"}`}>
                        <div className='flex flex-row justify-center'>
                          {query.freePlank ? (
                            <p className='w-7/10 line-clamp-1'>
                              {plankConversion(query.freePlank)}
                            </p>
                          ) : (
                            <div>
                              <Pending />
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </>
            )}
            {!pending &&
              !waiting &&
              queries
                .slice(-10)
                .reverse()
                .map((query, index) => (
                  <tr key={query.chainlinkRequestId}>
                    <td
                      className={`border-r-2 border-gray-500 px-2 py-1 ${
                        index % 2 === 0 ? "bg-slate-600" : "bg-none"
                      }`}
                    >
                      {query.txId ? (
                        <CopyButton text={query.txId}>
                          <p className='line-clamp-1 text-md hover:text-accent'>{query.txId}</p>
                        </CopyButton>
                      ) : (
                        <p className='flex justify-center'>NA</p>
                      )}
                    </td>
                    <td
                      className={`border-r-2 border-gray-500 px-2 py-1 ${
                        index % 2 === 0 ? "bg-slate-600" : "bg-none"
                      }`}
                    >
                      {query.chainlinkRequestId ? (
                        <CopyButton text={query.chainlinkRequestId}>
                          <p className='line-clamp-1 text-md hover:text-accent'>
                            {query.chainlinkRequestId}
                          </p>
                        </CopyButton>
                      ) : (
                        <p className='flex justify-center'>NA</p>
                      )}
                    </td>
                    <td
                      className={`border-r-2 border-gray-500 px-2 py-1 ${
                        index % 2 === 0 ? "bg-slate-600" : "bg-none"
                      }`}
                    >
                      {query.kusamaBlock ? (
                        <CopyButton text={query.kusamaBlock}>
                          <p className='justify-center line-clamp-1 text-md hover:text-accent'>
                            {query.kusamaBlock}
                          </p>
                        </CopyButton>
                      ) : (
                        <p className='flex justify-center'>NA</p>
                      )}
                    </td>
                    <td
                      className={`border-r-2 border-gray-500 px-2 py-1 ${
                        index % 2 === 0 ? "bg-slate-600" : "bg-none"
                      }`}
                    >
                      {" "}
                      {query.kusamaAccount ? (
                        <CopyButton text={query.kusamaAccount}>
                          <p className='line-clamp-1 text-md pr-1 hover:text-accent cursor-pointer'>
                            {query.kusamaAccount}
                          </p>
                        </CopyButton>
                      ) : (
                        <p className='justify-center flex'>NA</p>
                      )}
                    </td>
                    <td
                      className={`px-1 py-1 flex justify-center ${
                        index % 2 === 0 ? "bg-slate-600" : "bg-none"
                      }`}
                    >
                      {query.freePlank ? (
                        <CopyButton text={plankConversion(query.freePlank)?.toString()}>
                          <div className='flex flex-row justify-center items-center hover:text-accent'>
                            <p className='line-clamp-1 text-md'>
                              {reducedPlankConversion(query.freePlank)}
                            </p>
                            <p className='text-[.5rem] pt-1.5 pl-0.5'>KSM</p>
                          </div>
                        </CopyButton>
                      ) : (
                        <p className='justify-center flex'>NA</p>
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <a
        href='https://www.gweihir.io'
        target='_blank'
        className='text-gray-200 hover:text-accent pb-5 text-sm text-center mx-auto pt-12'
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
