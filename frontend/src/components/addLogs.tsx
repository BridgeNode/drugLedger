"use client"
import React, { useState } from 'react'
import Loader from './loader'
import { contract } from '@/backend/init'
import { useAccount } from 'wagmi'
import toast from 'react-hot-toast'

const AddLogs = ({drugId}: {drugId: number | string}) => {
   const [loading, setLoading] = useState(false)
   const [fields, setFields] = useState({
      entity: '',
      action: ''
   })
   const account = useAccount()
   const handleOpenIssue = async () => {
      if (account.status === 'disconnected') return toast.error("Account not connnected")
      setLoading(true)
      try {
         const res = await contract.methods.addLog(drugId, fields.entity, fields.action).send({ from: account.address});
         setLoading(false);
         toast.success("Log Added Successfully");
      } catch(e) {
         setLoading(false);
         console.log(e);
         toast.error("Couldnot Add logs")
      }
   }
   const handleChange = (e: any) => {
      setFields({ ...fields, [e.target.name]: e.target.value })
   }
   return (
      <div className='overflow-auto px-4 bg-gray-100/30 rounded-md py-4'>
         <div className='flex flex-col mb-2'>
            <p className='py-1 px-1 text-[13px] text-gray-900'>Entity</p>
            <input type="text" name="entity" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='Enter entity name' onChange={(e) => handleChange(e)} />
         </div>
         <div className='flex flex-col mb-2'>
            <p className='py-1 px-1 text-[13px] text-gray-900'>action</p>
            <input type="text" name="action" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='Enter action' onChange={(e) => handleChange(e)} />
         </div>
         <div className='w-full flex justify-end'>
         <button className={`mt-4 right-0 w-fit text-white font-bold py-2 px-4 rounded flex justify-center items-center text-sm ${loading ? 'bg-blue-400/90 hover:bg-blue-400/90' : 'bg-blue-500 hover:bg-blue-700'}`} onClick={handleOpenIssue} disabled={loading}>
            Confirm
            {loading && <Loader />}
         </button>
         </div>
            
      </div>
   )
}

export default AddLogs