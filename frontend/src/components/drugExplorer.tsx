"use client"
import React, { useCallback, useEffect, useState } from 'react'
import ExplorerRow from './explorerRow'
import ExplorerHeader from './explorerHeader'
import { CiSearch } from 'react-icons/ci'
import {
   dehydrate,
   HydrationBoundary,
   QueryClient,
   useQuery
} from '@tanstack/react-query'
import { gql, request } from 'graphql-request'
const query = gql`{
  registeredDrugs {
    drugId
    transactionHash
    blockTimestamp
  }
  logs {
    drugId
    action
    from
    transactionHash
    blockTimestamp
  }
  issueOpeneds {
    drugId
    issueId
    name
    description
    blockTimestamp
  }
  issueCloseds {
    drugId
    issueId
    reason
    transactionHash
    blockTimestamp
  }
  manufacturerRevokeds {
    name
    license
    transactionHash
    blockTimestamp
  }
  registeredManufacturers {
    name
    transactionHash
    blockTimestamp
  }
}`

const DrugExplorer = () => {
   const [data, setData] = useState<any>()
   const get = useCallback(async () => {
      const result = await request(process.env.NEXT_PUBLIC_GRAPH_URL as string, query)
      setData(result)
      console.log(result)
   }, [])
   useEffect(() => {
      get()
   })
   return (
      <div className='lg:w-[70vw] md:w-[90vw] w-[95vw] bg-[#0c2442] shadow h-[35rem] relative top-[-20rem] p-6 items-center rounded-xl z-0 mx-auto px-4 overflow-hidden pb-10'>
         <div className='w-full bg-red-00 h-[3rem] flex justify-between '>
            <div className='w-full bg-transparent flex border-[2.5px] border-solid border-gray-300 hover:border-white rounded-lg overflow-hidden'>
               <input type="text" className='w-full bg-blue-00 h-full outline-none px-5 bg-transparent text-white' placeholder='Search by Drug ID' />
               <button className='text-3xl px-5 text-white '><CiSearch />
               </button>
            </div>
         </div>

         <ExplorerHeader txn='Transaction (Txn)' type='Type' method='Method' from='from' details='Details' />
         <div className='overflow-auto h-[calc(100%-8rem)] scroll-hidden'> 
            {
               data && data.registeredDrugs.map((drug: any, key: any) => (
                  <ExplorerRow key={key} txn={drug.transactionHash} type={"Registered Drug"} method={"call"} from='' details={drug} />

               ))
            }
            {
               data && data.logs.map((drug: any, key: any) => (
                  <ExplorerRow key={key} txn={drug.transactionHash} type={"Logs"} method={"call"} from='' details={drug} />
               ))
            }
            {
               data && data.issueOpeneds.map((drug: any, key: any) => (
                  <ExplorerRow key={key} txn={drug.transactionHash} type={"Issue Opened"} method={"call"} from='' details={drug} />
               ))
            }
            {
               data && data.issueCloseds.map((drug: any, key: any) => (
                  <ExplorerRow key={key} txn={drug.transactionHash} type={"Issue Closed"} method={"call"} from='' details={drug} />
               ))
            }
            {
               data && data.manufacturerRevokeds.map((drug: any, key: any) => (
                  <ExplorerRow key={key} txn={drug.transactionHash} type={"Manufacturer Revoked"} method={"call"} from='' details={drug} />
               ))
            }
            {
               data && data.registeredManufacturers.map((drug: any, key: any) => (
                  <ExplorerRow key={key} txn={drug.transactionHash} type={"Manufacturer Revoked"} method={"call"} from='' details={drug} />
               ))
            }

         </div>


      </div>
   )
}

export default DrugExplorer