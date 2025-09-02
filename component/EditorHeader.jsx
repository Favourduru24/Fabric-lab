'use client'
import DropDown from './DropDown'
import { useEffect, useState, useRef} from 'react'
import { dropmenu } from '@/constant'
import { useEditorStore } from '@/store'
import { Download, Loader, Loader2, Save, Search, Share, Star, Menu, UsersIcon } from 'lucide-react'
import ExportModel from '@/section/ExportModel'
import PremiumModel from '@/section/PremiumModel'
import ShareModel from '@/section/ShareModel'
import Link from 'next/link'

const EditorHeader = () => {
    
     const [select, setSelect] = useState('')
     const [show, setShow] = useState(false)
     const [open, setOpen] = useState(false)
     const [openShareModel, setOpenShareModel] = useState(false)
     const downloadModelRef = useRef(null)
     const premiumModelRef = useRef(null)
     const shareRef = useRef(null)
     const menuRef = useRef(null)

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

      useEffect(() => {
         const closeUpdradePlan = (e) => {
             if(premiumModelRef.current && !premiumModelRef.current.contains(e.target)){
               setPremiumModal(false)
     
              } 
     
              if(downloadModelRef.current && !downloadModelRef.current.contains(e.target)) {
                setShow((prev) => !prev)
              }

               if(menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false) 
               }

               if(shareRef.current && !shareRef.current.contains(e.target)) {
                setOpenShareModel(false) 
               }
             }

              document.addEventListener('mousedown', closeUpdradePlan)
              return () => document.removeEventListener('mousedown', closeUpdradePlan)
        }, [])

     const handleToggleModal = () => {
       setShow((prev) => !prev) 
       setOpen(false)
     }

     const handleShareModal = () => {
       setOpenShareModel((prev) => !prev) 
       setOpen(false)
     }


     const handleExport = () => {
      // userDesign.length >= 5 && !userSubscription.isPremium
        if(upgradeModal) {
         console.log('Please upgrade to premium!')
         setPremiumModal(true)
        return
     } else {
      setShow(true) 
      setOpen(false)
     }

     }

  return (
    <header className='flex px-4 justify-between items-center bg-gradient-to-r from-[#00c4cc] via-[#8b3dff] to-[#5533ff] h-14 py-2 relative gap-2'>
      
       <div className='flex items-center space-x-4'>
        <Link href='/'>
           <p className='text-white font-semibold text-2xl italic whitespace-nowrap'>Fabric-lab</p>
        </Link> 
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
       
            
          <div className='flex-1 justify-center max-w-md hidden lg:flex'>
          <div className="flex-1 max-w-2xl mx-auto relative h-10 ">
                     <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-white "/>
                      <input 
                      value={name} onChange={(e) => setName(e.target.value)} className="pl-10 focus:border-white border-gray-100 focus:border focus:ring-2 flex-grow outline-none w-full rounded-lg h-full placeholder:text-white border text-white" placeholder="Untittled Design"/>
                   </div>
         </div>

          <div className='hidden lg:flex items-center space-x-3 w-fit whitespace-nowrap /'>
             <button className='flex items-center bg-white/10 hover:bg-white/20 text-white rounded-md h-10 px-3 transition-color cursor-pointer w-full font-semibold text-sm shadow-sm' onClick={!userSubscription?.isPremium ? () => setPremiumModal(true) : null}>
             <Star className="h-4 w-4 mr-1 text-yellow-400 "/>
               <span>{userSubscription?.isPremium ? 'Premium Member' : 'Upgrade your plan'}</span>
             </button>
             <button className='flex items-center gap-2 px-4 py-2 rounded-md shadow-sm focus:ring-[#9E4B9E] h-10 w-full outline-none cursor-pointer gap-3 bg-white/10 hover:bg-white/20 my-1' onClick={handleExport}>
                <Download className='w-6 h-6 cursor-pointer text-white'/>
              <p className='text-white font-semibold text-sm'>Download</p>
              </button>
             <div className='flex items-center gap-2 px-4 py-2 rounded-md shadow-sm focus:ring-[#9E4B9E] h-10 w-full outline-none cursor-pointer gap-3 bg-white/10 hover:bg-white/20' onClick={handleShareModal}>
               <Share className='w-6 h-5 font-semibold text-white'/>
              <p className='text-white font-semibold text-sm'>Share</p>
              </div>

               <div className='flex items-center gap-2 px-4 py-2 rounded-md shadow-sm focus:ring-[#9E4B9E] h-10 w-fit outline-none cursor-pointer gap-3 bg-white/10 hover:bg-white/20'>
               <UsersIcon className='w-6 h-5 font-semibold text-white'/>
              <p className='text-white font-semibold text-sm'>Create a Team</p>
              </div>
          </div>

             <button className='lg:hidden flex items-center bg-white/10 hover:bg-white/20 text-white rounded-md h-10 px-3 transition-color cursor-pointer  font-semibold text-sm shadow-sm' onClick={() => setOpen((prev) => !prev)}>
                <Menu/>
             </button>
               {
                open && (
               <div className="fixed inset-0  bg-black/10 z-50 w-full flex sm:justify-end justify-center">
                  <div className='max-w-md w-full h-fit bg-white rounded-sm flex flex-col sm:justify-end justify-center mt-16 sm:mr-5 p-2 gap-4' ref={menuRef}>
                         
                         <div className='max-w-md flex'>
                      <div className="flex-1 max-w-2xl mx-aut relative h-12 ">
                     <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-gray-400 "/>
                      <input 
                      value={name} onChange={(e) => setName(e.target.value)} className="pl-10 focus:border-gray-400 border-gray-100 focus:border focus:ring-2 flex-grow outline-none w-full rounded-lg h-12 placeholder:text-gray-400 border text-gray-400" placeholder="Untittled Design"/>
                   </div>
                    </div>

                     <div className="w-full flex-col">
                        <button className='flex items-center bg-white/10 hover:bg-white/20 text-gray-400 rounded-md h-12 justify-center transition-color cursor-pointer w-full font-semibold shadow-sm gap-2 ' onClick={handleExport}>
                        <Download className='w-5 h-5 cursor-pointer text-purple-500'/>
                      <p className='text-gray-400 font-semibold text-[1rem]'>Download</p>
                      </button>
                     </div>
                         
                         <div className="w-full flex-col">
                         <div className='flex items-center bg-purple-600 hover:bg-purple-500 text-gray-400 rounded-md h-12 justify-center transition-color cursor-pointer w-full font-semibold shadow-sm gap-2' onClick={handleShareModal}>
                        <Share className='w-6 h-5 font-semibold text-white'/>
                      <p className='text-white font-semibold text-sm'>Share</p>
                           </div>

                     </div>

                         <div className="w-full flex-col">
                                  <p className='text-gray-400 font-semibold text-xs text-center my-1'>Build your team for this design</p>
                         <div className='flex items-center bg-purple-600 hover:bg-purple-500 text-gray-400 rounded-md h-12 justify-center transition-color cursor-pointer w-full font-semibold shadow-sm gap-2'>
                          <UsersIcon className='w-6 h-5 font-semibold text-white'/>
                        <p className='text-white font-semibold text-[1rem]'>Create a Team</p>
                        </div>
                     </div>

                    

                     <div className="w-full flex-col">
                        <button className='flex items-center bg-purple-600 hover:bg-purple-500 text-white rounded-md h-12 justify-center transition-color cursor-pointer w-full font-semibold text-sm shadow-sm ' onClick={!userSubscription?.isPremium ? () => {
                        setPremiumModal(true) 
                        setOpen((prev) => !prev)
                        } : null}>
                       <Star className="h-5 w-5 mr-1 text-yellow-400 "/>
                      <span>{userSubscription?.isPremium ? 'Premium Member' : 'Upgrade your plan'}</span>
                    </button>
                     </div>
                  </div>
                </div>
                )}

            

          <ExportModel isOpen={show} onChange={handleToggleModal} isClosed={setShow} downloadModelRef={downloadModelRef}/>

          <PremiumModel isOpen={showPremiumModal} isClosed={setUpdradeModal} premiumModelRef={premiumModelRef}/>

          <ShareModel shareRef={shareRef} isOpen={openShareModel} id={id}/>
    </header>
  )
}

export default EditorHeader