import React, { useState } from "react"
import { Inter } from "next/font/google"
import Image from "next/image"
import ProjectGweihir from "../public/Images/Project-Gwei-Logo.png"
import SimonSays from "../public/Images/Choose_Address_Pipes.png"
import MetaMask from "../public/Images/metamask-icon.png"
import { ethers } from "ethers"
import { useForm } from "react-hook-form"
import { Consumer__factory } from "@/types/contracts"
import { CHAINLINK_JOB_ID, CONSUMER_ADDRESS, ORACLE_ADDRESS } from "@/app-constants"
// import { create, update } from "@/utils"

const inter = Inter({ subsets: ["latin"] })

export interface IFormData {
  kusamaWallet: string
  blockOrHash: string
}

export default function Home() {
  const [signer, setSigner] = useState<ethers.JsonRpcSigner>()
  const [provider, setProvider] = useState<ethers.BrowserProvider | ethers.AbstractProvider>()
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [kusamaWallet, setKusamaWallet] = useState("")
  const [blockOrHash, setBlockOrHash] = useState("")
  const [kusamaBalance, setKusamaBalance] = useState<string>("")

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

  // TODO: Maybe set up contract only once at connect time instead of every time we request Kusama balance
  async function execute(kusamaAddress: string, kusamaBlockHash: string) {
    try {
      const contract = Consumer__factory.connect(CONSUMER_ADDRESS, signer)
      const result = await contract.requestKusamaAccountBalance(
        ORACLE_ADDRESS,
        CHAINLINK_JOB_ID,
        kusamaAddress,
        kusamaBlockHash
      )
      // TODO: Record the query (including the transaction id) to local storage
      // create({ txId: result.hash, kusamaAccount: kusamaAddress, kusamaBlock: kusamaBlockHash })

      // Listen for the RequestKusamaAccountBalanceFulfilled event to be emitted
      contract.on(
        contract.getEvent("RequestKusamaAccountBalanceFulfilled"),
        (requestId, freePlank, event) => {
          console.log("event received", requestId, freePlank, event)
          setKusamaBalance(freePlank.toString())
          // event.removedEvent()
          // update(result.hash, {
          //   freePlank: freePlank.toString(),
          // })
        }
      )
      console.log("result", result)
    } catch (e) {
      console.error(e)
    }
  }
  console.log("kusamaWallet:", kusamaWallet, "blockOrHash:", blockOrHash)

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
            className='cursor-pointer invisible'
          />
          {/* <p>Connect</p> */}
        </div>
        <Image
          src={ProjectGweihir}
          alt='Project Gweihir Logo'
          width={384}
          placeholder='blur'
          blurDataURL={"../public/Images/Project-Gwei-Logo.png"}
        />

        <div className='flex flex-col'>
          <button onClick={connectWallet}>
            <Image src={MetaMask} alt='MetaMask Logo' width={60} className='cursor-pointer' />
          </button>
          <p>{isWalletConnected ? "Connected" : "Connect"}</p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit((data) => {
          localStorage.setItem("kusamaWallet", data.kusamaWallet)
          localStorage.setItem("blockOrHash", data.blockOrHash)
          setKusamaWallet(data.kusamaWallet)
          setBlockOrHash(data.blockOrHash)
          execute(data.kusamaWallet, data.blockOrHash)
        })}
        className='flex flex-col justify-center align-middle'
      >
        <div>
          <p className='text-gray-200 text-sm leading-4 pb-1'>Kusama wallet to query</p>
          {/* Should this be an autocomplete from Headless UI */}
          <input
            {...register("kusamaWallet")}
            className='pl-1.5 h-8 w-64 bg-slate-200 rounded-sm text-black'
          ></input>
        </div>

        <div>
          <p className='w-64 text-gray-200 text-sm leading-4 pb-1 mt-24'>
            Input block number or hash to query at (optional - most recent if empty)
          </p>
          {/* Should this be an autocomplete from Headless UI */}
          <input
            {...register("blockOrHash")}
            className='pl-1.5 h-8 w-64 bg-slate-200 rounded-sm text-black'
          ></input>
        </div>
        <button
          disabled={!isWalletConnected}
          title={isWalletConnected ? "" : "Connect your wallet to execute"}
          type="submit"
          className={`mt-4 border-2 rounded p-2 ${
            isWalletConnected ? "" : "cursor-not-allowed"
          }`}
        >
          Execute
        </button>
      </form>

      <section className='flex flex-col gap-2 items-center'>
        <label className='text-gray-200 text-sm leading-4 pb-1' htmlFor='kusama-balance-result'>
          Query result
        </label>
        <input
          id="kusama-balance-result"
          readOnly
          value={kusamaBalance}
          className="p-4 text-black"
        />
      </section>

      <p className='text-gray-200 pb-5 text-sm'>Learn more about Project Gweihir</p>
    </main>
  )
}
