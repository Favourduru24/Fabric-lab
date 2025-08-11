import axios from 'axios'
import {getSession} from 'next-auth/react'
import {fetchWithAuth} from './base-service'
const API_URL = process.env.API_URL || 'http://localhost:4000'


export async function uploadFileWithAuth(file, mediaData = {}) {

     const session = await getSession()

     if(!session) {
        throw new Error('Not authenticated') 
     }

    const formData = new FormData()
    formData.append('file', file)

    Object.entries(mediaData).forEach(({key, value}) => {
       formData.append(key, value)
    })

    try {
      const response = await axios.post(`${API_URL}/v1/media/upload`, formData, {
        headers: {
            Authorization: `Bearer ${session.idToken}`,
            "Content-Type": "multipart/form-data"
        }
      })   

      return response.data
    } catch (error) {
       throw new Error('Upload failed')  
    }
}

export async function generateImageFromAi(prompt) {
   try {
      
      const response = await fetchWithAuth('', {
         method: 'POST',
         body: {
           prompt  
         }
      })

       return response

   } catch (error) {
      throw new Error(error.message)
   } 
}