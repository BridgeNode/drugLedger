"use client"
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Modal from "@/components/modal/modal";
import { useState } from "react";
import Navbar from "@/components/navbar";
import { contract } from "@/backend/init";
import toast from "react-hot-toast";


export default function Home() {
   const [close, setClose] = useState<boolean>(false)
   const account = useAccount()
   const getManufacturer = async () => {
      const result = await contract.methods.getManufacturer("0xf0830060f836B8d54bF02049E5905F619487989e").call()
      console.log(result)
   }

   return (
      <main className="flex min-h-screen flex-col items-center">
         <Navbar />
         <button onClick={() => setClose(!close)}>Open</button>
         <button onClick={() => getManufacturer()}>Get Manu</button>
         <Modal close={close} closeFn={setClose} />
      </main>
   );
}
