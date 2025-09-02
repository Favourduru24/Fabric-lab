'use client'
import { Check, Share, Link} from 'lucide-react'
import {useState} from 'react'

const ShareModel = ({isOpen, shareRef, id}) => {

const [copy, setCopy] = useState(false)

 const handleCopySharedLink = () => {
  navigator.clipboard.writeText(`${window.location.origin}/editor/${id}`)
  
  setCopy(true)

  setTimeout(() => {
   setCopy(false)
  }, 3000)
 }

  return (
    <>
        {
          isOpen && (
            <div className='inset-0 fixed bg-black/50 flex items-center justify-center z-50' >
              <div className='max-w-md w-full bg-white rounded-md shadow-sm ring-3 flex flex-col gap-5' ref={shareRef}>

                <div className="flex flex-col gap-2">
                   <p className='text-gray-500 font-semibold text-xs text-center my-1'>You can share you design with anyone</p>
                    <div>
                         <div className='flex items-center gap-1 justify-center w-full'>
                            {copy ?  <Check className='w-5 h-5 font-semibold text-purple-600'/> : <Link className='w-4 h-4 font-semibold text-purple-600'/>}
                           <p className='text-purple-500 font-semibold text-sm text-center my-1 trauncate'>{`${window.location.origin}/editor/${id}`}</p>
                         </div>
                        
                       
                    </div>
                </div>
                  
                <button className='flex items-center bg-purple-600 hover:bg-purple-500 text-gray-400 rounded-md h-12 justify-center transition-color cursor-pointer w-full font-semibold shadow-sm gap-2' onClick={handleCopySharedLink}>
                        <Share className='w-6 h-5 font-semibold text-white'/>
                        <p className='text-white font-semibold text-[1rem] italic'>Copy & Share</p>
                        </button>
                        
             </div>
             </div>
          )
          
          }
    </>
  )
}

export default ShareModel