'use client'
import { Catalog } from '@/constant'
import { useEditorStore } from '@/store'
import { Sparkle } from 'lucide-react'
import { useState } from 'react'

const AiFeaures = () => {
   
   const [clicked, setClicked] = useState({
        label: 'Your Design',
        id: 1
    })

    const {setCatalogClicked, catalogClicked} = useEditorStore()

    
  return (
    <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 mt-12'>
       <div className='flex items-center justify-center text-gray-500 gap-2'>
          <div className="bg-[#ffffff] p-1 rounded-full flex items-center justify-center">
         <Sparkle className='w-6 h-6 text-yellow-500'/>
          </div>
        <h2 className='text-2xl font-semibold text-black'>AI Image Generation</h2>
        </div>  
        <p className='mb-4 text-center font-medium text-purple-500 mt-3 '>Create stunning thumbnails image from your youtube videos with AI</p>
        <div className='flex flex-wrap gap-3 justify-center mt-5'>
           {
            Catalog.map((cat, index) => (
             <button 
             className={`rounded-full px-4 py-2  hover:from-blue-100 hover:to-purple-100  border-purple-200 shadow-sm flex items-center  cursor-pointer backdrop-lg ${catalogClicked.id === cat.id ? 'bg-gradient-to-r from-blue-50 to-purple-50' : 'bg-[#ffffff]'}`}
             key={cat.id} onClick={() => setCatalogClicked(cat)}>
             <p className='text-gray-500 text-sm font-bold'>{cat.label}</p>
          </button>
            ))
           }
        </div>
</div>
  )
}

export default AiFeaures
