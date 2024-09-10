import React from 'react'

const ExplorerHeader = ({ txn, type, method, from, details}: {txn: string, type: string, method: string, from: string, details: string}) => {
   return (
      <div className='w-full h-[3rem] flex bg-sky-200 rounded-lg items-center '>
         <p className="mx-2 bg-blue-00 text-[16px] w-[11rem] overflow-hidden bg-yellow-00 font-semibold text-nowrap text-ellipsis">{txn}</p>
         <p className="mx-2 bg-blue-00 text-[16px] w-[11rem] overflow-hidden bg-yellow-00 font-semibold text-nowrap text-ellipsis">{type}</p>
         <p className="mx-2 bg-blue-00 text-[16px] w-[11rem] overflow-hidden bg-yellow-00 font-semibold text-nowrap text-ellipsis">{method}</p>
         <p className="mx-2 bg-blue-00 text-[16px] w-[11rem] overflow-hidden bg-yellow-00 font-semibold text-nowrap text-ellipsis">{from}</p>
         <p className="mx-2 bg-blue-00 text-[16px] w-[11rem] overflow-hidden bg-yellow-00 font-semibold text-nowrap text-ellipsis">{details}</p>



      </div>
   )
}

export default ExplorerHeader