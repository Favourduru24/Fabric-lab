'use client'
import {getUserDesign, getUserDesignById} from '@/services/design-service'
import Link from 'next/link'


import { useEffect, useState } from "react"
import DesignCard from './DesignCard'


const RecentDesign = () => {

      const [userDesign, setUserDesign] = useState([])

       async function fetchUserDesign() {
             const result = await getUserDesign()
             console.log({result}) 
             setUserDesign(result?.data)

          }

       useEffect(() => {
          fetchUserDesign()
      },[])

      const design = Array(6).fill(null).map((_, i) => ({
         id: 1,
         title: `Design ${i}`,
         thumbnail: ''
      }))
      
  return (
    <div className=''>
      <h2 className='text-xl font-bold mb-4 text-gray-500'>Recent Designs</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {userDesign.map((des, index) => (
           <Link href={`/editor/${des._id}`} key={index}> 
             <div className='group cursor-pointer'>
            <div className='w-[300px] h-[300px] rounded-lg mb-2 overflow-hidden transition-shadow group-hover:shadow-md p-2'>
              <p className='font-bold text-sm truncate text-gray-500'>{des.name}</p>
              <DesignCard design={des}/>
            </div>
             </div>
             </Link>
        ))}
      </div>
    </div>
  )
}

export default RecentDesign