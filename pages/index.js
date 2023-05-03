import React, { useState } from "react"
import { Inter } from "next/font/google"
import Image from "next/image"
import ProjectGweihir from "../public/Images/Project-Gwei-Logo.png"
import SimonSays from "../public/Images/Choose_Address_Pipes.png"
import MetaMask from "../public/Images/metamask-icon.png"

const inter = Inter({ subsets: ["latin"] })

const DoStuff = () => {
  if (typeof window !== "undefined" && window.ethereum !== undefined) {
    ethereum.request({ method: "eth_requestAccounts" })
  }
}
export default function Home() {
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
            as='image'
            className='cursor-pointer'
          />
          <p>Connect</p>
        </div>
        <Image
          src={ProjectGweihir}
          alt='Project Gweihir Logo'
          width={400}
          height={"auto"}
          placeholder='blur'
          blurDataURL={"../public/Images/Project-Gwei-Logo.png"}
          as='image'
        />
        <div className='flex flex-col'>
          <Image
            src={MetaMask}
            alt='MetaMask Logo'
            width={60}
            as='image'
            className='cursor-pointer'
            onClick={DoStuff}
          />
          <p>Connect</p>
        </div>
      </div>
      <div className='text-white pb-5 text-xs'>Learn more about Project Gweihir</div>
    </main>
  )
}
