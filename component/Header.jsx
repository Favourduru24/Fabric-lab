'use client'

import { useSession } from "next-auth/react"
import Search from "./Search"
import UserModal from "./UserModal"

const Header = () => {
 const {data:session } = useSession()
 
 
  return (
    <header className="h-16 border-b hover:gray-200 bg-white flex items-center px-6 fixed top-0 right-0 left-[72px] z-10 gap-3">
            <div className='z-10'>
           <p className='text-black font-semibold sm:text-2xl sm:text-xl italic text-lg'>Fabric-lab</p>
        </div>  
            <Search />
         <div className="flex items-center gap-5 ml-4">
             <UserModal/>
         </div>
    </header>
  )
}

export default Header