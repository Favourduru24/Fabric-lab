'use client'
import { saveDesign } from '@/services/design-service'
import { Crown, Loader2 } from 'lucide-react'
import {useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEditorStore } from '@/store'

const Banner = () => {

   const [loading, setLoading] = useState(false)
   const router = useRouter()
   const {userSubscription, userDesign} = useEditorStore()

  const handleCreateNewDesign = async () => {
     if(userDesign.length >= 5 && !userSubscription.isPremium) {
        console.log('Please upgrade to premium!')
        return
     }

    if(loading) return 

    try {
       setLoading(true)
        
        const initialDesignData = {
           name: 'Untitled design',
           canvasData: null,
           width: 825,
           height: 465,
           category: 'youtube_thumbnail'
        }

        const newDesign = await saveDesign(initialDesignData)

        if(newDesign && newDesign?.success) {
           router.push(`/editor/${newDesign?.data?._id}`)
           setLoading(false)
        } else {
           throw new Error('Failed to create new design.')
        }

    } catch (error) {
       console.error(error, 'Something went wrong creating canvas file.')
    } finally{
       setLoading(false)
    }
  }

 

  return (
    <div
     className='rounded-xl overflow-hidden bg-gradient-to-r from-[#00c4cc] via-[#8b3dff] to-[#5533ff] text-white p-4 sm:p-6 md:p-8 text-center'
    >
      <div className='flex flex-col sm:flex-row justify-center items-center mb-2 sm:mb-4 '>
          <Crown className='h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-yellow-300'/>
          <span className='sm:ml-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-10'>Create Innovative Designs</span>
      </div>
      <h2 className='text-sm text-base md:text-lg font-bold mb-4 sm:mb-6 max-w-2xl mx-auto leading-6'>Design eye-caching thumbnails that get more views</h2>
      <button className='text-[#8b3dff] bg-white hover:bg-gray-50/50 hover:text-white rounded-lg sm:w-42 h-11 sm:w-38 w-full font-semibold cursor-pointer shadow-sm'
       onClick={handleCreateNewDesign}
       >
        {loading ? (
          <Loader2 className='w-5 h-5 animate-spin mx-auto'/>
        ): (
         'Start Designing'
        )}
      </button>
    </div>
  )
}

export default Banner