'use client'

import { drawPanelColorPreset, tablet } from "@/constant"
import { useEditorStore } from "@/store"
import { EraserIcon, Minus, Paintbrush, Palette, PencilIcon } from "lucide-react"
import { useState } from "react"

 
function DrawPanel () {

   const {canvas} = useEditorStore()
   const [isDrawingMode, setIsDrawingMode] = useState(false)
   const [isErasing, setIsErasing] = useState(false)
   const [drawingColor, setDrawingColor] = useState("#000000")
   const [brushWidth, setBrushWidth] = useState(5)
   const [drawingOpacity, setBrushingOpacity] = useState(100)
   const [activeTab, setActiveTab] = useState('colors')

   const [tabClick, setTabClick] = useState({
       label: 'Color',
       icon: <Palette className='h-4 w-4 text-gray-300'/>,
       id: 1
    },)

   const [color, setColor] = useState(false)
   const [brush, setBrush] =useState(false)
   const [tools, setTools] = useState(false)

   const handleToggleDrawwingMode = () => {
      const newMode = !isDrawingMode
      setIsDrawingMode(newMode)

      if(newMode && isErasing) {
        setIsErasing(false)
      }
   }

   const handleDrwingColorChage = (color) => {
     setDrawingColor(color)
   }

  return (
    <div className="p-4">
       <div className="space-y-5">
          <button onClick={handleToggleDrawwingMode} className={`w-full p-4 group transition-all flex items-center border  duration-200 justify-center gap-1 cursor-pointer rounded-md  ${isDrawingMode ? 'bg-black text-white' : 'bg-transparent hover:bg-gray-50 focus:bg-gray-100'}`}>
            <PencilIcon 
             className={`mr-2 h-5 w-5 text-gray-300 ${isDrawingMode ? "animate-bounce " : "hover:animate-bounce"}`}
            />
            <span className={`font-semibold   ${isDrawingMode ? 'text-white' : 'text-gray-500'}`}>{isDrawingMode ? 'Exit Drawing Mode' : 'Enter Drawing Mode'}</span>
          </button>
           {
            isDrawingMode && <>
               <div className="flex flex-col w-full mt-2 justify-center">
                 <div className={`flex items-center justify-center gap-3 mb-4 border-2 w-full h-10 px-2 rounded-md`} >
                   {tablet.map((tab) => (
              <div className={`flex items-center gap-1 ${tabClick.id === tab.id ? 'bg-gray-50 p-1 text-black rounded-md' : 'bg-transparent cursor-pointer text-gray-400'}`} key={tab.label} onClick={() => setTabClick(tab)}>
               {tab.icon}
                <span className=" text-[1rem] font-semibold">{tab.label}</span>
                     </div>
                   ))}
                 </div>

                  {tabClick.id === 1 && 
                  <>
                  <div className="w-ful space-y-1">
                      <div className="flex justify-between items-center">
                      <p className="text-gray-400 font-semibold">Color Pallette</p>
                      <div className="w-8 h-8 rounded-full shadow-sm border" style={{backgroundColor: drawingColor}}/>
                      </div>
                   </div>
                   <div className="grid grid-cols-5 gap-2 mt-4">
                          {drawPanelColorPreset.map((color) => (
                       <div key={color} >
                                                                           <button style={{backgroundColor: color}} 
                    className={`w-10 h-10 rounded-full border transition-transform hover:scale-110 ${color === drawingColor ? 'ring-1 ring-offset-2 ring-primary' : 'cursor-pointer'}`}                                                />
                       </div>
                          ))}
                        </div>

                  <div className="flex mt-5 space-x-2 items-center">
                   <div className="relative">
                     <input type="color" value={drawingColor} onChange={(e) => handleDrwingColorChage(e.target.value)} 
                      className={`w-12 h-10 p-1 cursor-pointer`}
                       disabled={isErasing}
                     />
                   </div>
                    <input type="text" value={drawingColor} className="flex-1 border shadow-sm shadow-white text-gray-500 rounded-md border-gray-400 h-8" placeholder={drawingColor}
                onChange={(e) => handleDrwingColorChage(e.target.value)}
                disabled={isErasing}
               />
                  </div>
                  </>
                  }
                   

                 {tabClick.id === 2 && <div className="w-full space-y-4">
                     <h3 className="text-gray-400 font-semibold">Brush Size</h3>
                     <div className="flex items-center space-x-3">
                      <Minus className="h-1 w-4 text-gray-500"/>
                     </div>
                    </div> }
               </div>
            </>
           }
       </div>
    </div>
  )
}

export default DrawPanel