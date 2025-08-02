import { initializeFabric } from '@/fabric/fabric-utils'
import { useEditorStore } from '@/store'
import { useEffect, useRef } from 'react'

const Canvas = () => {
   
    const canvasRef = useRef(null)
    const canvasContainerRef = useRef(null)
    const fabricCanvasRef = useRef(null)
    const initAttemptedRef = useRef(false)

    const {setCanvas, canvas} = useEditorStore()

    useEffect(() => {

    const cleanUpCanvas = () => {

      if(fabricCanvasRef.current) {
        try {
              fabricCanvasRef.current.dispose()
        } catch (error) {
           console.error('Error disposing canvas', error)
        }

        fabricCanvasRef.current = null
        setCanvas(null)
      }
    }

    cleanUpCanvas()

    initAttemptedRef.current = false

      const initCanvas = async () => {
        
       if(typeof window === undefined || !canvasRef.current || initAttemptedRef.current) {
          return 
       }

       initAttemptedRef.current = true

       try {
          const fabricCanvas = await initializeFabric(canvasRef.current, canvasContainerRef)

           if(!fabricCanvas) {
            console.error('Failed to initialized fabric.js canvas.')
             return 
           }

           fabricCanvasRef.current = fabricCanvas

           setCanvas(fabricCanvas)

           console.log('Canvas init is done and set in store.')
           console.log(canvas)

           //apply custom style for controller

           //setup evennt listenners

       } catch (error) {
         console.error('Failed to initialize canvas', error)
       }
     }

      const timer = setTimeout(() => {
            initCanvas() 
        }, 50)

      return () => {
         clearTimeout(timer)
         cleanUpCanvas()
      }
 
    },[])

  return (
    <div className='relative w-full h-[600px] overflow-auto' ref={canvasContainerRef}>
         <canvas ref={canvasRef}/>
      </div>
  )

}

export default Canvas