import DrugPage from '@/components/drug';
import React from 'react'

const page = ({ params }: { params: { id: number } }) => {
   return (
      <main className="flex min-h-screen flex-col items-center">
         <DrugPage id={params.id} />
      </main>
   )
}

export default page