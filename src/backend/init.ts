import Web3 from "web3";
import abi from "./contract/drugLedger.json"

let address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
let web3: any;
let contract: any;
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
   web3 = new Web3(window.ethereum);
   contract = new web3.eth.Contract(abi.abi, address)
} else {
   const provider = new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_OPTIMISM_SEPOLIA_RPC_URL as string);
   web3 = new Web3(provider);
   contract = new web3.eth.Contract(abi.abi, address)
}


export { contract, web3}