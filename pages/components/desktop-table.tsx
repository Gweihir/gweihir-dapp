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

const DesktopTable: React.FC<DesktopTableComponentProps> = ({ data, pending, waiting }) => {
  const headings: string[] = ["Tx ID", "Req ID", "Block hash", "Wallet", "Balance"]

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
    <>
      <div className='flex justify-center'>
        <div className='flex flex-row border-2 border-gray-600 rounded mx-auto w-full lg:w-3/4 xl:w-2/3 sm:duration-200 sm:hover:scale-105 sm:mx-0'>
          <div
            className={`w-2/12 hover:w-7/12 transform duration-500 border-r-2 border-gray-500 font-medium text-sm sm:text-base truncate`}
          >
            <h1 className='border border-b-2 border-gray-600 flex flex-row justify-center items-center py-1 sm:py-3 line-clamp-1'>
              {headings[0]}
            </h1>

            {waiting && (
              <div className='py-1'>
                <Waiting />
              </div>
            )}
            {data
              .slice(waiting ? -9 : -10)
              .reverse()
              .map((query, index) => (
                <div
                  key={query.txId}
                  className={`px-1 py-1 ${index % 2 === 0 ? "bg-slate-600" : "bg-none"}`}
                >
                  {query.txId ? (
                    <CopyButton text={query.txId}>
                      <p className='justify-center text-md hover:text-accent truncate'>
                        {query.txId}
                      </p>
                    </CopyButton>
                  ) : (
                    <p>NA</p>
                  )}
                </div>
              ))}
          </div>
          <div
            className={`w-2/12 hover:w-6/12 transform duration-500 border-r-2 border-gray-500 font-medium text-sm sm:text-base truncate`}
          >
            <h1 className='flex flex-row justify-center items-center py-1 sm:py-3 border border-b-2 border-gray-600'>
              {headings[1]}
            </h1>
            {waiting && (
              <div className='py-1'>
                <Waiting />
              </div>
            )}
            {data
              .slice(waiting ? -9 : -10)
              .reverse()
              .map((query, index) => (
                <div
                  key={query.txId}
                  className={`px-1 py-1 ${index % 2 === 0 ? "bg-slate-600" : "bg-none"}`}
                >
                  {query.chainlinkRequestId ? (
                    <CopyButton text={query.chainlinkRequestId}>
                      <p className='justify-center text-md hover:text-accent truncate'>
                        {query.chainlinkRequestId}
                      </p>
                    </CopyButton>
                  ) : (
                    <p className='flex justify-center'>NA</p>
                  )}
                </div>
              ))}
          </div>
          <div
            className={`w-3/12 hover:w-7/12 transform duration-500 border-r-2 border-gray-500 font-medium text-sm sm:text-base truncate`}
          >
            <h1 className='border border-b-2 border-gray-600 flex flex-row justify-center items-center py-1 sm:py-3'>
              {headings[2]}
            </h1>
            {waiting && (
              <div className='py-1'>
                <Waiting />
              </div>
            )}
            {data
              .slice(waiting ? -9 : -10)
              .reverse()
              .map((query, index) => (
                <div
                  key={query.txId}
                  className={`px-1 py-1 ${index % 2 === 0 ? "bg-slate-600" : "bg-none"}`}
                >
                  {query.kusamaBlock ? (
                    <CopyButton text={query.kusamaBlock}>
                      <p className='justify-center text-md hover:text-accent truncate'>
                        {query.kusamaBlock}
                      </p>
                    </CopyButton>
                  ) : (
                    <p className='flex justify-center'>NA</p>
                  )}
                </div>
              ))}
          </div>
          <div
            className={`w-3/12 hover:w-6/12 transform duration-500 border-r-2 border-gray-500 font-medium text-sm sm:text-base truncate`}
          >
            <h1 className='border border-b-2 border-gray-600 flex flex-row justify-center items-center py-1 sm:py-3'>
              {headings[3]}
            </h1>
            {waiting && (
              <div className='py-1'>
                <Waiting />
              </div>
            )}
            {data
              .slice(waiting ? -9 : -10)
              .reverse()
              .map((query, index) => (
                <div
                  key={query.txId}
                  className={`px-1 py-1 ${index % 2 === 0 ? "bg-slate-600" : "bg-none"}`}
                >
                  {query.kusamaAccount ? (
                    <CopyButton text={query.kusamaAccount}>
                      <p className='justify-center text-md hover:text-accent truncate'>
                        {query.kusamaAccount}
                      </p>
                    </CopyButton>
                  ) : (
                    <p className='flex justify-center'>NA</p>
                  )}
                </div>
              ))}
          </div>
          <div
            className={`w-2/12 hover:w-[21%] transform duration-500 font-medium text-sm sm:text-base truncate`}
          >
            <h1 className='border border-b-2 border-gray-600 flex flex-row justify-center items-center py-1 sm:py-3'>
              {headings[4]}
            </h1>
            {waiting && (
              <div className='py-1'>
                <Waiting />
              </div>
            )}
            {data
              .slice(waiting ? -9 : -10)
              .reverse()
              .map((query, index) => (
                <div
                  key={query.txId}
                  className={`px-1 py-1 flex justify-center ${
                    index % 2 === 0 ? "bg-slate-600" : "bg-none"
                  }`}
                >
                  {query.freePlank ? (
                    <CopyButton text={plankConversion(query.freePlank)?.toString()}>
                      <div className='flex flex-row justify-center items-center hover:text-accent'>
                        <p className='text-md'>{reducedPlankConversion(query.freePlank)}</p>
                        <p className='text-[.5rem] sm:text-[.6rem] pl-0.5 flex items-center truncate'>
                          KSM
                        </p>
                      </div>
                    </CopyButton>
                  ) : pending ? (
                    <div>
                      <Pending />
                    </div>
                  ) : (
                    <p className='justify-center flex'>NA</p>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default DesktopTable
