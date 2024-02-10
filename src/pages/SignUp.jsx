import React from 'react'
import { useState } from 'react'
import authService from '../appwrite/auth.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice.js'
import {Link} from 'react-router-dom'
import { ToastContainer,toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const SignUpHandler = (e) => {
    e.preventDefault();
    if(name===''||email===''||password===''||name===undefined||email===undefined||password===undefined)
    {
      toast.warn('Please fill all the fields')
      return;
    }
    if(password.length<8)
    {
      toast.warn('Password should be atleast 8 characters long')
      setPassword('');
      return;
    }
    if(!email.includes('@')||!email.includes('.'))
    {
      toast.warn('Invalid email');
      setEmail('');
      return;
    }
    authService.createAccount({ name, email, password }).then((user) => {
      //console.log(user);
      if(user!==undefined)
      {
        dispatch(login({ userData: user }));
        navigate('/');
      }
      else
      {
        toast.error('Error Occured while creating account');
        setEmail('');
        setPassword('');
      }
    })
  }

  return (
    <div className='w-full min-h-[85vh] flex items-center justify-center'>
        <div className=' w-[80%]  flex items-center justify-center text-xl font-medium'>
            <div className='flex  flex-col justify-evenly border-2 border-white p-6 rounded-xl gap-4'>
          <label className='text-[#FD356D]'>Name: </label>
          <input type="text" name="name" value={name} className='h-10 italic outline-none p-4' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} required />
          <label className='text-[#FD356D]'>Email: </label>
          <input type="email" name="email" value={email} className='h-10 italic outline-none p-4' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} required />
          <label className='text-[#FD356D]'>Password: </label>
          <input type="password" name="password" value={password} className='h-10 italic outline-none p-4' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required />
          <button className='text-white italic bg-[#FD356D] px-4 py-2 rounded-full ' type='submit' onClick={SignUpHandler}>SignUp</button>
          <p className='text-white'>Already have an acoount? <Link to='/login' className='text-[#FD356D]'>Login</Link></p>
          <ToastContainer 
                style={{
                  position: "top-right",
                  autoClose: 1000,
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

export default SignUp