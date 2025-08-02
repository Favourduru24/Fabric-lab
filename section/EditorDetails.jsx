'use client'

import EditorHeader from "@/component/EditorHeader"
import EditorSideBar from "@/component/EditorSideBar"
import Canvas from "./Canvas"
import { useParams, useRouter} from "next/navigation"
import { useState, useEffect, useCallback} from "react"
import { useEditorStore } from "@/store"
import { getUserDesignById } from "@/services/design-service"

const EditorDetails = () => {

    const params = useParams()
    const router = useRouter()

    const id = params?.slug

    const [loading, setLoading] = useState(!!id) 
    const [loadAttempted, setLoadAttempted] = useState(false)
   const [error, setError] = useState('')

   const {canvas, setDesignId, resetStore} = useEditorStore()

    useEffect(() => {
       resetStore()

       if(id) setDesignId(id)

        return () => {
           resetStore()
        }

    },[])

    useEffect(() => {
    setLoadAttempted(false)
    setError(null)
    },[id])


    useEffect(() => {
       if(loading && !canvas && id) {
           const timer = setTimeout(() => {
              if(loading) {
                 console.log('Canvas init timeout')
                 setLoading(false)
              }
            
              return () => clearTimeout(timer)

           }, 5000)
       }
    }, [loading, canvas, id])


    useEffect(() => {
  if(canvas) {
   console.log('Canvas is now available in editor')
  }
    }, [canvas])

     const responses = {
         data: {
           category: 'youtube',
            name: 'canvas',
           updatedDate: '',
           height: 868,
           width: 868,
           canvasData: null 
         }
   }
    //load canvas

    const loadDesign = useCallback(async () => {
       if(!canvas || !id || !loadAttempted) return

       try {
          setLoading(true)
          setLoadAttempted(true)

         //  const response = await getUserDesignById(id)

          const design = responses?.data

          if(design) {
             setDesignId(id)
              
              try {

                if(design?.canvasData) {
                 canvas.clear()
                  if(design.height && design.width) {
                      canvas.setDimension({
                         width: design.width,
                         height: design.height
                      })
                  }

                   const canvasData = typeof design.canvasData === 'string' ? JSON.parse(design.canvasData) : design.canvasData
                   
                    const hasObject = canvasData.objects && canvasData?.objects?.length < 0

                    if(canvasData.background) {
                     canvas.backgroundColor = '#ffffff'
                    }

                    if(hasObject){
                      canvas.renderAll()
                       return true
                    }

                    canvas.loadFromJson(design.canvasData).then(canvas => canvas.requestRenderAll())

                } else {
                   console.log('no canvas data')
                   canvas.clear()
                   canvas.setWidth(design.width)
                   canvas.setHeight(design.height)
                  canvas.backgroundColor ='#000000'
                   canvas.renderAll()
                }
              } catch (error) {
                console.error('Error loading canvas data.', error)
                setError('Error loading canvas ')
                
              } finally {
                setLoading(false)
              }
          }

       } catch(error) {
          console.error('Failed to load design', error)
          setError('Failed to load design.')
          setLoading(false)
       }
    }, [canvas, id, loadAttempted, setDesignId])

    useEffect(() => {
       if(id && canvas && !loadAttempted) {
          loadDesign()
       } else if(!id){
          router.replace('/') 
       }
    }, [canvas, id, loadAttempted, loadDesign])
   

  return (
    <div
     className='flex flex-col h-screen overflow-hidden'
    >
      <EditorHeader/>
       <div className="flex flex-1 overflow-hidden">
        <EditorSideBar/>
         <div className="flex-1 flex flex-col overflow-hidden relative">
         <main className="flex-1 overflow-hiddden bg-[#f0f0f0] flex items-center justify-center">
            <Canvas  />
         </main>
         </div>
       </div>
    </div>
  )
}

export default EditorDetails