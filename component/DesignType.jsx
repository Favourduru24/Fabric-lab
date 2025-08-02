import { designTypes } from '@/constant'
import React from 'react'

const DesignType = () => {
  return (
    <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 mt-13 justify-center '>
      {designTypes.map((type, index) => (
         <div className='flex flex-col items-center ' key={index}>
            <div className={`${type.bgColor} w-14 h-14 rounded-full flex items-center justify-center mb-2 cursor-pointer`}>
                {type.icon}
            </div>
            <span className='text-xs text-center text-gray-400'>{type.label}</span>
         </div>
      ))}
    </div>
  )
}

export default DesignType