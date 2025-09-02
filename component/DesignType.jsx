import { designTypes } from '@/constant'
import { saveDesign } from '@/services/design-service'
import { useEditorStore } from '@/store'
import { Loader, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DesignType = () => {
  const [loading, setLoading] = useState(false)
  const [icon, setIcon] = useState(false)
  const router = useRouter()
  const {userDesign, userSubscription} = useEditorStore()
  const [currentSelected, setCurrentSelected] = useState(-1)
  const [currentIndex, setCurrentIndex] = useState(-1)

  const handleCreateNewDesign = async (getCurrentType, index) => {
         setCurrentSelected(index)

       if(userDesign.length >= 5 && !userSubscription.isPremium) {
          console.log('Please upgrade to premium!')
          return
       }
  
      if(loading) return 
  
      try {
         setLoading(true)
          
          const initialDesignData = {
             name: getCurrentType.label,
             canvasData: null,
             width: getCurrentType.width,
             height: getCurrentType.height,
             category: getCurrentType.label
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

    const handleDisplayTrue = (index) => {
      setCurrentIndex(index)
      setIcon(true)
    }

    const handleDisplayFalse = (index) => {
      setCurrentIndex(index)
      setIcon(false)
    }
  
  return (
    <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 mt-13 justify-center '>
      {designTypes.map((type, index) => (
         <div className='flex flex-col items-center ' key={type.label} >
            <div className={`${type.bgColor} sm:w-14 sm:h-14 w-10 h-10 rounded-full flex items-center justify-center mb-2 cursor-pointer shadow-sm  `} onClick={() => handleCreateNewDesign(type, index)} onMouseOver={() => handleDisplayTrue(index)} onMouseLeave={() => handleDisplayFalse(index)}>
                   
                  {currentIndex === index && icon ? type.icons : type.icon }
            </div>
             {

             }
             <div className='flex gap-2 items-center'>
              {loading && currentSelected === index ? 
               <div className='flex items-center' >
               <Loader2 className={`h-5 w-5 animate-spin text-whit text-gray-500`}/> 
               <span className='text-xs text-center text-gray-400'>{type.label}</span>
               </div>
              : 
               <span className='text-xs text-center text-gray-400'>{type.label}</span>
              }
            
             </div>
            
         </div>
      ))}
    </div>
  )
}

export default DesignType