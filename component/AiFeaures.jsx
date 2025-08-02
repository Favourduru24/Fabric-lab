import { Sparkle } from 'lucide-react'
import React from 'react'

const AiFeaures = () => {
  return (
    <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 mt-12'>
       <h2 className='text-lg font-semibold mb-3 flex items-center justify-center text-gray-500'>
         <Sparkle className='w-5 h-5 text-purple-500 mr-2'/>
        AI Image Generation</h2>  
        <p className='text-gray-500 mb-4 text-center'>Create stunning thumbnails image fro your youtube videos with AI</p>
        <div className='flex flex-wrap gap-3 justify-center'>
          <button className='rounded-full px-5 py-6 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-purple-700 border-purple-200 shadow-sm  flex items-center text-lg font-semibold'>
             Generate thumbnail from video title
          </button>

          <button className='rounded-full px-5 py-6 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-pink-700 border-pink-200 shadow-sm  flex items-center text-lg font-semibold'>
             Generate thumbnail from video title
          </button>
        </div>
</div>
  )
}

export default AiFeaures