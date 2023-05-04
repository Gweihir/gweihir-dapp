import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider;
  }
}

export interface KusamaQuery {
  txId: string; // what's returned from submitting the Ethereum transaction (e.g., "x0f61567373726162623")
  kusamaAccount: string; // Hash of account
  kusamaBlock: string; // block hash
  freePlank?: string; //  The Kusama account balance in plank
}
