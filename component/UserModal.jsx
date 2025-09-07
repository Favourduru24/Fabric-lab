'use client'
import { useSession } from "next-auth/react"
import {useState, useEffect, useRef} from 'react'
import Image from 'next/image'
import {LogOut} from 'lucide-react'


const UserModal = () => {

 const {data:session } = useSession()
 const [open, setOpen] = useState(false)
 const userRef = useRef(null)

  useEffect(() => {
    
    const closeUpdradePlan = (e) => {
        if(userRef.current && !userRef.current.contains(e.target)){
          setOpen(false)
         } 
        }
         document.addEventListener('mousedown', closeUpdradePlan)
         return () => document.removeEventListener('mousedown', closeUpdradePlan)
   }, [])


  return (
      
    <div className="flex items-center gap-2 p-2 py-3 rounded-md shadow-sm focus:ring-[#9E4B9E] h-12 w-fit outline-none cursor-pointer gap-3 bg-white/10 hover:bg-white/20 text-black relative" onClick={() => setOpen((prev) => !prev)} >
         {open && (
          <div className="absolute z-50 text-black -bottom-14 md:w-40 w-fit h-8 bg-white h-fit p-2 py-3 rounded-md shadow-sm " ref={userRef}>

           <div className="flex items-center justify-center gap-2" >
                <LogOut className="w-5 h-5 text-gray-500"/>
           <p className="text-gray-400 text-xs font-semibold text-[1rem]">Logout</p>
           </div>

         </div> )}
      <div className='w-10 h-10 rounded-full bg-black '>
                        {/* <Image src={session?.user?.image} width={50} height={50} alt="user-img" className='size-full rounded-full object-cover' /> */}
                        </div>  
                        <p className="text-gray-400 text-xs font-semibold sm:text-[1rem] text-xs hidden md:flex">Duru Pristine</p>
    </div>
  )
}

export default UserModal