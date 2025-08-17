import { useEditorStore } from "@/store"
import { Sparkle, X } from "lucide-react"

const ProjectModel = ({isOpen, userDesign, projectModelRef}) => {

  return (
          <>
        {
          isOpen && (
    <div className="inset-0 fixed bg-black/50 flex items-center justify-center z-50">
         <div className="max-w-[100rem] w-full h-[20rem] bg-white rounded-md shadow-sm shadow-white ring-3 relative flex items-start p-3" ref={projectModelRef}>
            
          <div>
                      <div className="flex items-center gap-2">
                    <Sparkle className="text-yellow-500 w-6 h-6"/>
                     <h1 className='text-[1.5rem] text-gray-700 font-semibold'>Recents Designs.</h1>
                      </div>
                       
            </div>
         </div>
    </div> )
        }
      </>
  )
}

export default ProjectModel