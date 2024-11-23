import './App.css'
import config from './config/config.js'
import React,{ useEffect, useState,Suspense } from 'react'
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


    if (loading == true) {
      return <div className='text-3xl font-bold bg-black text-[#FD356D] w-full h-[100vh] flex items-center justify-center'>Loading...</div>;
    } else {
      return (
        <div className='font-serif italic bg-black min-h-[100vh] w-full'>
          
          <Header />
          <Suspense fallback={<div className='text-3xl font-bold bg-black text-[#FD356D] w-full h-[100vh] flex items-center justify-center'>Loading...</div>}>
            <Outlet />
          </Suspense>
          <Footer />
        </div>
      );
    }
  
}

export default App
