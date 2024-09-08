"use client"
import React, { useState } from 'react'
import Header from '../header'
import Closure from './closure'
import { useAccount } from 'wagmi'
import toast from "react-hot-toast"
import { ConnectButton } from '@rainbow-me/rainbowkit'
const Modal = ({ close, closeFn }: { close: boolean, closeFn: Function }) => {
   const account = useAccount()
   const handleRegister = () => {
      if (account.status === "disconnected") {
         toast.error("Account not connected")
         return <ConnectButton />
      }
   }
   return (
      <Closure close={close} closeFn={closeFn}>
         <div className='w-[85vw] md:w-[80vw] max-h-[90vh] lg:w-[40vw] xl:[w-50vw] h-fit bg-white rounded-md p-5 shadow-sm'>
            <Header title='Register' />
            <div className='overflow-auto'>
               <div className='flex flex-col mb-2'>
                  <p className='py-1 px-1 text-[13px] text-gray-900'>Drug Name</p>
                  <input type="text" name="" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='Enter Drug name' />
               </div>
               <div className='flex flex-col mb-2'>
                  <p className='py-1 px-1 text-[13px] text-gray-900'>Generic Name</p>
                  <input type="text" name="" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='Enter Generic name' />
               </div>
               <div className='flex'>
                  <div className='flex flex-col mb-2 w-full mr-3'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Dosage Form</p>
                     <input type="text" name="" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='Tablet' />
                  </div>
                  <div className='flex flex-col mb-2 w-full'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Dosage Strength</p>
                     <input type="text" name="" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='500mg' />
                  </div>

               </div>
               <div className='flex flex-col mb-2'>
                  <p className='py-1 px-1 text-[13px] text-gray-900'>Batch Number</p>
                  <input type="text" name="" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='A12345' />
               </div>
               <div className='flex'>
                  <div className='flex flex-col mb-2 w-full mr-3'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Manufacturer Date</p>
                     <input type="date" name="" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='DD-MM-YYYY' />
                  </div>
                  <div className='flex flex-col mb-2 w-full'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Expiration Date</p>
                     <input type="date" name="" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='DD-MM-YYYY' />
                  </div>
               </div>

               <div className='flex flex-col mb-2'>
                  <p className='py-1 px-1 text-[13px] text-gray-900'>Certification Number</p>
                  <input type="text" name="" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='FDA-APP-87654321' />
               </div>
               <div className='flex flex-col mb-2'>
                  <p className='py-1 px-1 text-[13px] text-gray-900'>Quality Control</p>
                  <input type="text" name="" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='ISO-9001 Certified' />
               </div>
               <div className='flex flex-col mb-2 w-full'>
                  <p className='py-1 px-1 text-[13px] text-gray-900'>Unique Identifier</p>
                  <input type="text" name="" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='QR123XYZ456' />
               </div>
            </div>
            <button className='mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleRegister}>
               Register
            </button>
         </div>
      </Closure>
   )
}

export default Modal