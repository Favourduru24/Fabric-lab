'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import {useEditorStore} from '../../store/index'
import { useSession } from 'next-auth/react'
import {fetchWithAuth } from '@/services/base-service'
import { Upload, Loader, Search } from 'lucide-react'
import { uploadFileWithAuth } from '@/services/upload-service'
import { addImageToCanvas } from '@/fabric/fabric-utils'

function UploadPanel  (){

   const {canvas} = useEditorStore()
   const [isLoading, setIsLoading] = useState(false)
   const [isUploading, setIsUploading] = useState(false)
   const [userUploads, setUserUploads] = useState([])
   const fileRef = useRef()


   const {data: session, status} = useSession()

   const fetchUserUploads = useCallback(async () => {
       if(status === 'authenticated' && !session?.idToken) return
       try {
         setIsLoading(true)

         const userImages = await fetchWithAuth('/v1/media/get-asset')

          console.log({userImages})

         setUserUploads(userImages?.data)

       } catch(e) {
         console.log(e)
       } finally{
        setIsLoading(false)
       }
   }, [status, session?.idToken])

   useEffect(() => {
    if(status === 'authenticated')   fetchUserUploads()

   }, [status, fetchUserUploads])


  const handleFileUpload = async (e) => {
      
    const files = e.target.files[0]

    setIsUploading(true)

      try {

       const result = await uploadFileWithAuth(files)

       setUserUploads(prev => [result?.data, ...prev])
        
      } catch (error) {
        console.log(error, 'Error uploading image')
      } finally {
        setIsUploading(false)
        e.target.value = ''
      }
  }

 const handleClick = () => {
    fileRef.current.click()  
 }

const handleAddImage = (imageUrl) => {
    if(!canvas) return
    addImageToCanvas(canvas, imageUrl)
}

     
  return (
    <div className='h-full overflow-y-auto'>
         <div className='p-4 space-y-4'>
              <div className='flex gap-2'>
                 <button className={`w-full flex items-center justify-center gap-2 py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md cursor-pointer h-12 font-semibold transition-color ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  onClick={handleClick}
                 >
                  <input type='file' className='hidden'
                  ref={fileRef} 
                  accept='image/*'
                   onChange={handleFileUpload}
                   disabled={isUploading}/>
                   <Upload className='w-5 h-5'/>
                   <span className=''>{isUploading ? 'Uploading...' : 'Upload Files'}</span>
                 </button>
              </div>
              <div className="mt-4">
        <h4 className="text-sm text-gray-500 mb-5 font-semibold">Your Upload</h4>
        {
          isLoading 
           ? 
           <div className="border p-6 flex rounded-md items-center justify-center gap-2 shadow-sm">
             <Loader className="w-5 h-5 text-gray-500 animate-spin"/>
               <p className='text-gray-500 text-sm font-semibold'>Loading your uploads...</p>
           </div> 
           : 
             
                 <>
                
                  {userUploads.length > 0 ?
                   (
                    <div className="grid grid-cols-3 gap-3">
                      {userUploads.map((img, index) => (
                    <div
                    className="aspect-auto bg-gray-50 rounded-md overflow-hidden hover:opacity-85 transition-opacity relative group cursor-pointer"
                  key={index}
                  onClick={() => handleAddImage(img.url)}
                  >
                <img 
                 src={img.url}
                 alt={img.name}
                 className="w-full h-hull object-cover"
                />
              </div>
               ))} 
                    </div>
                   )
                  : (
                <div className="border p-6 flex rounded-md items-center justify-center gap-2 shadow-sm">
             <Search className="w-5 h-5 text-gray-500"/>
               <p className='text-gray-500 text-sm font-semibold'>No Upload found</p>
           </div> )}
                 </>
           

        }
              </div>
         </div>
    </div>
  )
}

export default UploadPanel