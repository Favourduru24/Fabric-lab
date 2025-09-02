import { useEditorStore } from "@/store"
import { Sparkle, X } from "lucide-react"
import Link from 'next/link'
import {DesignCategory} from '@/constant'
import CustomDropdown from "@/component/CustomDropDown"
import Search from "@/component/Search"
import {useState} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/fabric/fabric-utils'

const ProjectModel = ({isOpen, userDesign, projectModelRef}) => {

  const ArrayData = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const [dropDowm, setDropDown] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  const onSelectdropDowm = (dropDowm) => {
  let newUrl = ''
 if(dropDowm && dropDowm !== 'All Designs') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key:'dropDowm',
        value: dropDowm
     })
 } else{
  newUrl = removeKeysFromQuery({
    params: searchParams.toString(),
    keysToRemove:['dropDowm'],
 })
 }

   router.push(newUrl, {scroll: false})
}


  return (
          <>
        {
          isOpen && (
    <div className="inset-0 fixed bg-black/50 flex items-center justify-center z-50">
         <div className="max-w-[100rem] w-full bg-white rounded-md shadow-sm shadow-white ring-3 flex flex-col p-2" ref={projectModelRef}>

                      <div className="flex md:flex-row flex-col md:items-center justify-between px-2 my-5 gap-3 md:w-full">
 <div className="flex items-center gap-2">
                    <Sparkle className="text-yellow-500 w-6 h-6"/>
                     <h1 className='text-[1.5rem] text-gray-700 font-semibold whitespace-nowrap'>Recents Project.</h1>
                      </div>

                       <div className="md:w-[30rem] w-full">
                           <Search/>
                        </div>

                        <div className="md:w-[20rem] w-full">
                           <CustomDropdown
                           options={DesignCategory}
                          placeholder="Design Category"
            value={dropDowm}
            onChange={(value) => {
                setDropDown(value)
              onSelectdropDowm(value)
            }}/>
                        </div>
                        
                     
                      </div>
                     

                  <div className="overflow-y-scroll h-[30rem] p-2">
                     <div className='gap-4 grid sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] grid-cols-[repeat(auto-fill,minmax(170px,1fr))]'>
        {/* {userDesign.map((design) => (
           <Link href={`/editor/${design._id}`} key={design._id}> 
             <div className='group cursor-pointer'>
            <div className='h-[300px] rounded-lg mb-2 overflow-hidden transition-shadow group-hover:shadow-md p-2'>
                  {
                   design.canvasData && <DesignCard design={design} key={design._id}/> 
                  }             
            </div>
             </div>
             </Link>
        ))} */}
        {ArrayData.map((design) => (
           <Link href={`/editor/${design}`} key={design}> 
             <div className='group cursor-pointer'>
            <div className='sm:h-[300px] h-[200px] rounded-lg mb-2 overflow-hidden transition-shadow group-hover:shadow-md p-2 bg-gray-50'>
                   {design}           
            </div>
             </div>
             </Link>
        ))}
      </div>
                    </div>     

           
          <div className="w-ful items-center my-2">
           <div className="flex gap-4 items-center justify-end">
            <button className="rounded-full  h-10 w-32 font-medium shadow-sm flex items-center  cursor-pointer backdrop-lg flex gap-2 items-center justify-center text-gray-400 hover:bg-gray-50">
               Prev
            </button>
            <button className="rounded-full  h-10 w-32 font-medium shadow-sm flex items-center  cursor-pointer backdrop-lg flex gap-2 items-center justify-center text-gray-400 hover:bg-gray-50">
               Next
            </button>
           </div>
         </div>

         </div>
    </div> )
        }
      </>
  )
}

export default ProjectModel