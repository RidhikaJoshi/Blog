import React from 'react'

function Header() {
  return (
   <div className='bg-slate-400 w-full h-16 flex flex-row items-center justify-between p-8'>
        {/* This div contains logo */}
      <div>Site-name</div>

    {/* This div contains list of navigation options */}
      
        <ul className='flex flex-row gap-6 text-lg'>
          <li>Home</li>
          <li>Blogs</li>
           <li>Write</li>
        </ul>
     


    {/* This div contains login and sign-up options */}
      <div className='flex flex-row justify-between gap-4 text-lg'>
        <button className='px-4 py-2 border-2 rounded-full'>Login</button>
        <button className='px-4 py-2 border-2 rounded-full'>Sign Up</button>
      </div>
    
   </div>
  )
}

export default Header