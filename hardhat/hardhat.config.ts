import { HardhatUserConfig } from "hardhat/config";
import * as dotenvenc from "@chainlink/env-enc"
dotenvenc.config()
import "@nomicfoundation/hardhat-toolbox";

const LISK_SEPOLIA_RPC_URL = process.env.LISK_SEPOLIA_RPC_URL
const ARBITRUM_SEPOLIA_RPC_URL = process.env.ARBITRUM_SEPOLIA_RPC_URL
const OPTIMISM_SEPOLIA_RPC_URL =process.env.OPTIMISM_SEPOLIA_RPC_URL
const ACCOUNTS = process.env.PRIVATE_KEY;
const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
   liskSepolia: {
      url: LISK_SEPOLIA_RPC_URL || "",
      accounts: ACCOUNTS ? [ACCOUNTS] : [],
      chainId: 4202
   },
   arbitrumSepolia:{
      url: ARBITRUM_SEPOLIA_RPC_URL || "",
      accounts: ACCOUNTS ? [ACCOUNTS] : [],
      chainId: 421614
   },
   optimismSepolia:{
      url: OPTIMISM_SEPOLIA_RPC_URL || "",
      accounts: ACCOUNTS ? [ACCOUNTS] : [],
      chainId: 11155420
   },
  },
  etherscan: {
   apiKey: "123",
   customChains: [
      {
         network: "liskSepolia",
         chainId: 4202,
         urls: {
            apiURL: "https://sepolia-blockscout.lisk.com/api",
            browserURL: "https://sepolia-blockscout.lisk.com"
         }
      },
      {
         network: "optimismSepolia",
         chainId: 11155420,
         urls: {
            apiURL: "https://optimism-sepolia.blockscout.com/api",
            browserURL: "https://optimism-sepolia.blockscout.com/"
         }
      }
   ]
  },
  sourcify: {
   enabled: false
  }
};

export default config;
