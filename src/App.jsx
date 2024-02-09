import './App.css'
import config from './config/config.js'
import React,{ useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth.js'
import { login ,logout} from './store/authSlice.js'
import Header from './components/Header.jsx'
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
      return <div className='text-2xl font-bold'>Loading...</div>
    }
    else
    {
        return(
          <div className='font-serif'>
          <Header/>
            <h1>Appwrite Auth</h1>
            <Outlet/>
          <Footer/>
          </div>
        )

    }
  
}

export default App
