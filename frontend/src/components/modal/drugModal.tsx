"use client"
import React, { useCallback, useEffect, useState } from 'react'
import Header from '../header'
import Closure from './closure'
import { useAccount } from 'wagmi'
import toast from "react-hot-toast"
import { contract } from '@/backend/init'
import Loader from '../loader'
import Issue from '../issue'
import Log from '../log'
import { FcCollapse, FcExpand } from "react-icons/fc";
import OpenIssue from '../openIssue'
import AddLogs from '../addLogs'
import VerifyBox from '../verify'
import { gql, request } from 'graphql-request'


const url = process.env.NEXT_PUBLIC_GRAPH_URL as string
const DrugModal = ({ close, closeFn, drugId }: { close: boolean, closeFn: Function, drugId?: number }) => {
   const account = useAccount()
   const [loading, setLoading] = useState<boolean>(false)
   const [collapsed, setCollapsed] = useState<boolean>(false)
   const [issuesCollapsed, setIssuesCollapsed] = useState<boolean>(true)
   const [verifyCollapsed, setVerifyCollapsed] = useState<boolean>(true)
   const [logsCollapsed, setLogsCollapsed] = useState<boolean>(false)
   const [openIssue, setOpenIssue] = useState<boolean>(false)
   const [addLog, setAddLog] = useState<boolean>(false)
   const [cid, setCid] = useState<string>()
   const [drugData, setDrugData] = useState({
      drugName: "",
      genericName: "",
      dosageForm: "",
      dosageStrength: "",
      batchNumber: "",
      manufacturingDate: "",
      expirationDate: "",
      qualityControl: "",
      certificateNumber: "",
      uniqueIdentifier: "",
      manufacturer: ""
   })
   const [logs, setLogs] = useState<{ drugId: number, entity: string, action: string, from: string }[] | undefined>()
   const [issues, setIssues] = useState<{
      issues: Array<any>,
      drugId: string,
   } | undefined>()
   const [fields, setFields] = useState({
      drugId: ''
   })
   const handleChange = (e: any) => {
      setFields({ ...fields, [e.target.name]: e.target.value })
   }
   
   const handleRetrieve = useCallback(async (_id?: number) => {

      const _drugId = (_id !== undefined && _id !== null) ? _id : fields.drugId
      const query = gql`{
         logs(where: {drugId: ${_drugId}}) {
           id
           drugId
           entity
           action
           transactionHash
           from
         }
       }`
      setLoading(true)
      try {
         const drug = await contract.methods.retrieve(_drugId).call()
         if (drug.cid.length === 0) {
            setLoading(false)
            toast.error('No drug found with this ID')
            return
         }
         const logs = await request(url, query)
         const result = await fetch(`/api/files?cid=${drug.cid}`, {
            method: "GET"
         })
         const data = await result.json()
         setDrugData({ ...data.data, manufacturer: drug.manufacturer })
         setIssues({ issues: drug.issues, drugId: _drugId as string })
         setLogs((logs as any).logs)
         setCid(drug.cid)
         toast.success('Drug retrieved successfully')
         setLoading(false)
      } catch (error) {
         setLoading(false)
         toast.error('Error retrieving drug')
         console.error(error)
      }
   }, [fields.drugId])

   useEffect(() => {
      drugId && handleRetrieve(drugId)
   }, [drugId, handleRetrieve])
   return (
      <Closure close={close} closeFn={closeFn}>
         <div className='w-[85vw] md:w-[80vw] max-h-[80vh] h-fit lg:w-[40vw] xl:[w-50vw] bg-white rounded-md p-5 shadow-sm overflow-hidden'>
            <Header title={`Retrieve #${drugId || fields.drugId}`} />
            {!drugId && (
               <div className='flex flex-col mb-2'>
                  <p className='py-1 px-1 text-[13px] text-gray-900'>Drug Id</p>
                  <input type="text" name="drugId" id="" className='w-full bg-transparent rounded border-2 border-solid border-sky-500/80 p-2  outline-none focus:border-sky-600' placeholder='Enter Drug Id' onChange={(e) => handleChange(e)} />
               </div>
            )}
            {drugData.drugName !== "" && <div className={`h-fit overflow-hidden px-2`}>
               <button className='w-full p-2 px-0 h-[2rem] flex justify-between items-center' onClick={() => setCollapsed(!collapsed)}>Details
                  {collapsed ? <FcExpand /> : <FcCollapse />}
               </button>
               <div className={`h-[50vh] flex-1 overflow-auto bg-gray-00 ${collapsed ? 'hidden' : 'flex flex-col'} scroll-hidden`}>

                  <div className='flex flex-col mb-2'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Drug Name</p>
                     <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.drugName}</p>
                  </div>
                  <div className='flex flex-col mb-2'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Generic Name</p>
                     <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.genericName}</p>
                  </div>
                  <div className='flex'>
                     <div className='flex flex-col mb-2 w-full mr-3'>
                        <p className='py-1 px-1 text-[13px] text-gray-900'>Dosage Form</p>
                        <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.dosageForm}</p>
                     </div>
                     <div className='flex flex-col mb-2 w-full'>
                        <p className='py-1 px-1 text-[13px] text-gray-900'>Dosage Strength</p>
                        <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.dosageStrength}</p>
                     </div>
                  </div>
                  <div className='flex flex-col mb-2'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Batch Number</p>
                     <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.batchNumber}</p>
                  </div>
                  <div className='flex'>
                     <div className='flex flex-col mb-2 w-full mr-3'>
                        <p className='py-1 px-1 text-[13px] text-gray-900'>Manufacturer Date</p>
                        <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.manufacturingDate}</p>
                     </div>
                     <div className='flex flex-col mb-2 w-full'>
                        <p className='py-1 px-1 text-[13px] text-gray-900'>Expiration Date</p>
                        <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.expirationDate}</p>
                     </div>
                  </div>
                  <div className='flex flex-col mb-2'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Certification Number</p>
                     <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.certificateNumber}</p>
                  </div>
                  <div className='flex flex-col mb-2'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Quality Control</p>
                     <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.qualityControl}</p>
                  </div>
                  <div className='flex flex-col mb-2'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Unique Identifier</p>
                     <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.uniqueIdentifier}</p>
                  </div>
                  <div className='flex flex-col mb-2'>
                     <p className='py-1 px-1 text-[13px] text-gray-900'>Manufacturer</p>
                     <p className='py-2 px-3 text-[14px] bg-gray-100 rounded'>{drugData.manufacturer}</p>
                  </div>
               </div>
            </div>}


            {logs && <div className={`bg-red-00 h-fit overflow-hidden`} >
               <button className='w-full p-2 h-[2rem] flex justify-between items-center' onClick={() => setLogsCollapsed(!logsCollapsed)}>
                  <div className='flex'>Logs</div>
                  {logsCollapsed ? <FcExpand /> : <FcCollapse />}
               </button>
               <div className={`${logsCollapsed ? 'hidden' : 'flex flex-col'}`}>
                  {/* Todo: remove hardcoded value of drugId */}
                  {addLog && <AddLogs drugId={drugId ? drugId : fields.drugId} />}
                  <div>
                     {logs.map((log, key) =>
                        <Log {...log} key={key} />
                     )}
                     <button className='w-fit p-1 px-4 m-2 mx-0 text-white bg-blue-500 rounded-md ' onClick={() => setAddLog(true)}>Add Log</button>
                  </div>

               </div>
            </div>}
            {issues && <div className={`bg-red-00 h-fit overflow-hidden`} >
               <button className='w-full p-2 h-[2rem] flex justify-between items-center' onClick={() => setIssuesCollapsed(!issuesCollapsed)}>Issues
                  {issuesCollapsed ? <FcExpand /> : <FcCollapse />}
               </button>
               <div className={`${issuesCollapsed ? 'hidden' : 'flex flex-col'}`}>
                  {/* Todo: remove hardcoded value of drugId */}
                  {openIssue &&
                     <OpenIssue drugId={drugId ? drugId : fields.drugId} />
                  }

                  <div className='px-2'>
                     {issues.issues.map((issue, key) =>
                        <Issue {...issue as any} drugId={issues.drugId} issueId={key} key={key} />
                     )}
                     <button className='w-fit p-1 px-4 m-2 mx-0 text-white bg-blue-500 rounded-md ' onClick={() => setOpenIssue(true)}>Add Issue</button>
                  </div>

               </div>
            </div>}
            {cid && <div className={`bg-red-00 h-fit overflow-hidden`} >
               <button className='w-full p-2 h-[2rem] flex justify-between items-center' onClick={() => setVerifyCollapsed(!verifyCollapsed)}>Verify
                  {verifyCollapsed ? <FcExpand /> : <FcCollapse />}
               </button>
               <div className={`${verifyCollapsed ? 'hidden' : 'flex flex-col'}`}>
                  <VerifyBox url={cid as string} />
               </div>
            </div>}
            {!drugId && (
               <button className={`mt-4 w-full text-white font-bold py-2 px-4 rounded flex justify-center items-center ${loading ? 'bg-blue-400/90 hover:bg-blue-400/90' : 'bg-blue-500 hover:bg-blue-700'}`} onClick={() => handleRetrieve()} disabled={loading}>
                  Retrieve Drug
                  {loading && <Loader />}
               </button>
            )}
            {(drugId && loading) &&
               <div className='w-full flex justify-center items-center text-blue-500'>
                  <Loader />
               </div>
            }
         </div>
      </Closure >
   )
}

export default DrugModal;

