'use client'

import { cloneSelectedCanvas, deleteSelectedCanvas } from "@/fabric/fabric-utils"
import { useEditorStore } from "@/store"
import { Copy, Delete, FlipHorizontal, MoveDown, MoveUp, Trash } from "lucide-react"
import { useEffect, useState } from "react"

function Property() {
       
  const {canvas} = useEditorStore()

   const [selectedObj, setSelectedObj] = useState(null)
   const [opacity, setOpacity] = useState(100)
   const [width, setWidth] = useState(0)
   const [height, setHeight] = useState(0)


   const [text, setText] = useState('')
   const [Fonsize, setFonSize] = useState(24)
   const [fontFamily, setFontFamily] = useState('Arial')
   const [weight, setWeight] = useState('normal')
   const [fontSize, setFontSize] = useState('normal')
   const [underline, setUnderline] = useState('')
   const [textColor, setTextColor] = useState('#000000')
   const [textBackgrounColor , setTextBackgrounColor] = useState('')
   const [letterSpacing, setLetterSpacing] = useState(0)
   
   
     useEffect(() => {
      if(!canvas) return

        const handleSelectionCreated = () => {

        const activeObject = canvas.getActiveObject() 

        if(activeObject) {
          setSelectedObj(activeObject)
          setOpacity(Math.round(activeObject.opacity * 100) || 100)

        setWidth(Math.round(activeObject.width * activeObject.scaleX))

        setHeight(Math.round(activeObject.height * activeObject.scaleY))

        }
      }

      const handleSelectionCleared = () => {
 
      }
       
      const activeObject = canvas.getActiveObject()

       if(activeObject) {
        handleSelectionCreated()
       }

       canvas.on('selection:created', handleSelectionCreated)
      canvas.on('selection:updated', handleSelectionCreated)
      canvas.on('selection:cleared', handleSelectionCleared)
      canvas.on('object:modified', handleSelectionCreated)

      return () => {
        canvas.off('selection:created', handleSelectionCreated)
      canvas.off('selection:updated', handleSelectionCreated)
      canvas.off('selection:cleared', handleSelectionCleared)
      canvas.off('object:modified', handleSelectionCreated)
      }

     },[canvas, height, width])

      const updateObjectProperty = (property, value) => {
          if(!canvas || !setSelectedObj) return

          selectedObj.set(property, value)
          canvas.renderAll()
      }

     const handleOpacityChange = (value) => {
        setOpacity(value.target.value)
        updateObjectProperty('opacity', opacity / 100)

    }

    const handleDuplicate = async () => {
        if(!canvas || !selectedObj) return
        await cloneSelectedCanvas(canvas)
    }

    const handleDelete = () => {
     if(!canvas || !setSelectedObj) return
     deleteSelectedCanvas(canvas)
    }

    const handleBringToFront = () => {
     if(!canvas || !selectedObj) return
     
      canvas.bringObjectToFront(selectedObj)
      canvas.renderAll()
    }

    const handleSendToBack = () => {
     if(!canvas || !selectedObj) return

       canvas.sendObjectToBack(selectedObj)
      canvas.renderAll()
    }

    const handleTextChange = (e) => {
       
    }

    const handleFontSizeChange = (e) => {
       
    }

    const handleFontFamilyChange = (e) => {
       
    }
    const handleToggleBold = (e) => {
       
    }

    const handleToggleItalic = (e) => {
       
    }
    
    const handleToggleUnderline = (e) => {
       
    }

    const handleToggleTextColorChange = (e) => {
       
    }

    const handleToggleTextBackgroudColorChange = (e) => {
       
    }
    const handleLetterSpacingChange = (e) => {
       
    }

    



    return (
       <div className="fixed right-0 top-[56px] bottom-[0px] w-[280px] bg-white border-1 border-gray-200 z-10">
        <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center gap-2">
              <span className="font-medium text-lg text-gray-400">Properties</span>
            </div>
        </div>
       
       <div className="h-[calc(100%-96px)] overflow-auto p-4 space-y-6">
          <h3 className="text-sm font-semibold text-gray-500">Size & Position</h3>
           <div className="grid grid-cols-2 gap-3 ">
              {/* Width and height */}
             <div className="space-y-1">
                 <p className={`text-sm text-gray-500 font-semibold`}>Width</p>
                 <div
                  className="h-9 px-3 py-2 border rounded-md flex items-center text-gray-400 border-gray-200 shadow-sm w-28"
                 >{width}</div>
             </div>
             <div className="space-y-1 ">
                 <p className={`text-sm text-gray-500 font-semibold`}>Height</p>
                 <div className="h-9 px-3 py-2 border rounded-md flex items-center text-gray-400 border-gray-200 shadow-sm w-28"
                   
                  >{height}</div>
             </div>
                <div className="space-y-1 justify-center">
                <div className="flex justify-between items-center">
                   <p className={`text-xs text-gray-500 font-semibold`}>Opacity</p> 
                    <span className="text-sm text-gray-500 font-semibold">{opacity}%</span>
                </div>

                   <input type="range" max="100" min="1" step="1" className="flex-1  accent-purple-500 h-[4px] transition-all transition-transform max-w-[240px] w-[250px] mx-auto" 
                    value={opacity}
                    onChange={(value) => handleOpacityChange(value)}
                   />

                </div>
           </div>
              
              <div className="flex flex-wrap gap-3">
                   <button className="flex items-center gap-2 h-9 px-3 py-2 w-28 shadow-sm rounded-sm cursor-pointer">
                    <FlipHorizontal className="w-5 h-5 text-gray-400"/>
                 <p className="text-sm text-gray-500 font-semibold">Flip H</p>
                   </button>

                   <button className="flex items-center gap-2 h-9 px-3 py-2 w-28 shadow-sm rounded-sm cursor-pointer">
                    <FlipHorizontal className="w-5 h-5 text-gray-400"/>
                 <p className="text-sm text-gray-500 font-semibold">Flip V</p>
                   </button>
              </div>
               
               <div className="space-y-4 border-t">
                <h3 className="text-sm font-medium text-gray-500 ">Layer Position</h3>
                <div className="grid grid-cols-2 gap-2">
                     <button className="flex items-center gap-2 h-9 px-2 py-2 w-fit border rounded-sm shadow-sm cursor-pointer" onClick={handleBringToFront}>
                         <MoveUp className="h-4 w-4 text-gray-500"/>
                         <span className="text-xs text-gray-400 font-semibold">Bring to front</span>
                     </button>

                     <button className="flex items-center gap-1 h-9 px-2 py-2 w-fit border rounded-sm shadow-sm cursor-pointer" onClick={handleSendToBack}>
                         <MoveDown className="h-4 w-4 text-gray-500"/>
                         <span className="text-xs text-gray-400 font-semibold" >Send to back</span>
                     </button>
                </div>
               </div>

               <div className="space-y-4 border-t">
                <h3 className="text-sm font-medium text-gray-500 ">Duplicate & Delete</h3>
                <div className="grid grid-cols-2 gap-2">
                     <button className="flex items-center gap-2 h-9 px-2 py-2 w-fit border rounded-sm shadow-sm cursor-pointer" onClick={handleDuplicate}>
                         <Copy className="h-4 w-4 text-gray-500"/>
                         <span className="text-xs text-gray-400 font-semibold">Duplicate</span>
                     </button>

                     <button className="flex items-center gap-1 h-9 px-2 py-2 w-fit rounded-sm shadow-sm cursor-pointer bg-red-500" onClick={handleDelete}> 
                         <Trash className="h-4 w-4 text-white"/>
                         <span className="text-xs text-white font-semibold" >Delete</span>
                     </button>
                </div>
               </div>
          </div>
         </div>
    )
}

export default Property