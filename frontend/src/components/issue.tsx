"use client"
import React, { useState } from 'react'
import Loader from './loader'
import { useAccount } from 'wagmi';
import { contract } from '@/backend/init';
import toast from 'react-hot-toast';

const Issue = ({ drugId, issueId, name, description, date, owner, resolved, reason }: { drugId: number, issueId: number, name: string, description: string, date: string, owner: string, resolved: boolean, reason: string, }) => {
   const [loading, setLoading] = useState(false);
   const account = useAccount()
   const [fields, setFields] = useState({
      reason: ''
   });
   const handleCloseIssue = async () => {
      if (account.status === 'disconnected') return toast.error("Account not connnected")
      setLoading(true)
      try {
         const res = await contract.methods.closeIssue(drugId, issueId, fields.reason).send({ from: account.address });
         setLoading(false);
         toast.success("Issue Opened Successfully");
      } catch (e) {
         setLoading(false);
         console.log(e);
         toast.error("Couldnot Open Issue")
      }
   }
   const handleChange = (e: any) => {
      setFields({ ...fields, [e.target.name]: e.target.value })
   }
   return (
      <div className="bg-sky-50 shadow-sm rounded-md p-4 w-full">
         <div className='flex justify-between'>
            <h3 className="text-md font-semibold text-gray-800 mb-1">{name}</h3>
            <p className="text-sm text-gray-600">
               <span className={`${resolved ? 'text-green-600' : 'text-red-500'}`}>{resolved ? "Resolved" : "Unresolved"}</span>
            </p>

         </div>
         <p className="text-sm text-gray-600 mb-1">
            {description}
         </p>
         <div className='flex justify-between'>
            <p className="text-sm text-gray-900 mb-1 font-semibold">
               {`${owner.slice(0, 6)}...${owner.slice(-4)}`}
            </p>
            <p className="text-sm text-gray-900 mb-1">
               {date}
            </p>
         </div>
         {
            resolved &&
            <p className="text-sm text-gray-600 mb-1">
               {reason}
            </p>
         }
         {(!resolved && owner === account.address) && (
            <div>
               <div className='flex flex-col mb-2'>
                  <p className='py-1 px-1 text-[13px] text-gray-900'>Reason</p>
                  <input type="text" name="reason" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='Enter reason' onChange={(e) => handleChange(e)} />
               </div>
               <button className={`mt-4 w-fit text-white font-bold py-2 px-4 rounded flex justify-center items-center text-sm ${loading ? 'bg-red-300/90 hover:bg-red-300/90' : 'bg-red-400 hover:bg-red-500 '}`} onClick={handleCloseIssue} disabled={loading}>
                  Close Issue
                  {loading && <Loader />}
               </button>
            </div>

         )}
      </div>
   )
}

export default Issue