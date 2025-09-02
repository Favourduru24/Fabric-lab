'use client'
import {deleteDesign, getUserDesign, getUserDesignById} from '@/services/design-service'
import Link from 'next/link'


import DesignCard from './DesignCard'
import { useEditorStore } from '@/store'


const RecentDesign = () => {

      const {designGridDisplay, setDesignGridDisplay, userDesign} = useEditorStore()

      const handleDeleteDesign = async (designId) => {
        const response = await deleteDesign(designId)
      }

       const ArrayData1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
       const ArrayData2 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
       const ArrayData3 = [1, 2, 3, 4, 5, 6, 7, 8]
      

  return (
    <div className='flex flex-col'>

      <h2 className='text-2xl  mb-4 text-gray-500 my-5 font-semibold'>Recent Designs</h2>
      <div className='gap-4 grid sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] grid-cols-[repeat(auto-fill,minmax(170px,1fr))]'>
        {/* {userDesign.map((design) => (
           <Link href={`/editor/${design._id}`} key={design._id}> 
             <div className='group cursor-pointer'>
            <div className='h-[300px] rounded-lg mb-2 overflow-hidden transition-shadow group-hover:shadow-md p-2'>
                  {
                   design.canvasData && <DesignCard design={design} key={design._id}/> 
                  }             
            </div>
             </div>
             </Link>
        ))} */}
        {designGridDisplay === 1 ?
        ArrayData1.map((design) => (
           <Link href={`/editor/${design}`} key={design}> 
             <div className='group cursor-pointer'>
            <div className='sm:h-[300px] h-[200px] rounded-lg mb-2 overflow-hidden transition-shadow group-hover:shadow-md p-2 bg-gray-50'>
                   {design}           
            </div>
             </div>
             </Link>
         )) : designGridDisplay === 2 ?
        ArrayData2.map((design) => (
           <Link href={`/editor/${design}`} key={design}> 
             <div className='group cursor-pointer'>
            <div className='sm:h-[300px] h-[200px] rounded-lg mb-2 overflow-hidden transition-shadow group-hover:shadow-md p-2 bg-gray-50'>
                   {design}           
            </div>
             </div>
             </Link>
         )) :
         ArrayData3.map((design) => (
           <Link href={`/editor/${design}`} key={design}> 
             <div className='group cursor-pointer'>
            <div className='sm:h-[300px] h-[200px] rounded-lg mb-2 overflow-hidden transition-shadow group-hover:shadow-md p-2 bg-gray-50'>
                   {design}           
            </div>
             </div>
             </Link>
        )) }

      </div>
           <div className="w-full justify-end items-center mb-5 mt-5">
           <div className="flex gap-4 items-center justify-end">
            <button className="sm:rounded-full rounded-md h-10 sm:w-40 w-18 font-medium shadow-sm flex items-center  cursor-pointer backdrop-lg flex gap-2 items-center justify-center text-gray-400 hover:bg-gray-50">
               Prev
            </button>
            <button className="sm:rounded-full rounded-md h-10 sm:w-40 w-18 font-medium shadow-sm flex items-center  cursor-pointer backdrop-lg flex gap-2 items-center justify-center text-gray-400 hover:bg-gray-50">
               Next
            </button>
           </div>
         </div>
    </div>
  )
}

export default RecentDesign