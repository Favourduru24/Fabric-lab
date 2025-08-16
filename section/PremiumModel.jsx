'use client'
import { createPayPalOrder } from '@/services/subscription-service'
import { Clock, Crown, Loader2, Palette} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const PremiumModel = ({isOpen, premiumModelRef}) => {

    const [isLoading, setIsLoading] = useState(false)

    const handleUpgrade = async () => {
        setIsLoading(true)
      const response = await 
      createPayPalOrder()
      console.log(response)

      if(response.success) {
        window.location.href = response.data.approvalLink
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    }

  return (
    <>
        {
          isOpen && (
            <div className='inset-0 fixed bg-black/50 flex items-center justify-center z-50' >
              <div className='max-w-4xl w-full h-ft bg-white rounded-md shadow-sm shadow-white ring-3 relative flex items-start' >
                <div className="flex items-cente  mt-4">

       <div className='flex flex-col p-3' ref={premiumModelRef}>
                  <div>
                       <h1 className='text-[1.7rem] text-gray-800 font-semibold'>Upgrade To Fabric-lab Premium</h1>
               <p className='text-[1rem] text-gray-600 font-medium mt-3'><span className='text-purple-600 text-lg'>Upgrade</span> to <span className='font-semibold text-lg'>fabric-lab</span> premium and create quality design.</p>
                  </div>

                  <div className='flex items-start gap-2 border-2 rounded-lg p-2 mt-4 hover:bg-gray-50/50 cursor-pointer'>
                   <button>
                     <Crown className='w-5 h-5 text-gray-500'/>
                   </button>
                   <div className='flex flex-col gap-1'>
                   <h3 className='text-xl text-gray-800 font-semibold'>Premium Content</h3>
                   <p className='text-[1rem] text-gray-600 font-medium '>Upgrade to premium and create quality design.</p>
                   </div>
                  </div>
                  <div className='flex items-start gap-2 border-2 rounded-lg p-2 mt-4 hover:bg-gray-50/50 cursor-pointer'>
                   <button>
                     <Palette className='w-5 h-5 text-gray-500'/>
                   </button>
                   <div className='flex flex-col gap-1'>
                     <h3 className='text-xl text-gray-800 font-semibold'>Brand Tools</h3>
                   <p className='text-[1rem] text-gray-600 font-medium '>Create and maintain consistent brand identity.</p>
                   </div>
                  </div>
                  <div className='flex items-start gap-2 border-2 rounded-lg p-2 mt-4 hover:bg-gray-50/50 cursor-pointer'>
                   <button>
                     <Clock className='w-5 h-5 text-gray-500'/>
                   </button>
                   <div className='flex flex-col gap-1'>
                   <h3 className='text-xl text-gray-800 font-semibold'>Advance Editing</h3>
                   <p className='text-[1rem] text-gray-600 font-medium '>Time scaling tools for professional design.</p>
                   </div>

                   
                  </div>

                     <button className='mt-5 bg-purple-600 w-full p-3 rounded-lg cursor-pointer hover:bg-purple-500 flex items-center justify-center' onClick={handleUpgrade}>
                         <p className='text-[1rem] text-gray-600 font-semibold text-center text-white'>{isLoading ? (
                           <span className='flex gap-2 items-center'>
                              <Loader2 className='w-5 h-5 animate-spin text-white'/>
                              <p className='text-[1rem] text-gray-600 font-semibold text-center text-white'>Processing..</p>
                           </span>
                         ) : 'Upgrade'}</p>
                    </button>
             </div>
                   
                 
                </div>
               <div className='hidden md:block md:w-[450px] h-[550px]'>
                   <Image
                     alt='Team Collaboration'
                     src='/img1.png'
                     className='w-full h-full 
                     object-cover'
                     width={500}
                     height={500}
                   />
                  </div>
             </div>
             </div>
          )
          
          }
    </>
  )
}

export default PremiumModel