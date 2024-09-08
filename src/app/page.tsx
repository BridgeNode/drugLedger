"use client"
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Modal from "@/components/modal/modal";
import { useState } from "react";
export default function Home() {
   const [close, setClose] = useState<boolean>(false)
   const account = useAccount()
  return (
    <main className="flex min-h-screen flex-col items-center">
     <div className="w-full p-3 bg-gray-200 flex justify-between items-center px-10">
      <p className="font-semibold font-serif text-xl">DrugLedger</p>
     <ConnectButton />
     </div>
     <button onClick={() => setClose(!close)}>Open</button>
     <Modal close={close} closeFn={setClose} />
    </main>
  );
}
