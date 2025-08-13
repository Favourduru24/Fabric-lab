'use client'

import { colorPresets } from "@/constant"
import { centerCanvas } from "@/fabric/fabric-utils"
import { useEditorStore } from "@/store"
import { Palette, Check} from "lucide-react"
import { useState } from "react"

function SettingPanel  () {

   const {canvas, markAsModified} = useEditorStore()
   
   const [backgroundColor, setBackgroundColor] = useState('#ffffff')

   const handleColorChange = (e) => {
     setBackgroundColor(e.target.value)
   }

   const handleColorPresetApply = (getCurrentColor) => {
      setBackgroundColor(getCurrentColor)
   }

   const handleApplyChanges = () => {
        if(!canvas) return 
         canvas.set('backgroundColor', backgroundColor)
          canvas.renderAll()

         centerCanvas(canvas)
         markAsModified()
   }
   
  return (
    <div
     className='p-4 space-y-6'
    >
      <div className="flex items-center space-x-2 mb-4">
          <Palette className="w-5 h-5 text-purple-600"/> 
          <h3 className="text-lg font-semibold  text-gray-500">Choose Background Color </h3>
      </div> 
        <div className="space-y-2">
         <div className="grid grid-cols-6 gap-2 mb-3">
           {colorPresets.map((color, index) => (
              <div className="" key={index}>
                  <button style={{backgroundColor: color}}
                   onClick={() => handleColorPresetApply(color)}
                  className={`w-8 h-8 rounded-md border transition-transform hover:scale-110 cursor-pointer group ${color === backgroundColor ? 'ring-2 ring-offset-2 ring-primary' : ''}`}>
                     {color === backgroundColor && <Check className="w-4 h-4 text-white drop-shadow-md mx-auto"/>}
                     <p className="absolute bottom-full mb-1 hidden group-hover:flex px-2 py-1 text-xs text-gray-500 bg-white rounded-md shadow-md">{color}</p>
                  </button>
              </div>
           ))}
         </div>

           <div className="flex mt-3 space-x-2 ">
               <div className="relative flex items-center gap-1">
              <input type="color" value={backgroundColor} 
               onChange={handleColorChange}
               className="w-12 h-10 p-1 cursor-pointer"/>
               <input type={"text"} value={backgroundColor} className="flex-1" placeholder="#ffffff"
                onChange={handleColorChange}
               />
               </div>
           </div>
           <div className="my-4"/>
            <button className={`w-full text-white bg-purple-600 hover:bg-purple-700 transition-all rounded-md py-3 font-semibold text-[1rem] cursor-pointer`} onClick={handleApplyChanges}>
               Apply Changes
            </button>
        </div>
    </div>
  )
}

export default SettingPanel