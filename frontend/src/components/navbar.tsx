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
         <div className="p-3 bg-[#023e8a] text-white flex justify-between items-center px-10 rounded-[3rem] fixed mt-5 m-2 lg:w-[80vw] md:w-[90vw] max-md:w-[95vw] shadow-md">
            <p className="font-semibold font-serif text-xl gothic">DrugLedger</p>

            <div className='w-fit flex'>
               {/* <button className='px-2' onClick={() => setRegister(false)}>Register</button> */}
               <button className='px-2' onClick={() => SetCloseRetrieveFn(false)}>Drug Lookup</button>
            </div>
            <ConnectButton />
         </div>
         <DrugModal close={closeRetrieve} closeFn={SetCloseRetrieveFn} />
         {/* <RegisterModal close={register} closeFn={setRegister} /> */}

      </>
   )
}

export default Navbar