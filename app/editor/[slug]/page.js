'use client'
import EditorDetails from '@/section/EditorDetails'
import { getUserDesign } from '@/services/design-service'
import { getUserSubscription } from '@/services/subscription-service'
import { useEditorStore } from '@/store'
import { useEffect } from 'react'

const EditorPage = () => {
   const {setUserSubscription, setUserDesign} = useEditorStore()
   
      const fetchUserSubscription = async () => {
        const response = await getUserSubscription()
   
         if(response?.success) setUserSubscription(response.data)
   
     }
   
      async function fetchUserDesign() {
                const result = await getUserDesign()
                console.log({result}) 
                setUserDesign(result?.data)
   
             }
   
     useEffect(() => {
        fetchUserSubscription()
        fetchUserDesign()
     },[])

  return (
    <EditorDetails/>
  )
}

export default EditorPage