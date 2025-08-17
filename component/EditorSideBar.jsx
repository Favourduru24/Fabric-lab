import { ArrowLeft, ChevronLeft, Grid, Pencil, Settings, Sparkle, Type, Upload } from 'lucide-react'
import React, { useState } from 'react'
import Element from './panel/Element'
import Text from './panel/Text'
import UploadPanel from './panel/Upload'
import DrawPanel from './panel/Draw'
import SettingPanel from './panel/Setting'
import AiPanel from './panel/Ai'
import ElementPanel from './panel/Element'
import Image from 'next/image'

const EditorSideBar = () => {
    const [isPanelCollased, setIsPanelCollapsed] = useState(false)
    const [activeSideBar, setActiveSideBar] = useState(null)

    const sideBarItems = [
      {
        id: 'elements',
        icon: Grid,
        label: 'Elements',
        panel: () => <ElementPanel/>
      },
      {
        id: 'text',
        icon: Type,
        label: 'Text',
        panel: () => <Text/>
      },
      {
        id: 'uploads',
        icon: Upload,
        label: 'Uploads',
        panel: () => <UploadPanel/>
      },
      {
        id: 'draw',
        icon: Pencil,
        label: 'Draw',
        panel: () => <DrawPanel/>
      },
      {
        id: 'ai',
        icon: Sparkle,
        label: 'Ai',
        panel: () => <AiPanel/>
      },
      {
        id: 'settings',
        icon: Settings,
        label: 'Settings',
        panel: () => <SettingPanel/>
      },
    ]
 
    const handleItemClick = (id) => {
        if(id === activeSideBar && !isPanelCollased) return

         setActiveSideBar(id)
         setIsPanelCollapsed(false)
    }

    const closeSecondaryPanel = () => {
        setActiveSideBar(null)
    }

    const activeItem = sideBarItems.find(item => item.id === activeSideBar)
   
     const togglePanelCollapse = (e) => {
       e.stopPropagation()
       setIsPanelCollapsed(!isPanelCollased)
     }

  return (
    <div className='flex h-full bg-gray-50 '>

       <aside className='w-[100px] flex rounded-[4px] transition-color text-white bg-transperent  border-none  flex-col w-full h-full justify-between'>
            <div>
           {sideBarItems.map((item) => (
           <div key={item.id} className={`${activeSideBar === item.id ? 'bg-gray-100' : 'bg-transperent'} w-full flex items-center flex-col justify-center hover:cursor-pointer hover:bg-gray-100 hover:text-purple-60 p-1 h-18 px-2 `} onClick={() => handleItemClick(item.id)}>
              <item.icon className='h-9 w-9 text-gray-500 justify-center flex font-thin'/>
              <span className='text-gray-400 text-xs mt-1 font-semibold'>{item.label}</span>
             
           </div>
         ))} 
            </div>
           
         
           <div className='w-full justify-center flex items-center mb-20'>
             <div className='w-10 h-10 rounded-full bg-black'>
               <Image src="/vercel.svg" width={50} height={50} alt="user-img" className='size-full rounded-full object-cover'/>
             </div>    
            </div>
      </aside>

       <div>
         {
        activeSideBar && (
           <div className={`
           ${isPanelCollased ? 'w-0  transform' : ''} h-full  bg-white relative transition-all duration-200 border-r shadow-r-sm`}
              style={{width: isPanelCollased ? '0' : '320px', opacity: isPanelCollased ? 0 : 1,
                overflow: isPanelCollased ? 'hidden' : 'visible'
              }}
           >
              <div className='h-16 flex items-center border-b-1 border-[#e6e6e6] gap-1'>
                 <button className='cursor-pointer p-1' onClick={closeSecondaryPanel}>
                    <ArrowLeft className='h-5 w-5 text-gray-500'/>
                 </button>
                 <span className='text-gray-500 font-semibold'>
                    {activeItem?.label}
                 </span>
              </div>
                 <div className=''>
                   {activeItem?.panel()}
                 </div>

                 <button className='w-0 absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer' onClick={togglePanelCollapse}>
                    <ChevronLeft className='w-8 h-8  bg-white text-gray-400 shadow-md rounded-full '/>
                 </button>
           </div>
        )
      }
       </div>
      
    </div>
  )
}

export default EditorSideBar