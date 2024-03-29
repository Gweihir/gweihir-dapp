export const LINK_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_LINK_TOKEN_ADDRESS || ""
export const ORACLE_ADDRESS = process.env.NEXT_PUBLIC_ORACLE_ADDRESS || ""
export const CHAINLINK_JOB_ID = process.env.NEXT_PUBLIC_CHAINLINK_JOB_ID || ""
export const CONSUMER_ADDRESS = process.env.NEXT_PUBLIC_CONSUMER_ADDRESS || ""

if (!LINK_TOKEN_ADDRESS) {
  throw new Error("Link token address is required!")
}

if (!ORACLE_ADDRESS) {
  throw new Error("Oracle address is required!")
}

if (!CHAINLINK_JOB_ID) {
  throw new Error("Chainlink job id is required!")
}

if (!CONSUMER_ADDRESS) {
  throw new Error("Consumer smart contract address is required!")
}
