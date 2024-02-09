import React from 'react'
import { useState } from 'react'
import authService from '../appwrite/auth.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice.js'
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
      <div className=' w-[80%] flex items-center justify-center text-xl font-medium'>
        <div className='flex flex-col justify-evenly gap-4 border-2 border-white p-8 rounded-xl'>
          <label className='text-[#FD356D]'>Name: </label>
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
          <label className='text-[#FD356D]'>Email: </label>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label className='text-[#FD356D]'>Password: </label>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className='text-[#FD356D] border-2 border-[#FD356D]' type='submit' onClick={SignUpHandler}>SignUp</button>
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