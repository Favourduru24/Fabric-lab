 import AiFeaures from '@/component/AiFeaures'
import Banner from '@/component/Banner'
import DesignType from '@/component/DesignType'
import Header from '@/component/Header'
import Sidebar from '@/component/Sidebar'
import RecentDesign from '@/section/RecentDesign'
 
 const Home = () => {
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
     </div>
   )
 }
 
 export default Home