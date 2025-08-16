'use client'
import {deleteDesign, getUserDesign, getUserDesignById} from '@/services/design-service'
import Link from 'next/link'


import DesignCard from './DesignCard'
import { useEditorStore } from '@/store'


const RecentDesign = () => {

      const {userDesign} = useEditorStore()

      const handleDeleteDesign = async (designId) => {
        const response = await deleteDesign(designId)
      }

  return (
    <div className=''>
      <h2 className='text-xl font-bold mb-4 text-gray-500'>Recent Designs</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {userDesign.map((design) => (
           <Link href={`/editor/${design._id}`} key={design._id}> 
             <div className='group cursor-pointer'>
            <div className='w-[300px] h-[300px] rounded-lg mb-2 overflow-hidden transition-shadow group-hover:shadow-md p-2'>
                  {
                   design?.canvasData && <DesignCard design={design}/> 
                  }             
            </div>
             </div>
             </Link>
        ))}
      </div>
    </div>
  )
}

export default RecentDesign