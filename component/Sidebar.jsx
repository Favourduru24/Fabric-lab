'use client'
import {Home, Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveDesign } from '@/services/design-service'
import { useEditorStore } from '@/store'
import { NavLinks } from '@/constant'
import Image from 'next/image'


const Sidebar = () => {

    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [clicked, setClicked] = useState({
            icon: <Home className="h-6 w-6"/>, label: 'Home', active: true
            })
    const {setPremiumModal, setProjectModal} = useEditorStore()
    
      const handleCreateNewDesign = async () => {
        if(loading) return 
        try {
            
            const initialDesignData = {
               name: 'Untitled design',
               canvasData: null,
               width: 825,
               height: 465,
               category: 'youtube_thumbnail'
            }
    
            const newDesign = await saveDesign(initialDesignData)
    
             console.log(newDesign)
    
            if(newDesign?.success) {
               router.push(`/editor/${newDesign?.data?.id}`)
            }
    
        } catch (error) {
           console.log(error)
        }
      }

      const handleSideBarDisplay = (sidebarState) => {
         switch (sidebarState.label) {
            case 'Billing':
               setPremiumModal(true) 
                break;
            case 'Projects':
               setProjectModal(true) 
                break;
            default: null
                break;
         }
         setClicked(sidebarState)
      }

        

  return (
    <aside className='w-[72px] bg-[#f8f8fc] border-r flex flex-col items-center py-4 fixed left-0 top-0 h-full z-20'>
       <div className='flex flex-col items-center  '>
        <button className='w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-color'>
            <Plus className='w-6 h-6'/>
        </button>
        <div className="text-xs font-medium text-center mt-1 text-gray-700">
           Create
        </div>
       </div>
        <nav className='mt-8 flex flex-col items-center space-y-6 w-full justify-between h-full'>
            <div>
            {
                NavLinks.map((menuItem, index) => (
                     <div key={index} className="flex flex-col items-center w-full" onClick={() => handleSideBarDisplay(menuItem)}>
                         <div
                          className={`flex flex-col items-center  hover:bg-gray-100 hover:text-purple-600 cursor-pointer ${clicked.label === menuItem.label ? 'bg-purple-600 text-white rounded-md w-16 py-1 my-2' : 'font-medium text-xs text-gray-600 w-full py-2'}`}
                         >
                              <div className='relative'>
                                 {menuItem.icon}
                                </div>  
                                <span className={`mt-1 text-xs ${clicked.label === menuItem.label ? 'font-semibold' : 'font-medium text-gray-600'}`}>{menuItem.label}</span>
                         </div> 
                     </div>
                ))
            }
            </div>

            <div className='w-full justify-center flex items-center mb-20'>
                         <div className='w-10 h-10 rounded-full bg-black'>
                           <Image src="/vercel.svg" width={50} height={50} className='size-full rounded-full object-cover'/>
                         </div>    
                        </div>
        </nav>
    </aside>
  )
}

export default Sidebar