import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className='w-full min-h-[85vh] flex items-center justify-center'>
        <div className='min-h-[85vh] md:w-[50%] w-[90%] flex flex-col items-center justify-center text-xl font-medium gap-10 p-10'>
            <p className='italic text-white'>
"Welcome to Blogs - Where stories come alive! Explore our collection of blogs, share your own tales. Let's make writing fun and easy for everyone!"</p>

        <button className='italic text-white bg-[#FD356D] px-4 py-2 rounded-full'><Link to='./blogs'>Explore Blogs!</Link></button>

        </div>
    </div>
  )
}

export default HomePage