"use client"
import React, { useRef, useState } from 'react'
import Header from '../header'
import Closure from './closure'
import { useAccount } from 'wagmi'
import toast from "react-hot-toast"
import { contract } from '@/backend/init'
import Loader from '../loader'
import FinalizeModal from './finalize'
import { selectRandomDrugs } from '../../../sample'

const Modal = ({ close, closeFn }: { close: boolean, closeFn: Function }) => {
   const account = useAccount()
   const [url, setUrl] = useState<string>()
   const [fields, setFields] = useState({
      drugName: "",
      genericName: "",
      dosageForm: "",
      dosageStrength: "",
      batchNumber: "",
      manufacturingDate: "",
      expirationDate: "",
      certificateNumber: "",
      qualityControl: "",
      uniqueIdentifier: ""
   })
   const [loading, setloading] = useState(false);
   const [cid, setCid] = useState();

   const handleChange = (e: any) => {
      setFields({ ...fields, [e.target.name]: e.target.value })
   }
   const handleRegister = async () => {
      setloading(true)
      if (account.status === "disconnected") {
         toast.error("Account not connected")
         return setloading(false)
      }
      try {
         const id = await uploadFile();
         setUrl(`${window.location.href}drug/${id}`)
         setloading(false)
      } catch (error) {
         console.log(error)
         setloading(false)
      }
   }

   const uploadFile = async () => {
      try {
         const uploadRequest = await fetch("/api/files", {
            method: "POST",
            body: JSON.stringify(fields),
         });
         const results = await uploadRequest.json();
         setCid(results.url);
         const id = await contract.methods.registerDrug(results.cid).send({ from: account.address })
         toast.success(`Drug Registered`)
         return await id.events.RegisteredDrug.returnValues.drugId;
      } catch (e) {
         console.log(e);
      }
   };

   const handleGenerate = () => {
      const selected = selectRandomDrugs()
      setFields({...selected})
   }
   return (
      <>
         <FinalizeModal url={url} setUrl={setUrl}/>
         <Closure close={close} closeFn={closeFn}>
            <div className='w-[85vw] md:w-[80vw] max-h-[90vh] lg:w-[40vw] xl:[w-50vw] h-fit bg-white rounded-md p-5 shadow-sm'>
               <Header title='Register Drug' />
               <div className='w-full flex justify-end'>

               <button className='p-1 px-3 bg-sky-00 rounded-md border-2 border-solid border-blue-400 text-sm' onClick={handleGenerate}>Random</button>
               </div>
               <div className='overflow-auto'>
                  <div className='flex flex-col mb-2'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Drug Name</p>
                     <input type="text" name="drugName" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='Enter Drug name' onChange={(e) => handleChange(e)} value={fields.drugName}/>
                  </div>
                  <div className='flex flex-col mb-2'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Generic Name</p>
                     <input type="text" name="genericName" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='Enter Generic name' onChange={(e) => handleChange(e)}  value={fields.genericName}/>
                  </div>
                  <div className='flex'>
                     <div className='flex flex-col mb-2 w-full mr-3'>
                        <p className='py-1 px-1 text-[13px] text-gray-900'>Dosage Form</p>
                        <input type="text" name="dosageForm" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='Tablet' onChange={(e) => handleChange(e)}  value={fields.dosageForm}/>
                     </div>
                     <div className='flex flex-col mb-2 w-full'>
                        <p className='py-1 px-1 text-[13px] text-gray-900'>Dosage Strength</p>
                        <input type="text" name="dosageStrength" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='500mg' onChange={(e) => handleChange(e)}  value={fields.dosageStrength}/>
                     </div>

                  </div>
                  <div className='flex flex-col mb-2'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Batch Number</p>
                     <input type="text" name="batchNumber" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='A12345' onChange={(e) => handleChange(e)}  value={fields.batchNumber}/>
                  </div>
                  <div className='flex'>
                     <div className='flex flex-col mb-2 w-full mr-3'>
                        <p className='py-1 px-1 text-[13px] text-gray-900'>Manufacturer Date</p>
                        <input type="date" name="manufacturerDate" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='DD-MM-YYYY' onChange={(e) => handleChange(e)}  value={fields.manufacturingDate}/>
                     </div>
                     <div className='flex flex-col mb-2 w-full'>
                        <p className='py-1 px-1 text-[13px] text-gray-900'>Expiration Date</p>
                        <input type="date" name="expirationDate" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='DD-MM-YYYY' onChange={(e) => handleChange(e)}  value={fields.expirationDate}/>
                     </div>
                  </div>

                  <div className='flex flex-col mb-2'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Certification Number</p>
                     <input type="text" name="certificateNumber" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='FDA-APP-87654321' onChange={(e) => handleChange(e)}  value={fields.certificateNumber}/>
                  </div>
                  <div className='flex flex-col mb-2'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Quality Control</p>
                     <input type="text" name="qualityControl" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='ISO-9001 Certified' onChange={(e) => handleChange(e)}  value={fields.qualityControl}/>
                  </div>
                  <div className='flex flex-col mb-2 w-full'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Unique Identifier</p>
                     <input type="text" name="uniqueIdentifier" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='QR123XYZ456' onChange={(e) => handleChange(e)}  value={fields.uniqueIdentifier}/>
                  </div>
               </div>
               <button className={`mt-4 w-full text-white font-bold py-2 px-4 rounded flex justify-center items-center ${loading ? 'bg-blue-400/90 hover:bg-blue-400/90' : 'bg-blue-500 hover:bg-blue-700'}`} onClick={handleRegister} disabled={loading}>
                  Register
                  {loading && <Loader />}
               </button>
            </div>
         </Closure>
      </>
   )
}

export default Modal