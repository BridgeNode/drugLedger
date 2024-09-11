import React from 'react'

const ExplorerRow = ({ txn, type, method, from, details }: { txn: string, type: string, method: string, from: string, details: any }) => {
   return (
      <div className='w-full h-[3rem] flex cursor-pointer text-white items-center border-solid border-b-2 border-sky-900 border-x-2 hover:bg-[#0d294b]'>
         <p className="mx-2 bg-blue-00 text-[16px] w-[11rem] overflow-hidden bg-yellow-00 text-nowrap text-ellipsis">{txn}</p>
         <p className="mx-2 bg-blue-00 text-[16px] w-[11rem] overflow-hidden bg-yellow-00  text-nowrap text-ellipsis">{type}</p>
         <p className="mx-2 bg-blue-00 text-[16px] w-[11rem] overflow-hidden bg-yellow-00 text-nowrap text-ellipsis">{method}</p>
         <p className="mx-2 bg-blue-00 text-[16px] w-[11rem] overflow-hidden bg-yellow-00 text-nowrap text-ellipsis">{from}</p>
         <div className="mx-2 bg-blue-00 text-[16px] min-w-[11rem] h-full w-full flex-1 flex flex-col justify-center text-nowrap text-ellipsis relative overflow-y-visible  group/show">
            <div className="mx-2 bg-blue-00 text-[16px] w-full flex-none overflow-hidden bg-yellow-00 text-nowrap text-ellipsis peer/show relative flex flex-shrink-0">
            {Object.entries(details).map(([key, value], index) => (
               <p key={index} className=' h-full z-0'>
                  <b className='mx-2'>{key}</b>
                  <i>{value as string}</i>
               </p>
            ))}
            </div>
            <div className='group-hover/show:flex hidden absolute  bg-[#091b31] shadow-sm shadow-white/10 p-2 font-sm min-w-[10rem] max-w-[80%] top-2 rounded-md flex-col min-h-[5rem] overflow-hidden z-[1]'>{Object.entries(details).map(([key, value], index) => (
               <p key={index} className=' bg-red-00 text-sm text-wrap h-[2rem] leading-normal overflow-hidden text-ellipsis'>
                  <b className='mx-2'>{key}</b>
                 {value as string}
               </p>
            ))}</div>
         </div>
      </div>
   )
}

export default ExplorerRow