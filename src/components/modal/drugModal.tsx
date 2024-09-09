"use client"
import React, { useState } from 'react'
import Header from '../header'
import Closure from './closure'
import { useAccount } from 'wagmi'
import toast from "react-hot-toast"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { contract } from '@/backend/init'
import Loader from '../loader'

const DrugModal = ({ close, closeFn }: { close: boolean, closeFn: Function }) => {
   const account = useAccount()
   const [loading, setLoading] = useState<boolean>(false)
   const [collapsed, setCollapsed] = useState<boolean>(false)
   const [drugData, setDrugData] = useState({
      drugName: "",
      genericName: "",
      dosageForm: "",
      dosageStrength: "",
      batchNumber: "",
      manufacturerDate: "",
      expirationDate: "",
      qualityControl: "",
      certificateNumber: "",
      uniqueIdentifier: "",
      manufacturer: ""
   })
   const [fields, setFields] = useState({
      drugId: ''
   })
   const handleChange = (e: any) => {
      setFields({ ...fields, [e.target.name]: e.target.value })
   }
   const handleRetrieve = async () => {
      setLoading(true)
      try {
         const drug = await contract.methods.retrieve(parseInt(fields.drugId)).call()
         if (drug.cid.length === 0) {
            setLoading(false)
            toast.error('No drug found with this ID')
            return
         }
         const result = await fetch(`/api/files?cid=${drug.cid}`, {
            method: "GET"
         })
         const data = await result.json()
         setDrugData({...data.data, manufacturer: drug.manufacturer})
         toast.success('Drug retrieved successfully')
         setLoading(false)
      } catch (error) {
         setLoading(false)
         toast.error('Error retrieving drug')
         console.error(error)
      }
   }
   return (
      <Closure close={close} closeFn={closeFn}>
         <div className='w-[85vw] md:w-[80vw] max-h-[90vh] lg:w-[40vw] xl:[w-50vw] h-fit bg-white rounded-md p-5 shadow-sm'>
            <Header title='Retrieve' />
            <div className='overflow-auto'>
               <div className='flex flex-col mb-2'>
                  <p className='py-1 px-1 text-[13px] text-gray-900'>Drug Id</p>
                  <input type="text" name="drugId" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='Enter Drug Id' onChange={(e) => handleChange(e)} />
               </div>
               {drugData.drugName !== "" && <div className={``} onClick={()=> setCollapsed(!collapsed)}>
                  <div className='w-full' onClick={() => setCollapsed(!collapsed)}>Details</div>
                  <div className='flex flex-col mb-2'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Drug Name</p>
                     <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.drugName}</p>
                  </div>
                  <div className='flex flex-col mb-2'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Generic Name</p>
                     <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.genericName}</p>
                  </div>
                  <div className='flex'>
                     <div className='flex flex-col mb-2 w-full mr-3'>
                        <p className='py-1 px-1 text-[13px] text-gray-900'>Dosage Form</p>
                        <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.dosageForm}</p>
                     </div>
                     <div className='flex flex-col mb-2 w-full'>
                        <p className='py-1 px-1 text-[13px] text-gray-900'>Dosage Strength</p>
                        <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.dosageStrength}</p>
                     </div>
                  </div>
                  <div className='flex flex-col mb-2'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Batch Number</p>
                     <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.batchNumber}</p>
                  </div>
                  <div className='flex'>
                     <div className='flex flex-col mb-2 w-full mr-3'>
                        <p className='py-1 px-1 text-[13px] text-gray-900'>Manufacturer Date</p>
                        <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.manufacturerDate}</p>
                     </div>
                     <div className='flex flex-col mb-2 w-full'>
                        <p className='py-1 px-1 text-[13px] text-gray-900'>Expiration Date</p>
                        <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.expirationDate}</p>
                     </div>
                  </div>
                  <div className='flex flex-col mb-2'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Certification Number</p>
                     <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.certificateNumber}</p>
                  </div>
                  <div className='flex flex-col mb-2'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Quality Control</p>
                     <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.qualityControl}</p>
                  </div>
                  <div className='flex flex-col mb-2'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Unique Identifier</p>
                     <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.uniqueIdentifier}</p>
                  </div>
                  <div className='flex flex-col mb-2'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Manufacturer</p>
                     <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.manufacturer}</p>
                  </div>
               </div>}
            </div>
            <button className={`mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center ${loading ? 'bg-blue-400/90 hover:bg-blue-400/90': ''}`} onClick={handleRetrieve} disabled={loading}>
               Retrieve Drug
               {loading && <Loader />}
            </button>
         </div>
      </Closure >
   )
}

export default DrugModal;