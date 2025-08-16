 'use client'

import { capturePayPalOrder } from "@/services/subscription-service"
import { Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

 const SubscriptionSuccess = () => {
    
     const router = useRouter()
     const searchParams = useSearchParams()
     const [status, setStatus] = useState('proccessing')

     useEffect(() => {
       const orderId = searchParams.get('token')

       const proccessPayment = async () => {

          try {
           const response = await capturePayPalOrder(orderId)

           if(response.success) {
             router.push('/')
           }
          } catch (error) {
            setStatus('error')
          }
       }

       proccessPayment()

     }, [searchParams, router])
     
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4'>
       <div className="w-full max-w-md rounded-lg border p-8 shadow-lg">
          {
            status === 'proccessing' && (
               <div className="flex flex-col items-center text-center gap-2">
                  <Loader2 className="w-18 h-18 text-gray-600 animate-spin mb-4"/>
                  <h1 className="text-2xl font-bold text-gray-500">Processing Payment...</h1>
                 <p className='text-sm text-gray-500 font-semibold mt-2 '>Please wait while we confirm payment.</p>
               </div>
            )
          }
       </div>
    </div>
  )
 }

 export default SubscriptionSuccess