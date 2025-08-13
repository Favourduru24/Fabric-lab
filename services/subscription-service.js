import { fetchWithAuth } from "./base-service"

 export const getUserSubscription = () => {
     return fetchWithAuth('/v1/subscription/get-user-subscription')
 }