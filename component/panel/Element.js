'use client'

import { addShapeToCanvas } from "@/fabric/fabric-utils"
import { shapeDefinitions, shapeTypes } from "@/fabric/shape-utils"
import { useEditorStore } from "@/store"
import { useEffect, useRef, useState } from "react"

function ElementPanel () {


    
   const {canvas} = useEditorStore()
   const miniCanvasRef = useRef({})
   const canvasElementRef = useRef({})
   const [isInitialized, setIsInitialized] = useState(false)

   useEffect(() => {

    if(isInitialized) return 

     const timer = setTimeout(async () => {

       try {
         const fabric = await import('fabric')
          
          for(const shapeType of shapeTypes) {
           console.log({shapeType})
             
           const canvasElement = canvasElementRef.current[shapeType]

           if(!canvasElement) continue
           const canvasId = `mini-canvas-${shapeType}-${Date.now()}` 
           canvasElement.id = canvasId


           try {

            const definition = shapeDefinitions[shapeType]

            const miniCanvas = new fabric.StaticCanvas(canvasId, {
              width: 100,
              height: 100,
              backgroundColor: 'transparent',
              renderOnAddRemove: true
            })

            miniCanvasRef.current[shapeType] = miniCanvas
            definition.thumbnail(fabric, miniCanvas)
            miniCanvas.renderAll()
            
           } catch (error) {
             console.error('Error while creating definition.', error)
           }
          }
          setIsInitialized(true)

       } catch (error) {
         console.log('Failed to init', error)
       }
     }, 100)

      return () => clearTimeout(timer)

   },[isInitialized])

   useEffect(() => {

    return () => {
       Object.values(miniCanvasRef.current).forEach(miniCanvas => {
          if(miniCanvas && typeof miniCanvas.dispose === 'function') {
            try {
              miniCanvas.dispose()
            } catch (error) {
               console.error('Error disposing canvas', error)
            }
          }
       })

       miniCanvasRef.current={}
        setIsInitialized(false)
    }
   }, [])

   const setCanvasRef = (getCurrentElement, shapeType) => {
      if(getCurrentElement) {
         canvasElementRef.current[shapeType] = getCurrentElement  
      }
   }

   const handleShapeClick = (type) => {
       addShapeToCanvas(canvas, type)
   }

  return (
    <div
     className="h-full overflow-y-auto"
    >
      <div className="p-4">
        <div className="grid grid-cols-3 gap-1">
        {shapeTypes.map(shapeType => (
           <div key={shapeType} onClick={() => handleShapeClick(shapeType)} style={{height: '90px'}} className="cursor-pointer flex flex-col items-center justify-center">
              <canvas width="100" height="100" ref={(el) => setCanvasRef(el, shapeType)}/>
           </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default ElementPanel