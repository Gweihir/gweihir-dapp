import { ethers } from "ethers"

declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider
  }
}

export interface KusamaQuery {
  /** Treat as primary key. What's returned from submitting the Ethereum transaction (e.g., "x0f61567373726162623") */
  txId: string
  /** Kusama block hash */
  kusamaBlock: string
  /** Hash of account */
  kusamaAccount: string
  /** The Chainlink request id */
  chainlinkRequestId?: string
  /** The Kusama account balance in plank */
  freePlank?: string
}
