import React from 'react'
import hamburger from '../../assets/hamburger.png'
import Logoutbtn from './Logoutbtn'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import  {useNavigate} from 'react-router-dom'
import {useState} from 'react'

function Header() {

    const [showNav,setShowNav]=useState(false);
    const authStatus=useSelector((state)=>state.auth.status);
    console.log(`${authStatus} ReloadHeader`);
    const navigate=useNavigate();



    const navItems =[
      {
        name:"Home",
        slug:'/',
        active:true
      },
      {
        name:"Blogs", // this is for all posts showing
        slug:'/blogs',
        active:true
      },
      {
        name:"Write", // this is to add blogs depending on login status
        slug:'/write',
        active:authStatus
      },
      {
        name:"Login",
        slug:'/login',
        active:!authStatus,
      },
      {
        name:"SignUp",
        slug:'/signup',
        active:!authStatus,
      }
    ];

  return (
    <>
   <div className='transparent border-b-[0.5px] border-white text-white  w-full h-[5vh] flex flex-row items-center justify-between p-8 shadow sticky top-0 z-5 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20'>
        {/* This div contains logo */}
      <div className='text-[#FD356D] italic text-xl cursor-pointer'><Link to='/'>BlogSphere</Link></div>

    {/* This div contains list of navigation options */}
      
        <ul className='md:flex md:flex-row md:gap-6 md:text-lg md:items-center hidden'>
          {navItems.map((item, index) => {
            if (item.active)
              return (
                <li
                  className={`cursor-pointer ${item.name === "Login" || item.name === "SignUp" ? 'bg-[#FD356D] px-4 py-2 rounded-full' : 'hover:text-[#FD356D]'} `}
                  onClick={() => navigate(item.slug)}
                  key={index}
                >
                 {item.name}
                </li>
              );
          })}
          {authStatus && (<li><Logoutbtn/></li>)}
        </ul>


      {/* This div is for the hamburger menu */}
        <div className='md:hidden flex items-center'>
          
          <img className='h-10' src={hamburger} alt="Hamburger" onClick={() => setShowNav(!showNav)} height='' width=''/>
          

        </div>
    
   </div>
   {showNav && (
            <div className=' min-h-52 w-full  float-right flex items-center justify-center md:hidden shadow sticky top-[10vh] z-5 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20'>
            <ul className='flex flex-col gap-4 items-center justify-center text-white'>
              {navItems.map((item, index) => {
                if (item.active) {
                  return (
                    <li
                      className={`cursor-pointer ${item.name === "Login" || item.name === "SignUp" ? 'bg-[#FD356D] px-4 py-2 rounded-full' : 'hover:text-[#FD356D]'} `}
                      onClick={() => navigate(item.slug)}
                      key={index}
                    >
                      {item.name}
                    </li>
                  );
                }
              })}
               {authStatus && (<li><Logoutbtn/></li>)}
            </ul>
            </div>
          )}

   </>
  )
}

export default Header