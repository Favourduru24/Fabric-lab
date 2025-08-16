'use client'

import { useSession } from "next-auth/react"
import { Search } from "lucide-react"

const Header = () => {
 const {data:session } = useSession()
 
 
  return (
    <header className="h-16 border-b hover:gray-200 bg-white flex items-center px-6 fixed top-0 right-0 left-[72px] z-10">
            <div className='absolute top-4 left-4 z-10'>
           <p className='text-black font-semibold text-2xl italic'>Fabric-lab</p>
        </div>  
         <div className="flex-1 max-w-2xl mx-auto relative items-center">
           <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
            <input  placeholder="Search your Project and Canvas's" className="pl-10 py-4 border-gray-200 bg-gray-50 focus-visible:ring-purple-600 focus:ring-2 flex-grow outline-none w-full rounded-lg placeholder:text-gray-400"/>
         </div>
         <div className="flex items-center gap-5 ml-4">
            <div className="flex items-center gap-1 cursor-pointer">
                    Hello
            </div>
         </div>
    </header>
  )
}

export default Header