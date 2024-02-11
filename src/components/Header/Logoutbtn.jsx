import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import {logout } from '../../store/authSlice'
import { ToastContainer,toast,Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'


function Logoutbtn() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const logoutHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout());
            navigate('/');
            toast.success('Logged out successfully');
        })
    }
  return (
    <>
    <button className='px-4 py-2 rounded-full cursor-pointer bg-[#FD356D] text-white' onClick={logoutHandler}>Logout</button>
    <ToastContainer 
                style={{
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  newestOnTop: false,
                  closeOnClick: true,
                  rtl: false,
                  pauseOnFocusLoss: true,
                  draggable: true,
                  pauseOnHover: true,
                  theme: "dark",
                  transition: Bounce,
                }}
              />
              </>
  )
}

export default Logoutbtn