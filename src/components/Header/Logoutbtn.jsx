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
          toast.success('Logged out successfully');
          dispatch(logout());
          navigate('/');
        })
    }
  return (
    <>
    <button className='px-4 py-2 rounded-full cursor-pointer bg-[#FD356D] text-white' onClick={logoutHandler}>Logout</button>
    <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
              </>
  )
}

export default Logoutbtn