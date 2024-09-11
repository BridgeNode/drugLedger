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
import { sortExplorer } from '@/context/sort'
import Loader from './loader'
const queryAll = gql`{
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
    transactionHash
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
const qr = (id: number) => {
   return gql`{
     registeredDrugs(where: {drugId: ${id}}) {
       drugId
       transactionHash
       blockTimestamp
     }
     logs(where: {drugId: ${id}}) {
       drugId
       action
       from
       transactionHash
       blockTimestamp
     }
     issueOpeneds(where: {drugId: ${id}}) {
       drugId
       issueId
       name
       transactionHash
       description
       blockTimestamp
     }
     issueCloseds(where: {drugId: ${id}}) {
       drugId
       issueId
       reason
       transactionHash
       blockTimestamp
     }
   }`

}
const DrugExplorer = () => {
   const [data, setData] = useState<any>()
   const [id, setId] = useState<number>()
   const [loading, setLoading] = useState<boolean>(false)
   const get = useCallback(async (id?: number) => {
      setLoading(true)
      const query = (id !== undefined && id !== null) ? qr(id) : queryAll;
      const result = await request(process.env.NEXT_PUBLIC_GRAPH_URL as string, query)
      setData(result)
      setData(sortExplorer(result))
      setLoading(false)
      // console.log(result)
   }, [])
   useEffect(() => {
      get()
   }, [get])
   const formatTime = (raw: number) => new Date(raw * 1000).toLocaleString();

   return (
      <div className='lg:w-[70vw] md:w-[90vw] w-[95vw] bg-[#0c2442] shadow h-[35rem] relative md:top-[-5rem] lg:top-[-10rem] p-6 items-center rounded-xl z-0 mx-auto px-4 overflow-hidden pb-10'>
         <div className='w-full bg-red-00 h-[3rem] flex justify-between '>
            <form className='w-full bg-transparent flex border-[2.5px] border-solid border-gray-300 hover:border-white rounded-lg overflow-hidden' onSubmit={(e) => {
               e.preventDefault()
               get(id)
            }}>
               <input type="search" className='w-full bg-blue-00 h-full outline-none px-5 bg-transparent text-white' placeholder='Search by Drug ID' onChange={(e) => setId(parseInt(e.target.value))} />
               <button className='text-3xl px-5 text-white ' onClick={() => get(id)}><CiSearch />
               </button>
            </form>
         </div>

         <ExplorerHeader txn='Transaction (Txn)' type='Type' method='Method' from='Timestamp' details='Details' />
         <div className={`overflow-auto h-[calc(100%-8rem)] scroll-hidden ${loading && 'flex flex-col justify-center items-center'} `}>
            {loading ? (
               <Loader />
            ) : data && data.map((drug: any, key: any) => (
               <ExplorerRow key={key} txn={drug.transactionHash} {...drug} from={formatTime(drug.blockTimestamp)} details={drug} />
            ))
            }
         </div>
      </div>
   )
}

export default DrugExplorer