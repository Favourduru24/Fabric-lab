'use client'
import {getUserDesign, getUserDesignById} from '@/services/design-service'
import Link from 'next/link'


import { useEffect, useState } from "react"


const RecentDesign = () => {

      const [userDesign, setUserDesign] = useState([])

       async function fetchUserDesign() {
             const result = await getUserDesign()
             console.log(result) 
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
        {design.map((des, index) => (
           <Link href={`/editor/${des.id}`} key={index}> 
             <div className='group cursor-pointer'  >
            <div className='aspect-video bg-gray-100 rounded-lg mb-2 overflow-hidden transition-shadow group-hover:shadow-md'>
              <p className='font-bold text-sm truncate'>{des.title}</p>
            </div>
             </div>
             </Link>
        ))}
      </div>
    </div>
  )
}

export default RecentDesign