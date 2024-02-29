import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function HomePage() {

 const authStatus=useSelector((state)=>state.auth.status);

  return (
    <div className='w-full min-h-[85vh] flex flex-col items-center justify-center'>
      {/* // Introduction div */}
          <div className=' min-h-[90vh]  w-[90%] flex flex-col items-center justify-center text-2xl font-medium gap-10 p-10'>
              <p className='italic text-center md:text-4xl text-3xl font-bold text-white'>
  "Welcome to <span className='text-[#FD356D]'>BlogSphere</span> - Where stories come alive! </p>
 <p className='italic text-center text-white md:text-2xl text-xl'>Explore our collection of blogs, share your own tales. Let's make writing fun and easy for everyone!"</p>

          <button className='italic text-white bg-[#FD356D] px-4 py-2 rounded-full'><Link to='./blogs'>Explore Blogs!</Link></button>

          </div>



      {/* // Performance div */}
        <div className='min-h-[65vh]   w-[90%] flex flex-col items-center justify-center text-xl font-medium gap-10 text-white'>
            <p className='italic font-bold md:text-4xl text-2xl text-center '><span className='text-[#FD356D]'>Blogging platform</span> optimized for software developers and technical writers.</p>

        <div className=' text-white min-h-[40vh] w-full flex md:flex-row flex-col gap-4 justify-between'>
        {/* // Div contains text */}
      <div className=' text-center shadow-sm shadow-white rounded-xl md:w-[48%] w-full flex flex-col justify-center items-center p-4 gap-3'>
              <p className=' text-xl font-[540]'>Super-fast and SEO-optimized blogs built for developers and tech enthusiasts.</p>
              <p className='text-sm'>BlogSphere blogs are fast, up-to-date with SEO techniques, and score above 90 on all Lighthouse parameters. They're simple, elegant, and user-friendly.</p>
        </div>

      {/* // This div conatins image */}
      <div className='md:w-[48%] rounded-xl w-full flex flex-wrap flex-row items-center justify-center shadow-sm shadow-white'>
         <div className='flex flex-col justify-center items-center'>
                <svg className="rotate-svg" width="118" height="118" viewBox="-14.75 -14.75 147.5 147.5" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle r="49" cx="59" cy="59" fill="transparent" stroke="#e0e0e0" strokeWidth="12" strokeDasharray="307.72px" strokeDashoffset="0"></circle>
                <circle r="49" cx="59" cy="59" stroke="#FD356D" strokeWidth="9" strokeLinecap="round" strokeDashoffset="65px" fill="transparent" strokeDasharray="360px"></circle>
                  <text x="42px" y="70px" fill="#FD356D" fontSize="30px" fontWeight="bold" transform="rotate(90deg) translate(0px, -114px)">99</text>
                 </svg>
                 <p className='text-white text-sm'>Performance</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
                <svg className="rotate-svg" width="118" height="118" viewBox="-14.75 -14.75 147.5 147.5" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle r="49" cx="59" cy="59" fill="transparent" stroke="#e0e0e0" strokeWidth="12" strokeDasharray="307.72px" strokeDashoffset="0"></circle>
                <circle r="49" cx="59" cy="59" stroke="#FD356D" strokeWidth="9" strokeLinecap="round" strokeDashoffset="65px" fill="transparent" strokeDasharray="340.72px"></circle>
                  <text x="42px" y="70px" fill="#FD356D" fontSize="30px" fontWeight="bold" transform="rotate(90deg) translate(0px, -114px)">91</text>
                 </svg>
                 <p className='text-white text-sm'>Accessibility</p>
          </div>
           <div className='flex flex-col justify-center items-center'>
                <svg className="rotate-svg" width="118" height="118" viewBox="-14.75 -14.75 147.5 147.5" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle r="49" cx="59" cy="59" fill="transparent" stroke="#e0e0e0" strokeWidth="12" strokeDasharray="307.72px" strokeDashoffset="0"></circle>
                <circle r="49" cx="59" cy="59" stroke="#FD356D" strokeWidth="9" strokeLinecap="round" strokeDashoffset="65px" fill="transparent" strokeDasharray="350.72px"></circle>
                  <text x="42px" y="70px" fill="#FD356D" fontSize="30px" fontWeight="bold" transform="rotate(90deg) translate(0px, -114px)">96</text>
                 </svg>
                 <p className='text-white text-sm'>Best Practice</p>
          </div>
           <div className='flex flex-col justify-center items-center'>
                <svg className="rotate-svg" width="118" height="118" viewBox="-14.75 -14.75 147.5 147.5" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle r="49" cx="59" cy="59" fill="transparent" stroke="#e0e0e0" strokeWidth="12" strokeDasharray="307.72px" strokeDashoffset="0"></circle>
                <circle r="49" cx="59" cy="59" stroke="#FD356D" strokeWidth="9" strokeLinecap="round" strokeDashoffset="65px" fill="transparent" strokeDasharray="370"></circle>
                  <text x="42px" y="70px" fill="#FD356D" fontSize="28px" fontWeight="bold" transform="rotate(90deg) translate(0px, -114px)">100</text>
                 </svg>
                 <p className='text-white text-sm'>SEO</p>
          </div>
      </div>

                          </div>

        </div>


        <div className='min-h-[65vh]  w-[90%] flex flex-col items-center justify-center text-xl font-medium gap-10 text-white'>
            <p className='italic font-bold md:text-4xl text-2xl text-center '>Transform your thoughts into <span className='text-[#FD356D]'> blogs</span> instantly!</p>
            <button className='italic text-white bg-[#FD356D] px-4 py-2 rounded-full'><Link to={authStatus ? './write' : './login'}>Create your own Blogs!</Link></button>

        </div>
    </div>
  )
}

export default HomePage