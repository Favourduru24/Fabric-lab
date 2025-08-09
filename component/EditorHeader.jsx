'use client'
import DropDown from './DropDown'
import { useEffect, useState } from 'react'
import { dropmenu } from '@/constant'
import { useEditorStore } from '@/store'
import { Download, Save, Search, Star } from 'lucide-react'
import ExportModel from '@/section/ExportModel'

const EditorHeader = () => {
    
     const [select, setSelect] = useState('')
     const [show, setShow] = useState(false)
     const {isEditing, setIsEditing, name, setName, canvas} = useEditorStore()

     useEffect(() => {
         if(!canvas) return
         canvas.selection = isEditing
          canvas.getObjects().forEach((obj) => {
            obj.selectable = isEditing
            obj.evented = isEditing
          })
     }, [isEditing])

     const handleToggleModal = () => {
       setShow((prev) => !prev)
     }

  return (
    <header className='flex px-4 justify-between items-center bg-gradient-to-r from-[#00c4cc] via-[#8b3dff] to-[#5533ff] h-14 py-2'>
       <div className='flex items-center space-x-4 '>
            <DropDown options={dropmenu} value={select} onChange={(value) => setSelect(value)} placeholder={isEditing ? 'Editing' : 'Viewing'} 
              /> 

              <button className='relative '>
           <Save className='w-6 h-6 cursor-pointer'/>
        </button> 
              <button className='relative' onClick={() => setShow(true)}>
           <Download className='w-6 h-6 cursor-pointer' onClick={handleToggleModal}/>
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
             <button className='flex items-center bg-white/10 hover:bg-white/20 text-white rounded-md h-10 px-3 transition-color cursor-pointer w-full'>
             <Star className="h-4 w-4 mr-1 text-yellow-400 "/>
               <span>Upgrade your plan</span>
             </button>

              <DropDown options={dropmenu} value={select} onChange={(value) => setSelect(value)} placeholder={isEditing ? 'Editing' : 'Viewing'} 
              /> 
          </div>
          <ExportModel isOpen={show} onChange={handleToggleModal} isClosed={setShow}/>
    </header>
  )
}

export default EditorHeader