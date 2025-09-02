'use client'
import { Catalog } from '@/constant'
import { useEditorStore } from '@/store'
import { Sparkle} from 'lucide-react'

const AiFeaures = () => {
   
    const {designGridDisplay, setDesignGridDisplay} = useEditorStore()

    const handleSelected = (index) => {
       setDesignGridDisplay(index)  
    }

    
  return (
    <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:p-6 p-2 py-3 mb-8 mt-12 flex flex-col justify-center w-full items-center'>
       <div className='flex items-center justify-center text-gray-500 gap-2'>
          <div className="bg-[#ffffff] p-1 rounded-full flex items-center justify-center">
         <Sparkle className='w-6 h-6 text-yellow-500'/>
          </div>
        <h2 className='sm:text-2xl text-xl font-semibold text-black hidden sm:flex'>AI Image Generation</h2>
        </div>  
        <p className='text-center font-medium text-purple-600 text-lg my-5 max-w-sm w-ful flex-1 justify-center text-s'>Create stunning thumbnails image from your youtube videos with AI</p>
        <div className='flex sm:flex-row flex-col gap-3 justify-center w-full'>
           {
            Catalog.map((cat, index) => (
             <button 
             className={`rounded-full  h-10 w-full sm:w-40 hover:from-blue-100 hover:to-purple-100  border-purple-200 shadow-sm flex items-center  cursor-pointer backdrop-lg flex gap-2 items-center justify-center ${designGridDisplay === index ? 'bg-gradient-to-r from-blue-50 to-purple-50' : 'bg-[#ffffff]'}`}
             key={cat.id} onClick={() => handleSelected(index)}>
              {cat.icon}
             <p className='text-gray-500 text-sm font-bold'>{cat.label}</p>
          </button>
            ))
           }
        </div>
</div>
  )
}

export default AiFeaures
