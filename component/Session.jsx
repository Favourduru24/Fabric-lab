'use client'
import {SessionProvider} from 'next-auth/react'
import { Provider } from "react-redux"
import store from '@/app/store'


 function Session ({children}) {
     return (
       <SessionProvider>
        <Provider store={store}>
           {children}
        </Provider>
       </SessionProvider>  
     )
 }

 export default Session