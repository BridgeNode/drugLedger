"use client"
import React, { useCallback, useState } from 'react'
import { useAccount } from 'wagmi'
import toast from "react-hot-toast"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { contract } from '@/backend/init'
import Loader from './loader'
import QRCode from "qrcode"
import Image from 'next/image'
import { MdOutlineVerified } from "react-icons/md";
const VerifyBox = ({ url }: { url: string }) => {
   const [loading, setLoading] = useState<boolean>(false)
   const [img, setImage] = useState<string>()
   const [verified, setVerified] = useState(false)
   const generateQR = useCallback(async () => {
      setLoading(true)
      try {
         const qr = await QRCode.toDataURL(url)
         setImage(qr)
         setLoading(false)
      } catch (error) {
         setLoading(false)
         console.error(error)
      }
   }, [url])

   const handleVerify = async () => {
      setLoading(true)
      try {
         const drug = await contract.methods.verify(0).call()
         setVerified(drug)
         setLoading(false)
      } catch (error) {
         setLoading(false)
         toast.error('Error Verifying drug')
         console.error(error)
      }
   }
   useState(() => {
      generateQR()
   })
   return (
      <div className='h-fit rounded-md shadow-sm flex flex-col justify-center items-center bg-red-00'>
         <div className='overflow-auto'>
            <div className='w-full h-fit flex justify-center items-center 
            '>
               {/* // scale-[0.7] max-lg:scale-[0.95] */}
               {img &&
                  <Image width={0} height={0} src={img} alt='' className='w-full h-[25rem] object-contain aspect-square' />
               }
            </div>
         </div>
         <button className={`mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center ${loading ? 'bg-blue-400/90 hover:bg-blue-400/90' : ''} ${verified ? 'bg-green-500 hover:bg-green-500' : ''}`} onClick={handleVerify} disabled={loading || verified}>
            {verified ? (
               <div className='w-full h-full flex justify-center items-center'>
                  <p className='mx-2'>Verified</p>
                  <MdOutlineVerified />
               </div>
            ) : "Verify"}
            {loading && <Loader />}
         </button>
      </div>
   )
}

export default VerifyBox;