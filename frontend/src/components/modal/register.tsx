"use client"
import React, { InputHTMLAttributes, useEffect, useState } from 'react'
import Header from '../header'
import Closure from './closure'
import { useAccount } from 'wagmi'
import toast from "react-hot-toast"
import { contract, web3 } from '@/backend/init'
import Loader from '../loader'

const RegisterModal = ({ close, closeFn }: { close: boolean, closeFn: Function }) => {
   const account = useAccount()
   const [loading, setLoading] = useState(false)
   const [fields, setFields] = useState({
      name: '',
      license: '',
      address: ''
   })
   useEffect(() => {
      if (account?.address) {
         setFields(prevValues =>({
            ...prevValues,
            address: account.address as string,
         }))
      }
   }, [account?.address])
   const handleChange = (e: any) => {
      setFields({ ...fields, [e.target.name]: e.target.value })
   }
   const handleRegister = async () => {
      if (account.status === "disconnected") {
         toast.error("Account not connected")
         return;
      }
      if (fields.name === "" || fields.license === "" || fields.address === "") return toast.error("Fiels must not be empty")

      setLoading(true)
      try {
         const estimatedGas = await web3.eth.estimateGas({
            from:  process.env.NEXT_PUBLIC_CONTRACT_OWNER,
            to: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            data: contract.methods.register(fields.address, fields.name, fields.license).encodeABI(),
         })
         const safeGas = Math.ceil(Number(estimatedGas) * 1.2);
         const gasPrice = await web3.eth.getGasPrice();
         const tx = {
            from: process.env.NEXT_PUBLIC_CONTRACT_OWNER,
            to: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            gas: safeGas,
            gasPrice: gasPrice,
            data: contract.methods.register(fields.address, fields.name, fields.license).encodeABI()
         }
         const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY
         const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey)
         console.log(signedTx)
         const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
         toast.success(`Registration successful`)
         closeFn(true)
         setLoading(false)
         setFields({
            name: '',
            license: '',
            address: ''
         })
      } catch (error: any) {
         setLoading(false)
         console.log(error)
         toast.error("Registration failed " + error?.data?.message)
      }
   }
   return (
      <Closure close={close} closeFn={closeFn}>
         <div className='w-[85vw] md:w-[80vw] max-h-[90vh] lg:w-[40vw] xl:[w-50vw] h-fit bg-white rounded-md p-5 shadow-sm'>
            <Header title='Register Manufacturer' />
            <div className='overflow-auto'>
               <div className='flex flex-col mb-2'>
                  <p className='py-1 px-1 text-[13px] text-gray-900'>Manufacturer Name</p>
                  <input type="text" name="name" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='Enter Manufacturer name' onChange={(e) => handleChange(e)} />
               </div>
               <div className='flex flex-col mb-2'>
                  <p className='py-1 px-1 text-[13px] text-gray-900'>License</p>
                  <input type="text" name="license" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='Enter License Number' onChange={(e) => handleChange(e)} />
               </div>
               <div className='flex flex-col mb-2'>
                  <p className='py-1 px-1 text-[13px] text-gray-900'>Address</p>
                  <input type="text" name="address" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='Enter Manufacturer Address' onChange={(e) => handleChange(e)} value={fields.address}/>
               </div>
            </div>
            <button className={`mt-4 w-full text-white font-bold py-2 px-4 rounded ${loading ? 'bg-blue-400/90 hover:bg-blue-400/90' : 'bg-blue-500 hover:bg-blue-700'} flex justify-center items-center`} onClick={handleRegister} disabled={false}>
               Register Manufacturer {loading && <Loader />}
            </button>
         </div>
      </Closure>
   )
}

export default RegisterModal;