import './App.css'
import config from './config/config.js'
import React,{ useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth.js'
import { login ,logout} from './store/authSlice.js'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer.jsx'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading,setLoading]=useState(true);
  const dispatch = useDispatch();

  useEffect(() => { 
      authService.getCurrentUser().then((user) => {
        if (user) {
          dispatch(login({ userData: user }));
        }else{
          dispatch(logout());
        }
        setLoading(false);
      });
    }, []);


    if(loading==true)
    {
      return (
      <div className='text-3xl font-bold bg-black text-[#FD356D] w-full h-[100vh] flex items-center justify-center'><div class="flex flex-row gap-2">
            <div class="w-4 h-4 rounded-full bg-customPink animate-bounce"></div>
            <div class="w-4 h-4 rounded-full bg-customPink animate-bounce [animation-delay:-.1s]"></div>
            <div class="w-4 h-4 rounded-full bg-customPink animate-bounce [animation-delay:-.2s]"></div>
        </div></div>
      )
    }
    else
    {
        return(
          <div className='font-serif italic bg-black min-h-[100vh] w-full'>
          <Header/>
            {/* <h1>Appwrite Auth</h1> */}
            <Outlet/>
          <Footer/>
          </div>
        )

    }
  
}

export default App
