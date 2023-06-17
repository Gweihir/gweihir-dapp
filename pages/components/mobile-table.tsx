import React, { useState } from "react"
import { KusamaQuery } from "@/types"
import CopyButton from "./copy-button"
import Pending from "./pending-animate"
import Waiting from "./waiting-animate"

interface MobileTableComponentProps {
  data: KusamaQuery[]
  pending: boolean
  waiting: boolean
}

const MobileTable: React.FC<MobileTableComponentProps> = ({ data, pending, waiting }) => {
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
      <div
        className={`flex flex-col justify-center items-center pb-12 transform duration-500 font-medium text-sm sm:text-base truncate mx-2`}
      >
        {data
          .slice(waiting ? -9 : -10)
          .reverse()
          .map((query, index) => (
            <div
              key={query.txId}
              className='rounded border-4 border-gray-600 mb-1 w-full animate-fade_in'
            >
              {/* top row */}
              <div className='flex flex-row h-1/3'>
                <div className={`px-1 py-1 truncate w-1/2`}>
                  <h1 className='flex flex-row justify-center items-center py-1 sm:py-3 line-clamp-1'>
                    {headings[0]}
                  </h1>

                  {waiting && (
                    <div className='py-1'>
                      <Waiting />
                    </div>
                  )}
                  {query.txId ? (
                    <a target='_blank' href={query.txId}>
                      <p className='justify-center text-md hover:text-accent truncate'>
                        {query.txId}
                      </p>
                    </a>
                  ) : (
                    <p>- -</p>
                  )}
                </div>
                <div
                  className={`transform duration-500 font-medium text-sm sm:text-base w-1/2 truncate`}
                >
                  <h1 className='flex flex-row justify-center items-center py-1 sm:py-3'>
                    {headings[1]}
                  </h1>

                  {waiting && (
                    <div className='py-1'>
                      <Waiting />
                    </div>
                  )}
                  <div key={query.txId} className={`px-1 py-1 w-full truncate`}>
                    {query.chainlinkRequestId ? (
                      <a className='truncate' target='_blank' href={query.chainlinkRequestId}>
                        <p className='justify-center text-md hover:text-accent truncate'>
                          {query.chainlinkRequestId}
                        </p>
                      </a>
                    ) : pending && index === 0 ? (
                      <div>
                        <Pending />
                      </div>
                    ) : (
                      <p className='justify-center flex'>- -</p>
                    )}
                  </div>
                </div>
              </div>

              {/* bottom row */}
              <div className='w-full flex flex-row justify-center h-1/3'>
                <div
                  className={`transform duration-500 font-medium text-sm sm:text-base truncate w-1/2`}
                >
                  <h1 className='flex flex-row justify-center items-center py-1 sm:py-3'>
                    {headings[2]}
                  </h1>
                  {waiting && (
                    <div className='py-1'>
                      <Waiting />
                    </div>
                  )}
                  <div key={query.txId} className={`px-1 py-1`}>
                    {query.kusamaBlock ? (
                      <a target='_blank' href={query.kusamaBlock}>
                        <p className='justify-center text-md hover:text-accent truncate'>
                          {query.kusamaBlock}
                        </p>
                      </a>
                    ) : (
                      <p className='flex justify-center'>- -</p>
                    )}
                  </div>
                </div>
                <div className='flex flex-row w-1/2'>
                  <div
                    className={`transform duration-500 font-medium text-sm sm:text-base truncate`}
                  >
                    <h1 className='flex flex-row justify-center items-center py-1 sm:py-3'>
                      {headings[3]}
                    </h1>
                    {waiting && (
                      <div className='py-1'>
                        <Waiting />
                      </div>
                    )}

                    <div key={query.txId} className={`px-1 py-1`}>
                      {query.kusamaAccount ? (
                        <a target='_blank' href={query.kusamaAccount}>
                          <p className='justify-center text-md hover:text-accent truncate'>
                            {query.kusamaAccount}
                          </p>
                        </a>
                      ) : (
                        <p className='flex justify-center'>- -</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className='w-full flex flex-row justify-center h-1/3'>
                <div className={`transform duration-500 font-medium text-sm sm:text-base truncate`}>
                  <h1 className='flex flex-row justify-center items-center py-1 sm:py-3'>
                    {headings[4]}
                  </h1>
                  {waiting && (
                    <div className='py-1'>
                      <Waiting />
                    </div>
                  )}
                  <div key={query.txId} className={`px-1 py-1 flex justify-center`}>
                    {query.freePlank ? (
                      <a target='_blank' href={plankConversion(query.freePlank)?.toString()}>
                        <div className='flex flex-row justify-center items-center hover:text-accent'>
                          <p className='text-md'>{reducedPlankConversion(query.freePlank)}</p>
                          <p className='text-[.5rem] sm:text-[.6rem] pl-0.5 flex items-center truncate'>
                            KSM
                          </p>
                        </div>
                      </a>
                    ) : pending && index === 0 ? (
                      <div>
                        <Pending />
                      </div>
                    ) : (
                      <p className='justify-center flex'>- -</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default MobileTable
