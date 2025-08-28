'use client'

import { useSession } from "next-auth/react"
import Search from "./Search"

const Header = () => {
 const {data:session } = useSession()
 
 
  return (
    <header className="h-16 border-b hover:gray-200 bg-white flex items-center px-6 fixed top-0 right-0 left-[72px] z-10">
            <div className='absolute top-4 left-4 z-10'>
           <p className='text-black font-semibold text-2xl italic'>Fabric-lab</p>
        </div>  
            <Search />
         <div className="flex items-center gap-5 ml-4">
            <div className="flex items-center gap-1 cursor-pointer">
                    Hello
            </div>
         </div>
    </header>
  )
}

export default Header