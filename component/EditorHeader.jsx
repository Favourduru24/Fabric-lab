'use client'
import DropDown from './DropDown'
import { useEffect, useState } from 'react'
import { dropmenu } from '@/constant'
import { useEditorStore } from '@/store'
import { Download, Loader, Loader2, Save, Search, Share, Star } from 'lucide-react'
import ExportModel from '@/section/ExportModel'
import PremiumModel from '@/section/PremiumModel'

const EditorHeader = () => {
    
     const [select, setSelect] = useState('')
     const [show, setShow] = useState(false)
     const [upgradeModal, setUpdradeModal] = useState(false)
     const {
      isEditing,
      markAsModified,
      name,
      setName,
      canvas,
      id, 
      saveStatus,
      userDesign,
      showPremiumModal,
      setPremiumModal,
      userSubscription
    } = useEditorStore()

     useEffect(() => {
         if(!canvas) return
         canvas.selection = isEditing
          canvas.getObjects().forEach((obj) => {
            obj.selectable = isEditing
            obj.evented = isEditing
          })
     }, [isEditing])

     useEffect(() => {
       if(!canvas || !id) return
        
          markAsModified()
     }, [name, canvas, id])

     const handleToggleModal = () => {
       setShow((prev) => !prev) 
     }

     const closeUpdradePlan = () => {
       setPremiumModal(false)
     }

     const handleExport = () => {
      // userDesign.length >= 5 && !userSubscription.isPremium
        if(!upgradeModal) {
         console.log('Please upgrade to premium!')
         setPremiumModal(true)
        return
     } else {
      setShow(true) 
     }

     }

  return (
    <header className='flex px-4 justify-between items-center bg-gradient-to-r from-[#00c4cc] via-[#8b3dff] to-[#5533ff] h-14 py-2'>
       <div className='flex items-center space-x-4 '>
            <DropDown options={dropmenu} value={select} onChange={(value) => setSelect(value)} placeholder={isEditing ? 'Editing' : 'Viewing'} 
              /> 

              <button className='relative'>
                {
                  saveStatus === 'Saving' ? 
                  (
            <Loader2 className='w-8 h-8 animate-spin'/>
                  ) : (
           <Save className='w-8 h-8 cursor-pointer'/>
                  )
                }
        </button> 
       </div>
        
         <div className='flex-1 flex justify-center max-w-md '>
          <div className="flex-1 max-w-2xl mx-auto relative items-cente h-10 ">
                     <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-white "/>
                      <input 
                      value={name} onChange={(e) => setName(e.target.value)} className="pl-10 focus:border-white  focus:border focus:ring-2 flex-grow outline-none w-full rounded-lg h-full placeholder:text-white border"/>
                   </div>
         </div>
          <div className='flex items-center space-x-3 w-fit whitespace-nowrap /'>
             <button className='flex items-center bg-white/10 hover:bg-white/20 text-white rounded-md h-10 px-3 transition-color cursor-pointer w-full font-semibold text-sm shadow-sm' onClick={!userSubscription?.isPremium ? () => setPremiumModal(true) : null}>
             <Star className="h-4 w-4 mr-1 text-yellow-400 "/>
               <span>{userSubscription?.isPremium ? 'Premium Member' : 'Upgrade your plan'}</span>
             </button>
             <button className='flex items-center gap-2 px-4 py-2 rounded-md shadow-sm focus:ring-[#9E4B9E] h-10 w-full outline-none cursor-pointer gap-3 bg-white/10 hover:bg-white/20' onClick={handleExport}>
                <Download className='w-6 h-6 cursor-pointer text-white'/>
              <p className='text-white font-semibold text-sm'>Download</p>
              </button>
             <div className='flex items-center gap-2 px-4 py-2 rounded-md shadow-sm focus:ring-[#9E4B9E] h-10 w-full outline-none cursor-pointer gap-3 bg-white/10 hover:bg-white/20'>
               <Share className='w-5 h-5 text-white'/>
              <p className='text-white font-semibold text-sm'>Share</p>
              </div>

              <DropDown options={dropmenu} value={select} onChange={(value) => setSelect(value)} placeholder={isEditing ? 'Editing' : 'Viewing'} 
              /> 
          </div>
          <ExportModel isOpen={show} onChange={handleToggleModal} isClosed={setShow}/>

          <PremiumModel isOpen={showPremiumModal} onChange={closeUpdradePlan} isClosed={setUpdradeModal}/>
    </header>
  )
}

export default EditorHeader