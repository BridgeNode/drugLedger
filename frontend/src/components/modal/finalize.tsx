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
   const [close, setClose] = useState(url ? false : true)
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
         if (url) {
            const qr = await QRCode.toDataURL(url)
            setImage(qr)
            setLoading(false)
         }
      } catch (error) {
         setLoading(false)
         // toast.error('Error retrieving QR Code')
         console.error(error)
      }
   }, [url])

   useEffect(() => {
      generateQR()
   }, [generateQR])
   return (
      url !== undefined && (
         <div className='w-full h-full fixed flex justify-center pt-[8vh] bg-white/30 backdrop-blur-[1px] z-[3]' onClick={(e) => e.currentTarget === e.target && setUrl(undefined)}>
            <div className='w-[85vw] md:w-[80vw] max-h-[90vh] lg:w-[40vw] xl:[w-50vw] h-fit bg-white rounded-md p-5 shadow-sm'>
               <div className='w-full py-1 bg-red-00 mb-2 flex justify-center items-center font-semibold text-[16px]'>
                  <p>Certify Your Drugs with our QR code</p>
                  {/* <p>menu</p> */}
               </div>
               <div className='overflow-auto'>

               <div className='w-full h-fit flex justify-center items-center 
            '>
               {/* // scale-[0.7] max-lg:scale-[0.95] */}
               {img &&
                  <Image width={0} height={0} src={img} alt='' className='w-full h-[25rem] object-contain aspect-square' />
               }
            </div>

               </div>
               <p className='w-full text-center'>Check Drug details <a href={url} className='text-blue-400'>{url}</a></p>
            </div>
         </div>

      )
   )
}

export default FinalizeModal;