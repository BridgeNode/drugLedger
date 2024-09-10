"use client"
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Modal from "@/components/modal/modal";
import { useState } from "react";
import Navbar from "@/components/navbar";
import { contract } from "@/backend/init";
import toast from "react-hot-toast";
import RegisterModal from "@/components/modal/register";
import Loader from "@/components/loader";


export default function Home() {
   const [close, setClose] = useState<boolean>(true)
   const account = useAccount()
   const [register, setRegister] = useState(true)
   const [registerDrug, setRegisterDrug] = useState(true)
   const [loading, setLoading] = useState<boolean>(false)
   const getManufacturer = async () => {
      const result = await contract.methods.getManufacturer(account.address).call()
      return result;
   }
   const handleSubmit = async () => {
      if (account.status === "disconnected") return toast.error("Account not connected")
      setLoading(true)
      try {
         const manu = await getManufacturer();
         if (manu.name !== "") {
            setRegisterDrug(false)
         } else {
            setRegister(false)
         }
         setLoading(false)
      } catch(e) {
         console.log(e)
         setLoading(false)
      }
   }

   return (
      <main className="flex min-h-screen flex-col items-center">
         <Navbar />
         {/* <button onClick={() => setClose(!close)}>Open</button>
         <button onClick={() => getManufacturer()}>Get Manu</button> */}

         <div className="w-full h-[92vh] bg-white flex justify-center items-center">
            <div className="md:w-[80vw] w-full h-full bg-blue-300 flex flex-col items-center hero py-[30vh]">
               <h3 className="text-[2.5rem] text-center font-semibold leading-tight font-serif w-[80vw] max-sm:w-full">Revolutionizing Healthcare with Blockchain</h3>
               <h2 className="text-xl text-center my-4 w-[40rem]">Secure, transparent, and patient-centric healthcare data sharing. Empower your health with trustless, decentralized technology</h2>
               <button className="p-3 px-10 bg-[#ff7d00] shadow-lg text-black rounded-full m-2 flex justify-center items-center" onClick={handleSubmit} disabled={loading}>Register Here {loading && <Loader />}</button>
            </div>
         </div>
         <RegisterModal close={register} closeFn={setRegister} />
         <Modal close={registerDrug} closeFn={setRegisterDrug} />
      </main>
   );
}
