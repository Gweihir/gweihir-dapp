import React, { useState } from "react"
import { KusamaQuery } from "@/types"
import Pending from "./pending-animate"
import Waiting from "./waiting-animate"
import CopyButton from "./copy-button"

interface MobileTableComponentProps {
  data: KusamaQuery[]
  pending: boolean
  waiting: boolean
}

const MobileTable: React.FC<MobileTableComponentProps> = ({ data = [], pending, waiting }) => {
  const headings: string[] = [
    "Tx ID",
    "Chainlink Req ID",
    "KSM Block",
    "KSM Wallet",
    "Free Balance",
  ]

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
    return parseFloat(result.toFixed(3))
  }

  return (
    <div className='sm:hidden'>
      {waiting && (
        <div
          className={`flex flex-col-reverse justify-center items-center transform duration-500 font-medium text-sm sm:text-base`}
        >
          <div className='rounded border-4 border-slate-500 mb-4 w-full'>
            {/* top row */}
            <div className='flex flex-row h-1/3 border-b-2 border-slate-500'>
              <div className='w-1/2 bg-slate-700 border-r-2 border-slate-500'>
                <h1 className='flex flex-row justify-center py-1 sm:py-3'>{headings[0]}</h1>
                <div className='bg-slate-600 h-8 pt-1.5'>
                  <Waiting />
                </div>
              </div>
              <div className='font-medium w-1/2 truncate bg-slate-700'>
                <h1 className='flex flex-row justify-center py-1 sm:py-3'>{headings[1]}</h1>

                <div className={`bg-slate-600`}>
                  <div className='bg-slate-600 h-8 pt-1.5'>
                    <Waiting />
                  </div>
                </div>
              </div>
            </div>

            {/* Second row */}
            <div className='w-full flex flex-row h-1/3 border-b-2 border-slate-500'>
              <div className='w-1/2 bg-slate-700 border-r-2 border-slate-500'>
                <h1 className='flex flex-row justify-center items-center py-1'>{headings[2]}</h1>

                <div className={`px-1 bg-slate-600`}>
                  <div className='bg-slate-600 h-8 pt-1.5'>
                    <Waiting />
                  </div>
                </div>
              </div>
              <div className='w-1/2 truncate bg-slate-700'>
                <h1 className='flex flex-row justify-center py-1'>{headings[3]}</h1>

                <div className='bg-slate-600'>
                  <div className='bg-slate-600 h-8 pt-1.5'>
                    <Waiting />
                  </div>
                </div>
              </div>
            </div>
            {/* Final Row */}
            <div className=' flex flex-col justify-center h-1/3 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700'>
              <h1 className='flex flex-row justify-center items-center py-1.5'>{headings[4]}</h1>

              <div
                className={`h-8 py-1.5 flex justify-center bg-gradient-to-r from-slate-600 via-slate-700 to-slate-600`}
              >
                <Waiting />
              </div>
            </div>
          </div>
        </div>
      )}{" "}
      {/* BIFURCATION */}
      <div
        className={`flex flex-col-reverse justify-center items-center pb-12 transform duration-500 font-medium text-sm sm:text-base`}
      >
        {data.map((query) => (
          <div key={query.txId} className='rounded border-4 border-slate-500 mb-4 w-full'>
            {/* top row */}
            <div className='flex flex-row h-1/3 border-b-2 border-slate-500'>
              <div className='w-1/2 bg-slate-700 border-r-2 border-slate-500'>
                <h1 className='flex flex-row justify-center py-1 sm:py-3 text-white'>
                  {headings[0]}
                </h1>

                {query.txId ? (
                  <div className='bg-slate-600'>
                    <a
                      title='Link'
                      target='_blank'
                      href={process.env.NEXT_PUBLIC_SEPOLIA_ETHERSCAN_TX + query.txId}
                    >
                      <p className='mx-2 h-8 pt-1.5 text-md text-accent truncate'>{query.txId}</p>
                    </a>
                  </div>
                ) : (
                  <p className='text-white'>- -</p>
                )}
              </div>
              <div className='font-medium w-1/2 truncate bg-slate-700'>
                <h1 className='flex flex-row justify-center py-1 sm:py-3 text-white'>
                  {headings[1]}
                </h1>

                <div className={`bg-slate-600`}>
                  {query.chainlinkRequestId ? (
                    <CopyButton text={query.chainlinkRequestId}>
                      <p className='mx-2 pt-1.5 hover:text-gray-300 truncate h-8 text-white'>
                        {query.chainlinkRequestId}
                      </p>
                    </CopyButton>
                  ) : pending ? (
                    <div className='h-8 justify-center flex'>
                      <Pending />
                    </div>
                  ) : (
                    <p className='justify-center pt-1.5 flex h-8 text-white'>- -</p>
                  )}
                </div>
              </div>
            </div>

            {/* Second row */}
            <div className='w-full flex flex-row h-1/3 border-b-2 border-slate-500'>
              <div className='w-1/2 bg-slate-700 border-r-2 border-slate-500'>
                <h1 className='flex flex-row justify-center items-center py-1 text-white'>
                  {headings[2]}
                </h1>

                <div className={`px-1 ${!query.kusamaBlock && "py-1.5"} bg-slate-600`}>
                  {query.kusamaBlock ? (
                    <a
                      title='Link'
                      target='_blank'
                      href={process.env.NEXT_PUBLIC_KUSAMA_SUBSCAN_BLOCK + query.kusamaBlock}
                    >
                      <p className='mx-2 pt-1.5 text-md text-accent truncate h-8'>
                        {query.kusamaBlock}
                      </p>
                    </a>
                  ) : (
                    <p className='flex justify-center text-white'>- -</p>
                  )}
                </div>
              </div>
              <div className='w-1/2 truncate bg-slate-700'>
                <h1 className='flex flex-row justify-center py-1 sm:py-3 text-white'>
                  {headings[3]}
                </h1>

                <div className='bg-slate-600'>
                  {query.kusamaAccount ? (
                    <a
                      title='Link'
                      target='_blank'
                      href={process.env.NEXT_PUBLIC_KUSAMA_SUBSCAN_WALLET + query.kusamaAccount}
                    >
                      <p className='mx-2 pt-1.5 text-accent truncate h-8'>{query.kusamaAccount}</p>
                    </a>
                  ) : (
                    <p className='flex justify-center text-white'>- -</p>
                  )}
                </div>
              </div>
            </div>
            {/* Final Row */}
            <div className=' flex flex-col justify-center h-1/3 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700'>
              <h1 className='flex flex-row justify-center items-center py-1.5 text-white'>
                {headings[4]}
              </h1>

              <div
                className={`h-8 py-1.5 flex justify-center bg-gradient-to-r from-slate-600 via-slate-700 to-slate-600`}
              >
                {query.freePlank ? (
                  <CopyButton text={plankConversion(query.freePlank)?.toString()}>
                    <div className='flex flex-row justify-center items-center'>
                      <p className='hover:text-gray-300 text-white'>
                        {reducedPlankConversion(query.freePlank)}
                      </p>
                      <p className='text-[.6rem] pl-0.5 flex items-center truncate hover:text-gray-300 text-white'>
                        KSM
                      </p>
                    </div>
                  </CopyButton>
                ) : pending ? (
                  <div>
                    <Pending />
                  </div>
                ) : (
                  <p className='justify-center flex text-white'>- -</p>
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
