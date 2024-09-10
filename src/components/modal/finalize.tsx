"use client"
import React, { useCallback, useEffect, useState } from 'react'
import Header from '../header'
import Closure from './closure'
import { useAccount } from 'wagmi'
import toast from "react-hot-toast"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { contract } from '@/backend/init'
import Loader from '../loader'
import QRCode from "qrcode"
import Image from 'next/image'

const FinalizeModal = ({ url, setUrl }: { url: string | undefined, setUrl: Function }) => {
   const account = useAccount()
   const [loading, setLoading] = useState<boolean>(false)
   const [img, setImage] = useState<string>()
   const [close, setClose] = useState(url ? false: true)
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
   const generateQR = useCallback(async () => {
      setLoading(true)
      try {
         const qr = await QRCode.toDataURL(url as string)
         setImage(qr)
         setLoading(false)
      } catch (error) {
         setLoading(false)
         // toast.error('Error retrieving QR Code')
         console.error(error)
      }
   },[url])

   useEffect(() => {
      generateQR()
   }, [generateQR])
   return (
      url !== undefined && (
         <div className='w-full h-full fixed flex justify-center pt-[8vh] bg-white/30 backdrop-blur-[1px] z-[2]' onClick={() => setUrl(undefined)}>
            <div className='w-[85vw] md:w-[80vw] max-h-[90vh] lg:w-[40vw] xl:[w-50vw] h-fit bg-white rounded-md p-5 shadow-sm'> 
               <Header title='Certify your drugs with OUR QRCODE' />
               <div className='overflow-auto'>
                  {/* <div className='flex flex-col mb-2'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Drug Id</p>
                     <input type="text" name="drugId" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='Enter Drug Id' onChange={(e) => handleChange(e)} />
                  </div> */}
                  <div className='w-full h-fit flex justify-center items-center scale-[0.9] max-lg:scale-[0.85]'>
                     {img &&
                        <Image width={0} height={0} src={img} alt='' className='w-[80%] aspect-square' />
                     }
                  </div>
   
               </div>
               {/* <button className={`mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center ${loading ? 'bg-blue-400/90 hover:bg-blue-400/90' : ''}`} onClick={generateQR} disabled={loading}>
                  Retrieve Drug
                  {loading && <Loader />}
               </button> */}
            </div>
         </div>

      )
   )
}

export default FinalizeModal;