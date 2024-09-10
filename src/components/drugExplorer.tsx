import React from 'react'
import ExplorerRow from './explorerRow'
import ExplorerHeader from './explorerHeader'
import { CiSearch } from 'react-icons/ci'

const DrugExplorer = () => {
   return (
      <div className='lg:w-[70vw] md:w-[90vw] w-[95vw] bg-white shadow h-[30rem] relative top-[-10rem] p-2 items-center rounded-xl'>
         <div className='w-full bg-red-00 h-[3rem] flex justify-between '>
            <div className='w-full bg-yellow-00 flex border-2 border-solid border-gray-300 rounded-lg overflow-hidden'>
               <input type="text" className='w-full bg-blue-00 h-full outline-none px-5' placeholder='Search Drug' />
               <button className='text-3xl px-5 text-blue-500 hover:bg-blue-500 hover:text-white'><CiSearch />
               </button>
            </div>
         </div>

         <div className='bg-green-200 mt-2'>
            <ExplorerHeader txn='Transaction (Txn)' type='Type' method='Method' from='from' details='Details'/>
            <ExplorerRow txn='Nobl' type='dd' method='ddd' from='0x' details='Hello'/>
            <ExplorerRow txn='Nobl' type='dd' method='ddd' from='0x' details='Hello'/>
            <ExplorerRow txn='Nobl' type='dd' method='ddd' from='0x' details='Hello'/>
            <ExplorerRow txn='Nobl' type='dd' method='ddd' from='0x' details='Hello'/>
            <ExplorerRow txn='Nobl' type='dd' method='ddd' from='0x' details='Hello'/>
            
         </div>

      </div>
   )
}

export default DrugExplorer