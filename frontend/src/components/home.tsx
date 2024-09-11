"use client"
import { useAccount } from "wagmi";
import Modal from "@/components/modal/modal";
import { useState } from "react";
import Navbar from "@/components/navbar";
import { contract } from "@/backend/init";
import toast from "react-hot-toast";
import RegisterModal from "@/components/modal/register";
import Loader from "@/components/loader";
import DrugExplorer from "@/components/drugExplorer";


import { useQuery } from '@tanstack/react-query'
import { gql, request } from 'graphql-request'
const query = gql`{
  registeredManufacturers {
    name
  }
}`

const url = 'https://api.studio.thegraph.com/query/87766/drugledger/version/latest'

     

export default function HomePage() {
   const [close, setClose] = useState<boolean>(true)
   const account = useAccount()
   const [register, setRegister] = useState(true)
   const [registerDrug, setRegisterDrug] = useState(true)
   const [loading, setLoading] = useState<boolean>(false)
   const { data } = useQuery({
      queryKey: ['d'],
      async queryFn() {
        return await request(url, query)
      }
    })
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
         <div className="w-full md:h-[92vh] sm:h-[50rem] bg-white flex justify-center items-center overflow-hidden">
            <div className=" w-full h-full bg-blue-300 flex flex-col items-center hero pt-[20vh]">
               <h3 className="text-[4.5rem] max-sm:text-[2.5rem] text-center font-bold leading-tight w-[60vw] max-sm:w-full  text-[#ffffff] font-[cabinet] sh">Revolutionizing Drug Verification and Tracking</h3>
               <h2 className="text-xl text-center my-4 w-full md:w-[50vw] font-[clash]">Empowering Transparency and Trust in the Pharmaceutical Supply Chain with Blockchain Technology</h2>
               <button className="p-3 px-10 bg-[#DDD92A] shadow-lg text-black rounded-full m-2 flex justify-center items-center" onClick={handleSubmit} disabled={loading}>Register Here {loading && <Loader />}</button>
            </div>
         </div>
         <div className="w-full h-[30rem]  bg-blue-300 relative max-sm:pt-[5rem] ">
         <DrugExplorer />
         </div>
         <RegisterModal close={register} closeFn={setRegister} />
         <Modal close={registerDrug} closeFn={setRegisterDrug} />
      </main>
   );
}
