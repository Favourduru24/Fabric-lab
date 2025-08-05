'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import {useEditorStore} from '../../store/index'
import { useSession } from 'next-auth/react'
import {fetchWithAuth } from '@/services/base-service'
import { Upload, Loader2 } from 'lucide-react'
import { uploadFileWithAuth } from '@/services/upload-service'
import { addImageToCanvas } from '@/fabric/fabric-utils'

function UploadPanel  (){

   const {canvas} = useEditorStore()
   const [isLoading, setIsLoading] = useState(false)
   const [userUploads, setUserUploads] = useState([])
   const fileRef = useRef()


  //  const {data: session, status} = useSession()

  //  const fetchUserUploads = useCallback(async () => {
  //      if(status === 'authenticated' || !session?.idToken) return
  //      try {
  //        setIsLoading(true)

  //        const data = await fetchWithAuth('/v1/media/get-asset')

  //         // console.log(data)

    // setUserUploads(data?.data)

  //      } catch(e) {
  //        console.log(e)
  //      } finally{
  //       setIsLoading(false)
  //      }
  //  }, [status, session?.idToken])

  //  useEffect(() => {
  //   if(status === 'authenticated')   fetchUserUploads()

  //  }, [status, fetchUserUploads])


  const handleFileUpload = async (e) => {
      
    const files = e.target.files[0]

    setIsLoading(true)

      try {

       const result = await uploadFileWithAuth(files)

       setUserUploads(prev => [result?.data, ...prev])
        
      } catch (error) {
        console.log(error, 'Error uploading image')
      } finally {
        setIsLoading(false)
        e.target.value = ''
      }
  }

 const handleClick = () => {
    fileRef.current.click()  
 }

const images = [
  {
   url: '/img1.png',
   name: 'img1 png'
},
  {
   url: '/img1.png',
   name: 'img1 png'
},
  {
   url: '/img1.png',
   name: 'img1 png'
},
]

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
                   disabled={isLoading}/>
                   <Upload className='w-5 h-5'/>
                   <span className=''>{isLoading ? 'Uploading...' : 'Upload Files'}</span>
                 </button>
              </div>
              <div className="mt-4">
        <h4 className="text-sm text-gray-500 mb-5 font-semibold">Your Upload</h4>
        {
          isLoading 
           ? 
           <div className="border p-6 flex rounded-md items-center justify-center">
             <Loader2 className="w-4 h-4 "/>
               <p>Loading your uploads...</p>
           </div> 
           : 
             
                 <>
                
                  {images.length > 0 ?
                   (
                    <div className="grid grid-cols-3 gap-3">
                      {images.map((img, index) => (
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
                  : <p className="text-sm text-gray-500 mt-2 font-semibold">No image found!</p>}
                 </>
           

        }
              </div>
         </div>
    </div>
  )
}

export default UploadPanel