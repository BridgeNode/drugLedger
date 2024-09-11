
import {
   dehydrate,
   HydrationBoundary,
   QueryClient,
 } from '@tanstack/react-query'
 import { gql, request } from 'graphql-request'
 import Data from "@/context/data";
import HomePage from '@/components/home';
const query = gql`{
   registeredManufacturers {
     name
   }
 }`

const url = 'https://api.studio.thegraph.com/query/87766/drugledger/version/latest'
export default async function Home() {
   const queryClient = new QueryClient()
   await queryClient.prefetchQuery({
     queryKey: ['data'],
     async queryFn() {
       return await request(url, query)
     }
   })

   return (
      <>
      {/* // <HydrationBoundary state={dehydrate(queryClient)}> */}
      <HomePage />
    {/* </HydrationBoundary> */}
      </>

   );
}
