'use client'
import { X } from 'lucide-react'

const PremiumModel = ({isOpen, setIsOpen, onChange}) => {

    // const [isOpen, setIsOpen] = useState(false)

    // const handleToggleModal = () => {
    //     setIsOpen((prev) => !prev)
    // }

  return (
    <>
        {
          isOpen && (
            <div className='inset-0 fixed bg-black/50 flex items-center justify-center z-50'>
              <div className='max-w-2xl w-full h-[20rem] bg-white rounded-md shadow-sm shadow-white ring-3 relative ' >
             <X className='w-5 text-black h-5 border rounded-sm absolute top-0 right-0 cursor-pointer'onClick={onChange}/>

             </div>
            
             </div>
          )
          
          }
    </>
  )
}

export default PremiumModel