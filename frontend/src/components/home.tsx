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
    console.log(data)
   const getManufacturer = async () => {
      const result = await contract.methods.getManufacturer(account.address).call()
      return result;
   }
   const handleSubmit = async () => {
      if (account.status === "disconnected") return toast.error("Account not connected")
      setLoading(true)
      try {
         const manu = await getManufacturer();
         console.log(manu)
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
               <h3 className="text-[2.5rem] text-center font-semibold leading-tight w-[80vw] font-gothic max-sm:w-full">Revolutionizing Healthcare with Blockchain</h3>
               <h2 className="text-xl text-center my-4 w-[40rem]">Secure, transparent, and patient-centric healthcare data sharing. Empower your health with trustless, decentralized technology</h2>
               <button className="p-3 px-10 bg-[#ff7d00] shadow-lg text-black rounded-full m-2 flex justify-center items-center" onClick={handleSubmit} disabled={loading}>Register Here {loading && <Loader />}</button>
            </div>
         </div>
         <div className="w-full h-[30rem]  bg-white relative">
         <DrugExplorer />
         </div>
         <RegisterModal close={register} closeFn={setRegister} />
         <Modal close={registerDrug} closeFn={setRegisterDrug} />
      </main>
   );
}
