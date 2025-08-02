'use client'

import { useEditorStore } from "@/store"
import { useEffect, useRef, useState } from "react"

function ElementPanel () {

   const {canvas} = useEditorStore()
   const miniCanvasRef = useRef()
   const canvasElementRef = useRef()
   const [isInitialized, setIsInitialized] = useState()

   useEffect(() => {
    if(isInitialized) return 

     const timer = setTimeout(async () => {
       try {
         const fabric = await import('fabric')
         
       } catch (error) {
         console.log('Failed to init', error)
       }
     })
   },[isInitialized])

  return (
    <div
     className=""
    >

    </div>
  )
}

export default ElementPanel