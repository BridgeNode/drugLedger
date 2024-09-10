import React from 'react'

const Log = ({ drugId, action, from, entity }: { drugId: number, action: string, from: string, entity: string }) => {
   return (
      <div className="bg-white border-t-2 border-gray-300 border-solid p-2 px-3 w-full mb-2">
                  <div className='flex justify-between'>
            <p className="text-sm text-gray-900 mb-1">
               {entity}
            </p>
            <p className="text-sm text-gray-900 mb-1">
               {`${from.slice(0, 6)}...${from.slice(-4)}`}
            </p>
         </div>
         <div className='flex justify-between'>
            <h3 className="text-md font-semibold text-gray-800 mb-1">{action}</h3>
         </div>
      </div>
   )
}

export default Log