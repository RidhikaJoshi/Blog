import React from 'react'
import {useState} from 'react'
import authService from '../appwrite/auth.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice.js'
import { Link } from 'react-router-dom'
import { ToastContainer, toast,Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const dispatch=useDispatch();
    const navigate=useNavigate();


    const loginHandler=async (e)=>{
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
            toast.success('Logged in successfully');
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
        <div className=' w-[80%]  flex items-center justify-center text-xl font-medium'>
            <div className='flex  flex-col justify-evenly border-2 border-white p-8 rounded-xl gap-6'>
                <label className='text-[#FD356D]'>Email: </label>
                  <input type="email" name="email" value={email} className='h-10 italic outline-none p-4' placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} required/>
                <label className='text-[#FD356D]'>Password: </label>
                  <input type="password" name="password" value={password} className='h-10 italic outline-none p-4' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)} required />
                <button className='text-white italic bg-[#FD356D] px-4 py-2 rounded-full ' type='submit' onClick={loginHandler}>Login</button>
                <p className=' text-white'>Don&apos;t have an acoount? <Link to='/signup' className='text-[#FD356D]'>SignUp</Link></p>
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