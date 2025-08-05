'use client'

import EditorHeader from "@/component/EditorHeader"
import EditorSideBar from "@/component/EditorSideBar"
import Canvas from "./Canvas"
import { useParams, useRouter} from "next/navigation"
import { useState, useEffect, useCallback} from "react"
import { useEditorStore } from "@/store"
import { getUserDesignById } from "@/services/design-service"
import Property from "@/component/properties"

const EditorDetails = () => {

    const params = useParams()
    const router = useRouter()

    const id = params?.slug

    console.log({id})

    const [loading, setLoading] = useState(!!id) 

    const [loadAttempted, setLoadAttempted] = useState(false)

   const [error, setError] = useState(null)

   const {canvas, setId, resetStore, setName, setShowProperties, showProperties, isEditing} = useEditorStore()

    console.log({canvas})

    useEffect(() => {
       resetStore()

       if(id) setId(id)

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

           }, 5000)

           return () => clearTimeout(timer)
       }
    }, [loading, canvas, id])


    useEffect(() => {
   if(canvas) {
    console.log('Canvas is now available in editor')
   }
    }, [canvas])

    //load canvas

    const loadDesign = useCallback(async () => {
       if(!canvas || !id || loadAttempted) return

       try {
          setLoading(true)
          setLoadAttempted(true)

         //  const response = await getUserDesignById(id)

           const responses = {
         data: {
           category: 'youtube',
            name: 'canvas',
           updatedDate: '',
           height: 465,
           width: 825,
           canvasData: null 
         }
   }

          const design = responses?.data

          console.log([design, responses])

          if(design) {

             setName(design.name)
             
             setId(id)
              
              try {

                if(design.canvasData) {
                 canvas.clear()

                  if(design.height && design.width) {
                      canvas.setDimensions({
                         width: design.width,
                         height: design.height
                      })
                  }

                   const canvasData = typeof design.canvasData === 'string' ? JSON.parse(design.canvasData) : design.canvasData
                   
                    const hasObject = canvasData.objects && canvasData?.objects?.length > 0

                    if(canvasData.background) {
                     canvas.backgroundColor = canvasData.background
                    } else {
                     canvas.backgroundColor = '#ffffff'
                    }

                    if(!hasObject){
                      canvas.renderAll()
                       return true
                    }

                    canvas.loadFromJSON(design.canvasData).then((canvas) => canvas.requestRenderAll())

                } else {
                   console.log('no canvas data')
                   canvas.clear()
                   canvas.setWidth(design.width)
                   canvas.setHeight(design.height)
                  canvas.backgroundColor ='#ffffff'
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
    }, [canvas, id, loadAttempted, setId])

    useEffect(() => {
       if(id && canvas && !loadAttempted) {
          loadDesign()
       } else if(!id){
          router.replace('/') 
       }
    }, [canvas, id, loadAttempted, loadDesign, router])

    useEffect(() => {
     if(!canvas) return

      const handleSelectionCreated = () => {
          const activeObject = canvas.getActiveObject()

          console.log(activeObject)

          if(activeObject) {
             setShowProperties(true)
          }
      } 

      const handleSelectionCleared = () => {
         setShowProperties(false)
      }      

      canvas.on('selection:created', handleSelectionCreated)
      canvas.on('selection:updated', handleSelectionCreated)
      canvas.on('selection:cleared', handleSelectionCleared)

      return () => {
       canvas.off('selection:created', handleSelectionCreated)
      canvas.off('selection:updated', handleSelectionCreated)
      canvas.off('selection:cleared', handleSelectionCleared)
      }

    }, [canvas])
   

  return (
    <div
     className='flex flex-col h-screen overflow-hidden'
    >
      <EditorHeader/>
       <div className="flex flex-1 overflow-hidden">
         {isEditing && 
         <EditorSideBar/>
         }
         <div className="flex-1 flex flex-col overflow-hidden relative">
         <main className="flex-1 overflow-hiddden bg-[#f0f0f0] flex items-center justify-center">
            <Canvas  />
         </main>
         </div>
       </div>
        {
         showProperties && isEditing &&  <Property/>
        }
    </div>
  )
}

export default EditorDetails