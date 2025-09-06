'use client'
import { useState, useEffect, useRef } from 'react'

const CustomDropdown = ({ 
  options, 
  value, 
  onChange, 
  placeholder = 'Select...',
  className = '',
  overflow,
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


  return (
    <div 
      ref={selectRef}
      className={`relative w-full ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-2 text-left  rounded-md shadow-sm focus:ring-[#9E4B9E] h-10 w-full outline-none cursor-pointer"
      >
        <span className='text-gray-400 font-medium text-lg'>{value || placeholder}</span>
        <svg
          className={`w-5 h-5 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className={`${overflow ? '-top-40' : ''} absolute z-10 w-full mt-2 bg-[#ffffff] rounded-md shadow-lg flex items-center`}>
          <ul className="py-1 overflow-auto text-base  focus:outline-none flex flex-col w-full">
             
            {options.map((option) => (
              <li
                key={option.label}
                onClick={() => {
                  onChange(option.label) 
                  setIsOpen(false)
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-50 w-full ${
                  value === option.value ? 'text-gray-400 font-semibold' : 'text-gray-400 text-[1rem]'
                }`}
              >
                <p 
                  style={{fontFamily: option.label}}
                >
                  {option.label}
                  </p>
              </li>
            ))}
          </ul>
             
        </div>
      )}
    </div>
  )
}

export default CustomDropdown