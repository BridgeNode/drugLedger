"use client"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import React, { useState } from 'react'
import RegisterModal from './modal/register';
import DrugModal from './modal/drugModal';

const Navbar = () => {
   const [register, setRegister] = useState<boolean>(true);
   const [closeRetrieve, 
      SetCloseRetrieveFn] = useState<boolean>(true);
   return (
      <>
         <div className="w-full p-3 bg-gray-200 flex justify-between items-center px-10">
            <p className="font-semibold font-serif text-xl">DrugLedger</p>

            <div className='w-fit flex'>
               {/* <button className='px-2' onClick={() => setRegister(false)}>Register</button> */}
               <button className='px-2' onClick={() => SetCloseRetrieveFn(false)}>Get Drug</button>
            </div>
            <ConnectButton />
         </div>
         <DrugModal close={closeRetrieve} closeFn={SetCloseRetrieveFn} />
         {/* <RegisterModal close={register} closeFn={setRegister} /> */}

      </>
   )
}

export default Navbar