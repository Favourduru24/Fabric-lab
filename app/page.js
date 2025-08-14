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
import { useEffect } from 'react'
 
 const Home = () => {

  const {setUserSubscription, setUserDesign, showPremiumModal} = useEditorStore()

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

  const closeUpdradePlan = () => {
       setPremiumModal(false)
     }

    
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
        <PremiumModel isOpen={showPremiumModal} onChange={closeUpdradePlan}/>
     </div>
   )
 }
 
 export default Home