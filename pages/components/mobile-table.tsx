import React, { useState } from "react"
import { KusamaQuery } from "@/types"
import Pending from "./pending-animate"
import Waiting from "./waiting-animate"

interface MobileTableComponentProps {
  data: KusamaQuery[]
  pending: boolean
  waiting: boolean
}

const MobileTable: React.FC<MobileTableComponentProps> = ({ data = [], pending, waiting }) => {
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
    <div className='sm:hidden'>
      {waiting && (
        <div className='flex flex-col-reverse justify-center items-center transform duration-500 font-medium text-sm sm:text-base mx-2'>
          <div className='rounded border-4 border-gray-600 mb-1 w-full'>
            {/* top row */}
            <div className='flex flex-row h-1/3'>
              <div className='px-1 py-1 truncate w-1/2'>
                <h1 className='flex flex-row justify-center items-center py-1 sm:py-3'>
                  {headings[0]}
                </h1>

                <div className='py-1'>
                  <Waiting />
                </div>
              </div>
              <div
                className={`transform duration-500 font-medium text-sm sm:text-base w-1/2 truncate`}
              >
                <h1 className='flex flex-row justify-center items-center py-1 sm:py-3'>
                  {headings[1]}
                </h1>

                <div className='py-1'>
                  <Waiting />
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
                <div className='py-1'>
                  <Waiting />
                </div>
              </div>

              <div className='flex flex-row w-1/2'>
                <div className={`transform duration-500 font-medium text-sm sm:text-base truncate`}>
                  <h1 className='flex flex-row justify-center items-center py-1 sm:py-3'>
                    {headings[3]}
                  </h1>
                  <div className='py-1'>
                    <Waiting />
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full flex flex-row justify-center h-1/3'>
              <div className={`transform duration-500 font-medium text-sm sm:text-base truncate`}>
                <h1 className='flex flex-row justify-center items-center py-1 sm:py-3'>
                  {headings[4]}
                </h1>
                <div className='py-1'>
                  <Waiting />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BIFURCATION */}

      <div
        className={`flex flex-col-reverse justify-center items-center pb-12 transform duration-500 font-medium text-sm sm:text-base`}
      >
        {data.map((query) => (
          <div key={query.txId} className='rounded border-4 border-slate-500 mb-4 w-full'>
            {/* top row */}
            <div className='flex flex-row h-1/3 border-b-2 border-slate-500'>
              <div className='w-1/2 bg-slate-700 border-r-2 border-slate-500'>
                <h1 className='flex flex-row justify-center py-1 sm:py-3'>{headings[0]}</h1>

                {query.txId ? (
                  <div className='bg-slate-600'>
                    <a target='_blank' href={query.txId}>
                      <p className='mx-2 h-8 pt-1.5 text-md hover:text-accent truncate'>
                        {query.txId}
                      </p>
                    </a>
                  </div>
                ) : (
                  <p>- -</p>
                )}
              </div>
              <div className='font-medium w-1/2 truncate bg-slate-700'>
                <h1 className='flex flex-row justify-center py-1 sm:py-3'>{headings[1]}</h1>

                <div className={`bg-slate-600`}>
                  {query.chainlinkRequestId ? (
                    <a target='_blank' href={query.chainlinkRequestId}>
                      <p className='mx-2 pt-1.5 hover:text-accent truncate h-8'>
                        {query.chainlinkRequestId}
                      </p>
                    </a>
                  ) : pending ? (
                    <div>
                      <Pending />
                    </div>
                  ) : (
                    <p className='justify-center flex'>- -</p>
                  )}
                </div>
              </div>
            </div>

            {/* Second row */}
            <div className='w-full flex flex-row h-1/3 border-b-2 border-slate-500'>
              <div className='w-1/2 bg-slate-700 border-r-2 border-slate-500'>
                <h1 className='flex flex-row justify-center items-center py-1'>{headings[2]}</h1>

                <div className={`px-1 ${!query.kusamaBlock && "py-1.5"} bg-slate-600`}>
                  {query.kusamaBlock ? (
                    <a target='_blank' href={query.kusamaBlock}>
                      <p className='mx-2 pt-1.5 text-md hover:text-accent truncate h-8'>
                        {query.kusamaBlock}
                      </p>
                    </a>
                  ) : (
                    <p className='flex justify-center'>- -</p>
                  )}
                </div>
              </div>
              <div className='w-1/2 truncate bg-slate-700'>
                <h1 className='flex flex-row justify-center py-1 sm:py-3'>{headings[3]}</h1>

                <div className='bg-slate-600'>
                  {query.kusamaAccount ? (
                    <a target='_blank' href={query.kusamaAccount}>
                      <p className='mx-2 pt-1.5 hover:text-accent truncate h-8'>
                        {query.kusamaAccount}
                      </p>
                    </a>
                  ) : (
                    <p className='flex justify-center'>- -</p>
                  )}
                </div>
              </div>
            </div>
            {/* Final Row */}
            <div className='flex flex-col justify-center h-1/3 py-1 bg-gradient-to-r from-slate-600 via-slate-700 to-slate-600'>
              <h1 className='flex flex-row justify-center'>{headings[4]}</h1>

              <div key={query.txId} className={`px-1 flex justify-center`}>
                {query.freePlank ? (
                  <a target='_blank' href={plankConversion(query.freePlank)?.toString()}>
                    <div className='flex flex-row justify-center items-center hover:text-accent'>
                      <p>{reducedPlankConversion(query.freePlank)}</p>
                      <p className='text-[.6rem] pl-0.5 flex items-center truncate'>KSM</p>
                    </div>
                  </a>
                ) : pending ? (
                  <div>
                    <Pending />
                  </div>
                ) : (
                  <p className='justify-center flex'>- -</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MobileTable
