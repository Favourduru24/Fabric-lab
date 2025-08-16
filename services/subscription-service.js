import { fetchWithAuth } from "./base-service"

 export const getUserSubscription = () => {
     return fetchWithAuth('/v1/subscription/get-user-subcription')
 }

 export const createPayPalOrder = () => {
     return fetchWithAuth('/v1/subscription/create-order', {
        method: 'POST'
     })
 }

 export const capturePayPalOrder = (orderId) => {
     return fetchWithAuth('/v1/subscription/capture-order', {
        method: 'POST',
        body: {
            orderId
        }
     })
 }

 