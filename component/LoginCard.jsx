import React from 'react'

const LoginCard = () => {
  return (
    <div className='bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4 transition'>
       <div className='space-y-6'>
         <div className='text-center'>
           <h3 className='text-2xl font-bold text-gray-800'>Jump back in!</h3>
           <p className='mt-3 text-gray-500 text-lg '>Sign in to continue to Fabric-lab</p>
         </div>
            <button className={`w-full flex justify-center items-center gap-3 py-4 text-gray-700 border-[2px] border-gray-300 hover:border-[#8b3dff] hover:text-[#8b3dff] transition-all duration-300 group transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer rounded-lg hover:bg-gray-50/20`}>
              <div className='rounded-full p-1 flex items-center justify-center group-hover:text-[#8b3dff] transition-color duration-300'>
                {/* <Login className='w-5 group-hover:text-[#8b3dff] transition-colors duration-300 h-5 hover:text-[#8b3dff]'/> */}
                <span className='font-semibold '>Continue with Google</span>
              </div>
            </button>
       </div>
    </div>
  )
}

export default LoginCard