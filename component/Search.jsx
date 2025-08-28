"use client"
import  { useState, useEffect } from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '../fabric/fabric-utils'
import { Search } from "lucide-react"

const SearchComponent = () => {

      const [query , setQuery] = useState('')

       const searchParams = useSearchParams()

       const router = useRouter()

       useEffect(() => {
        const delayDebounce = setTimeout(() => {
            let newUrl = ''

              if(query) {
                newUrl = formUrlQuery({
                  params: searchParams.toString(),
                  key: 'query',
                  value: query
                })
              } else {
                 newUrl = removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['query']
                 })

              }

             router.push(newUrl, {scroll: false})
        }, 200)       
      return () =>  clearTimeout(delayDebounce)
    }, [query, searchParams, router])

      return (
   <div className="flex-1 max-w-2xl mx-auto relative items-center">
              <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
               <input  placeholder="Search your Project and Canvas's" className="pl-10 py-3 border-gray-200 bg-[#ffffff] focus-visible:border focus:border flex-grow outline-none w-full rounded-lg placeholder:text-gray-400 shadow-sm placeholder:text-lg text-gray-500 " value={query} onChange={(e) => setQuery(e.target.value)}/>
            </div>
     )
}

export default SearchComponent
