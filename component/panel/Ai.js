import { generateImageFromAi } from '@/services/upload-service'
import { useEditorStore } from '@/store'
import { Loader, Sparkles, Wand2 } from 'lucide-react'
import React, { useState } from 'react'

function AiPanel (){

  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const {canvas} = useEditorStore()




  const handlePromptChange = (e) => {
    setPrompt(e.target.value)
  }

  const handleGenerate = async(e) => {
     setIsLoading(true)
     setGeneratedContent(null)
     setIsUploading(false)

     try {
       const response = await generateImageFromAi(prompt)
        
        if(response && response?.data?.url) {
           setGeneratedContent(response?.data?.url)
        }

       setGeneratedContent(response)

     } catch (error) {
       console.error(error, 'Something went wrong no image Url.')
     } finally {
      setIsLoading(false)
     }

  }

  const handleAiImageToCanvas = async () => {
   if(!canvas && !generatedContent) return 
    addImageToCanvas(canvas, generatedContent)
  }

   


  return (
    <div className='h-full overflow-y-auto'>
        <div className='p-4 space-y-4'>
            <div className='flex items-center space-x-2 mb-2'>
                <Wand2 className='w-5 h-5 text-purple-500'/>
                <h3 className='text-lg font-semibold text-gray-400 mb-2'>Ai Image Generator</h3>
            </div>
            <div className='space-y-2'>
              <textarea 
              className='resize-none min-h-[200px] placeholder:text-gray-400 placeholder:font-medium font-medium w-full p-2 rounded-md text-gray-400 outline-purple-300 shadow-sm text-lg '
              value={prompt}
              onChange={handlePromptChange}
              placeholder='eg, A cute cat image'
              disabled={isLoading}
              >
                 
              </textarea>
            </div>
          <button
           className={`flex w-full gap-1 items-center h-12 bg-purple-600 hover:bg-purple-700 transition-all text-white justify-center rounded-md font-semibold  shadow-sm cursor-pointer`}
           onClick={handleGenerate}
            disabled={!prompt?.trim() || isLoading} 
          >
            {isLoading ? 
            (
                <>
              <Loader className='mr-2 w-5 h-5 animate-spin'/>
              <p>Generate Image</p>
              </>
            )
            : (
              <>
              <Sparkles className='mr-2 w-6 h-6'/>
             <p>Generate Image</p>
              </>
            )
              
            }
          </button>
        </div>

         {
          isLoading && (
            <div className='border rounded-md bg-gray-50 p-6 flex flex-col items-center justify-center m-4'>
             <Loader className='w-8 h-8 animate-spin text-purple-500 mb-3'/>
              <p className='text-sm text-center text-gray-600'>Creating your Image...</p>
            </div>
          )
         }

         {generatedContent && !isLoading && (
            <div className='p-4 flex flex-col gap-4'>

           <div className="border rounded-md overflow-hidden ">
           <img src='/img1.png' className='w-full max-h-[200px]'/>
           </div>
           <button
           className={`flex w-full gap-1 items-center h-12 bg-black transition-all text-white justify-center rounded-md font-semibold  shadow-sm cursor-pointer`}
           disabled={isUploading}
           onClick={handleAiImageToCanvas}
          >
            Add To Canvas
          </button>
            </div>
         )}  
    </div>
  )
}

export default AiPanel