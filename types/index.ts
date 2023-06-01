import { ethers } from "ethers"

declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider
  }
}

export interface KusamaQuery {
  /** treat as primary key */
  chainlinkRequestId: string
  /** what's returned from submitting the Ethereum transaction (e.g., "x0f61567373726162623") */
  txId: string
  /** Kusama block hash */
  kusamaBlock: string
  /** Hash of account */
  kusamaAccount: string
  /** The Kusama account balance in plank */
  freePlank?: string
}
