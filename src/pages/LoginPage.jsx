import React from 'react'
import {useState} from 'react'
import authService from '../appwrite/auth.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice.js'
import { ToastContainer, toast,Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const dispatch=useDispatch();
    const navigate=useNavigate();


    const loginHandler=(e)=>{
        e.preventDefault();
        if(email===''||password===''||email===undefined||password===undefined)
        {
          toast.warn('Please fill all the fields')
          //console.log('Please fill all the fields');
          return;
        }
        if(password.length<8)
        {
          toast.warn('Password should be atleast 8 characters long')
          //console.log('Password should be atleast 8 characters long');
          setPassword('');
          return;
        }
        authService.login(email,password).then((user)=>{
          if(user!=undefined)
          {
            dispatch(login({userData:user}));
            navigate('/');
          }
          else
          {
            toast.error('Invalid email or password');
            setEmail('');
            setPassword('');
            //console.log('Invalid email or password');
          }
        }) 
    }

  return (
    <div className='w-full min-h-[85vh] flex items-center justify-center'>
        <div className=' w-[80%] flex items-center justify-center text-xl font-medium'>
            <div className='flex flex-col justify-evenly gap-4 border-2 border-white p-8 rounded-xl'>
                <label className='text-[#FD356D]'>Email: </label>
                  <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <label className='text-[#FD356D]'>Password: </label>
                  <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                <button className='text-[#FD356D] ' type='submit' onClick={loginHandler}>Login</button>
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
            </div>
         

        </div>

    </div>
  )
}

export default LoginPage