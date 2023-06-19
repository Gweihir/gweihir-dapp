import React, { useState } from "react"
import { KusamaQuery } from "@/types"
import CopyButton from "./copy-button"
import Pending from "./pending-animate"
import Waiting from "./waiting-animate"

interface DesktopTableComponentProps {
  data: KusamaQuery[]
  pending: boolean
  waiting: boolean
}

const DesktopTable: React.FC<DesktopTableComponentProps> = ({ data = [], pending, waiting }) => {
  const headings: string[] = [
    "Tx ID",
    "Chainlink Req ID",
    "KSM Block",
    "KSM Wallet",
    "Free Balance",
  ]
  const reversedData = [...data].reverse()

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
    <div
      className={`hidden sm:flex justify-center pb-12 ${
        data.length === 0 && !waiting && "invisible"
      }`}
    >
      <div className='flex flex-row border-4 border-slate-600 rounded mx-auto w-full lg:w-3/4 xl:w-2/3 sm:duration-200 sm:hover:scale-105 sm:mx-0'>
        <div
          className={`w-2/12 hover:w-7/12 transform duration-500 border-r-2 border-slate-500 font-medium text-sm sm:text-base truncate`}
        >
          <h1 className='border border-b-2 border-slate-600 flex flex-row justify-center items-center py-1 sm:py-3 line-clamp-1 text-white'>
            {headings[0]}
          </h1>

          {waiting && (
            <div className='py-1 bg-slate-600'>
              <Waiting />
            </div>
          )}
          {reversedData.map((query, index) => (
            <div
              key={query.txId}
              className={`px-1 py-1 ${
                waiting
                  ? index % 2 !== 0
                    ? "bg-slate-600"
                    : "bg-none"
                  : index % 2 === 0
                  ? "bg-slate-600"
                  : "bg-none"
              }`}
            >
              {query.txId ? (
                <a
                  target='_blank'
                  title='Link'
                  href={process.env.NEXT_PUBLIC_SEPOLIA_ETHERSCAN_TX + query.txId}
                >
                  <p className='justify-center text-md text-accent hover:text-white truncate'>
                    {query.txId}
                  </p>
                </a>
              ) : (
                <p>- -</p>
              )}
            </div>
          ))}
        </div>
        <div
          className={`w-3/12 hover:w-6/12 transform duration-500 border-r-2 border-slate-500 font-medium text-sm sm:text-base truncate`}
        >
          <h1 className='flex flex-row justify-center items-center py-1 sm:py-3 border border-b-2 border-slate-600 text-white'>
            {headings[1]}
          </h1>
          {waiting && (
            <div className='py-1 bg-slate-600'>
              <Waiting />
            </div>
          )}
          {reversedData.map((query, index) => (
            <div
              key={query.txId}
              className={`px-1 py-1 ${
                waiting
                  ? index % 2 !== 0
                    ? "bg-slate-600"
                    : "bg-none"
                  : index % 2 === 0
                  ? "bg-slate-600"
                  : "bg-none"
              }`}
            >
              {query.chainlinkRequestId ? (
                <CopyButton text={query.chainlinkRequestId}>
                  <p className='justify-center text-md hover:text-gray-300 text-white truncate'>
                    {query.chainlinkRequestId}
                  </p>
                </CopyButton>
              ) : pending && index === 0 ? (
                <div>
                  <Pending />
                </div>
              ) : (
                <p className='justify-center flex text-white'>- -</p>
              )}
            </div>
          ))}
        </div>
        <div
          className={`w-2/12 hover:w-7/12 transform duration-500 border-r-2 border-slate-500 font-medium text-sm sm:text-base truncate`}
        >
          <h1 className='border border-b-2 border-slate-600 flex flex-row justify-center items-center py-1 sm:py-3 text-white'>
            {headings[2]}
          </h1>
          {waiting && (
            <div className='py-1 bg-slate-600'>
              <Waiting />
            </div>
          )}
          {reversedData.map((query, index) => (
            <div
              key={query.txId}
              className={`px-1 py-1 ${
                waiting
                  ? index % 2 !== 0
                    ? "bg-slate-600"
                    : "bg-none"
                  : index % 2 === 0
                  ? "bg-slate-600"
                  : "bg-none"
              }`}
            >
              {query.kusamaBlock ? (
                <a
                  target='_blank'
                  title='Link'
                  href={process.env.NEXT_PUBLIC_KUSAMA_SUBSCAN_BLOCK + query.kusamaBlock}
                >
                  <p className='justify-center text-md text-accent hover:text-white truncate'>
                    {query.kusamaBlock}
                  </p>
                </a>
              ) : (
                <p className='flex justify-center'>- -</p>
              )}
            </div>
          ))}
        </div>
        <div
          className={`w-3/12 hover:w-6/12 transform duration-500 border-r-2 border-slate-500 font-medium text-sm sm:text-base truncate`}
        >
          <h1 className='border border-b-2 border-slate-600 flex flex-row justify-center items-center py-1 sm:py-3 text-white'>
            {headings[3]}
          </h1>
          {waiting && (
            <div className='py-1 bg-slate-600'>
              <Waiting />
            </div>
          )}
          {reversedData.map((query, index) => (
            <div
              key={query.txId}
              className={`px-1 py-1 ${
                waiting
                  ? index % 2 !== 0
                    ? "bg-slate-600"
                    : "bg-none"
                  : index % 2 === 0
                  ? "bg-slate-600"
                  : "bg-none"
              }`}
            >
              {query.kusamaAccount ? (
                <a
                  target='_blank'
                  title='Link'
                  href={process.env.NEXT_PUBLIC_KUSAMA_SUBSCAN_WALLET + query.kusamaAccount}
                >
                  <p className='justify-center text-md text-accent hover:text-white truncate'>
                    {query.kusamaAccount}
                  </p>
                </a>
              ) : (
                <p className='flex justify-center text-white'>- -</p>
              )}
            </div>
          ))}
        </div>
        <div
          className={`w-2/12 hover:w-[21%] transform duration-500 font-medium text-sm sm:text-base truncate`}
        >
          <h1 className='border border-b-2 border-slate-600 flex flex-row justify-center items-center py-1 sm:py-3 text-white'>
            {headings[4]}
          </h1>
          {waiting && (
            <div className='py-1 bg-slate-600'>
              <Waiting />
            </div>
          )}
          {reversedData.map((query, index) => (
            <div
              key={query.txId}
              className={`px-1 py-1 flex justify-center ${
                waiting
                  ? index % 2 !== 0
                    ? "bg-slate-600"
                    : "bg-none"
                  : index % 2 === 0
                  ? "bg-slate-600"
                  : "bg-none"
              }`}
            >
              {query.freePlank ? (
                <CopyButton text={plankConversion(query.freePlank)?.toString()}>
                  <div className='flex flex-row justify-center items-center hover:text-gray-300 text-white'>
                    <p className='text-md hover:text-gray-300 text-white'>
                      {reducedPlankConversion(query.freePlank)}
                    </p>
                    <p className='text-[.5rem] sm:text-[.6rem] pl-0.5 flex items-center truncate hover:text-gray-300 text-white'>
                      KSM
                    </p>
                  </div>
                </CopyButton>
              ) : pending && index === 0 ? (
                <div>
                  <Pending />
                </div>
              ) : (
                <p className='justify-center flex text-white'>- -</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DesktopTable
