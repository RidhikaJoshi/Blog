import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import {logout } from '../../store/authSlice'


function Logoutbtn() {
    const dispatch=useDispatch();

    const logoutHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout());
        })
    }
  return (
    <button className='px-4 py-2 rounded-full cursor-pointer bg-[#FD356D] text-white' onClick={logoutHandler}>Logout</button>
  )
}

export default Logoutbtn