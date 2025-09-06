'use client'
import AiFeaures from '@/component/AiFeaures'
import Banner from '@/component/Banner'
import DesignType from '@/component/DesignType'
import Header from '@/component/Header'
import Sidebar from '@/component/Sidebar'
import PremiumModel from '@/section/PremiumModel'
import RecentDesign from '@/section/RecentDesign'
import { getUserSubscription } from '@/services/subscription-service'
import { useEditorStore } from '@/store'
import {getUserDesign, getAllDesign} from '@/services/design-service'
import { useEffect, useRef } from 'react'
import ProjectModel from '@/section/ProjectModel'
 
 const MainPage = ({query, category}) => {

  const {setUserSubscription,
         setUserDesign,
         showPremiumModal,
         setPremiumModal,
         projectModal,
         setProjectModal,
         setColorDisplay,
        setDesign} = useEditorStore()
  const projectModelRef = useRef()
  const premiumModelRef = useRef()

   const fetchUserSubscription = async () => {
     const response = await getUserSubscription()

      if(response?.success) setUserSubscription(response.data || [])

  }

   async function fetchUserDesigns() {
  try {

    const result = await getUserDesign({query, category});
    setUserDesign(result?.data?.data || []);
  } catch (error) {
    console.error('Failed to fetch designs:', error);
  }
}

   async function fetchAllDesigns() {
  try {

    const result = await getAllDesign({query, category});
    setDesign(result?.data?.data || []);
  } catch (error) {
    console.error('Failed to fetch designs:', error);
  }
}

   

  useEffect(() => {
     fetchUserSubscription()
     fetchUserDesigns()
     fetchAllDesigns()
  },[query])

  useEffect(() => {
    const closeUpdradePlan = (e) => {
        if(premiumModelRef.current && !premiumModelRef.current.contains(e.target)){
          setPremiumModal(false)
           setColorDisplay(false)
         } 

         if(projectModelRef.current && !projectModelRef.current.contains(e.target)) {
           setProjectModal(false)
           setColorDisplay(false)
         }
        }
         document.addEventListener('mousedown', closeUpdradePlan)
         return () => document.removeEventListener('mousedown', closeUpdradePlan)
   }, [])

   return (
     <div className='flex min-h-screen bg-white'>
        <Sidebar/>
         <div className='flex-1 flex flex-col ml-[72px]'>
           <Header />
            <main className='flex-1 p-6 overflow-y-auto pt-20'>
                <Banner/>
                <DesignType />
                <AiFeaures/>
                <RecentDesign/>
            </main>
         </div>
        <PremiumModel isOpen={showPremiumModal}  premiumModelRef={premiumModelRef}/>
        <ProjectModel isOpen={projectModal} projectModelRef={projectModelRef}/>
     </div>
   )
 }
 
 export default MainPage