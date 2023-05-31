import { ethers } from "ethers"

declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider
  }
}

export interface KusamaQuery {
  chainlinkRequestId: string
  txId: string // treat as primary key - what's returned from submitting the Ethereum transaction (e.g., "x0f61567373726162623")
  kusamaBlock: string // block hash
  kusamaAccount: string // Hash of account
  freePlank?: string //  The Kusama account balance in plank
}
