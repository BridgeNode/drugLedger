"use client"
import React, { useState } from 'react'
import { contract } from '@/backend/init';
import VerifyModal from './modal/verify';

const DrugPage = ({id}: {id: number}) => {
   const [close, closeFn] = useState<boolean>(false);
   const [drug, setDrug] = useState()
   const retrieve = async () => {
      const res = await contract.methods.retrieve(id).call()
   console.log(res)
      setDrug(res)
   }
   return (
      <>
         <VerifyModal close={close} closeFn={closeFn} />
         {drug}
      </>
   )
}

export default DrugPage