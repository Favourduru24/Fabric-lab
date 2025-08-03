'use client'
import { textPresets } from '@/constant'
import { useEditorStore } from '@/store'
import { Type } from 'lucide-react'

function TextPanel ()  {

    const {canvas} = useEditorStore()

  return (
    <div
     className='h-full overflow-y-auto '
    >
     <div className='h-full overflow-y-auto'>
        <div className='p-4 space-y-4  '>
           <button className='w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex  items-start justify-center transiiton-color cursor-pointer gap-2'>
              <Type className=' h-5 w-5'/>
              <span className='font-semibold text-[1rem]'>
                 Add a text box
              </span>
           </button>
           <div className='pt-2'>
               <h4 className='text-lg text-gray-800 mb-4 font-semibold'>Default Text Style</h4>
               <div className='space-y-4'>
                  {textPresets.map((preset, index) => (
                     <button className='w-full text-left p-3 bg-white border border-gray-200 shadow-md shadow-white rounded-md hover:bg-gray-50 transition-color text-gray-600 cursor-pointer' key={index} style={{fontSize: `${Math.min(preset.fontSize / 1.8, 24)}px`, fontWeight: preset.fontWeight, fontStyle: preset.fontStyle || 'normal', fontFamily: preset.fontFamily}}>
                        {preset.name}  
                     </button>
                   ))}
               </div>
           </div>
        </div>
      </div>  
    </div>
  )
}

export default TextPanel