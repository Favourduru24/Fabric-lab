'use client'
import { useEditorStore } from '@/store'
import { Eye, Pencil } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const DropDown = ({ 
  options, 
  value, 
  onChange, 
  placeholder = 'Select...',
  className = '',
  overflow,
  onClick
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (val) => {
    onChange(val)
    setIsOpen(false)
  }

  const {isEditing, setIsEditing} = useEditorStore()
  
       const handleIsEditing = () => {
           setIsEditing(true)
           console.log('editing')
       }
  
       const handleIsViewing = () => {
           setIsEditing(false)
           console.log('viewing')
       }

  return (
    <div 
      ref={selectRef}
      className={`relative w-full ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-2 text-left  rounded-md shadow-sm focus:ring-[#9E4B9E] h-10 w-full outline-none cursor-pointer gap-3"
      >
        {isEditing ? <Pencil className='w-5 h-5'/> : <Eye/>}
        <span className='text-white font-medium text-lg'>{value || placeholder}</span>
        
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className={`${overflow ? '-top-0' : ''} absolute z-10 w-full mt-3 bg-[#ffffff] rounded-md shadow-lg flex items-center`}>
          <ul className="py-1 overflow-auto text-base  focus:outline-none flex flex-col">
             
            {options.map((option) => (
              <li
                key={option.label}
                onClick={() => handleSelect(option.value)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-50 ${
                  value === option.value ? ' text-gray-400' : 'text-gray-400 font-semibold text-[1rem]'
                }`}
              >
                 <div className='flex justify-between items-center gap-2' onClick={option.label === 'Viewing' ? handleIsViewing : handleIsEditing}>
                    <button>{option.icon}</button>
                <p >{option.label}</p>

                 </div>
              </li>
            ))}
          </ul>
             
        </div>
      )}
    </div>
  )
}

export default DropDown