'use client'

import { brushSize, drawPanelColorPreset, tablet } from "@/constant"
import { useEditorStore } from "@/store"
import { Droplets, EraserIcon, Minus, Paintbrush, Palette, PencilIcon, Plus } from "lucide-react"
import { useState } from "react"

 
function DrawPanel () {

   const {canvas} = useEditorStore()
   const [isDrawingMode, setIsDrawingMode] = useState(false)
   const [isErasing, setIsErasing] = useState(false)
   const [drawingColor, setDrawingColor] = useState("#000000")
   const [brushWidth, setBrushWidth] = useState(8)
   const [drawingOpacity, setDrawingingOpacity] = useState(100)
   const [activeTab, setActiveTab] = useState('colors')

   const [tabClick, setTabClick] = useState({
       label: 'Color',
       icon: <Palette className='h-4 w-4 text-gray-300'/>,
       id: 1
    },)

    
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

   const handleBrushWidthChange = (width) => {
      setBrushWidth(width)
   }

   const handleDrawingOpacityChange = (value) => {
      const opacity = Number(value.target.value)
       setDrawingingOpacity(opacity)
   }

   const handleToggleErasing = () => {
     const newErasing = !isErasing
     setIsErasing(newErasing)
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
                   

                 {tabClick.id === 2 && 
                  <>
                 <div className="w-full space-y-4">
                     <h3 className="text-gray-400 font-semibold">Brush Size</h3>
                     <div className="flex items-center space-x-3">
                      <Minus className="h-4 w-4 text-gray-500 whitespace-nowrap cursor-pointer"/>
                      <input type="range" max="20" min="1" step="0.01" className="flex-1  accent-black-500 h-[4px] transition-all transition-transform" value={brushWidth} onChange={(e) =>  setBrushWidth(e.target.value)}/>
                      <Plus className="h-4 w-4 text-gray-500 whitespace-nowrap cursor-pointer"/>
                     </div>
                    </div>

                    <div className="flex items-center gap-1 mt-5 w-full gap-1">
                              {brushSize.map((brush) => (
                                 <button key={brush.value}
                                  className={`px-2 py-1 h-auto border border-gray-400 shadow-md shadow-white w-fit rounded-md text-gray-400 whitespace-nowrap font-semibold text-sm ${brushWidth === brush.value ? 'bg-gray-50' : 'bg-transparent cursor-pointer'}` } onClick={() => handleBrushWidthChange(brush.value)}
                                 >
                                    {brush.label}
                                 </button>
                              ))}
                       </div>

                        <div className="space-y-2 mt-4">
                           <div className="flex justify-between items-center">
                              <div className="flex gap-2 items-center">
                                <Droplets className="mr-2 h-4 w-4 text-gray-500"/>
                             <h3 className="text-gray-400 font-semibold">Opacity
                               </h3>
                              </div>
                               <span className="text-sm font-medium text-gray-400">{drawingOpacity}%</span>
                              
                           </div>

                           <input type="range" max="100" min="1" step="1" className="flex-1  accent-black-500 h-[4px] transition-all transition-transform w-full" value={drawingOpacity} onChange={(value) => handleDrawingOpacityChange(value)}/>
                        </div>
                  </>
                     }
               </div>

               {tabClick.id === 3
                && 
               <button 
                className={`w-full py-4 border-2 flex items-center justify-center rounded-lg cursor-pointer gap-2 shadow-md transition-color ${isErasing ? 'bg-red-500 text-white' : 'bg-transparent text-gray-400'}`}
                onClick={handleToggleErasing}
               >
                  
                    <EraserIcon className="w-5 h-5"/>
                    <p className=" font-semibold">{isErasing ? 'Stop Erasing' : 'Eraser Mode'}</p>
                </button>
                }
            </>
           }
       </div>
    </div>
  )
}

export default DrawPanel