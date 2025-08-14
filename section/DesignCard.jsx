 'use client'
 import React, { useEffect, useRef, useState } from 'react'
 
 const DesignCard = ({design}) => {
     const {canvasId} = useState(`canvas-${design._id}-${Date.now()}`)
     const fabricCanvasRef = useRef(null)

       useEffect(() => {
          if(!design?.canvasData) return
           
           const timer = setTimeout(async () => {

                try {

                 if(fabricCanvasRef.current && typeof fabricCanvasRef.current.dispose() === 'function') {

                try {
                       
                    fabricCanvasRef.current.dispose() 
                    fabricCanvasRef.current = null

                  } catch (error) {
                  console.error('Error while disposing canvas', error)    
                }
               }

              const fabric = await import('fabric')

              const canvasElement = document.getElementById(canvasId)

              if(!canvasElement) return 

             const designPreview = new fabric.StaticCanvas(canvasId, {
                width: 300,
                height: 300,
                renderOnAddRemove: true
             })

             fabricCanvasRef.current = designPreview

              let canvasData 

                 try {

                 canvasData = typeof design.canvasData === 'string' ?
                  JSON.parse(design.canvasData) : design.canvasData 
                 } catch (innerError) {
                   console.error('Error parsing canvas data', innerError)
                   return 
                 }

                 if(canvasData.background){
                     designPreview.backgroundColor = canvasData.background
                     designPreview.requestRenderAll()
                 }

                 designPreview.loadFromJSON(canvasData, () => {
                      designPreview.requestRenderAll() 
                 })

                } catch (error) {
                  console.log('Error')
                }
                
          }, 100)

          return () =>{
             clearTimeout(timer)
             if(fabricCanvasRef.current && typeof fabricCanvasRef.current.dispose === 'function') {
                try {
                    fabricCanvasRef.current.dispose() 
                    fabricCanvasRef.current = null 
             } catch(e) {
                console.log('Error while disposing canvas.') 
             }
          }
        }

       }, [design?._id, canvasId]) 

   return (
      <canvas
          id={canvasId}
          width="300"
          height="300"
          className='h-full w-full object-contain'
      />
   )
 }
 
 export default DesignCard

  