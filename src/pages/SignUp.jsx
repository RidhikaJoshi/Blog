import React from 'react'
import {useState} from 'react'
import authService from '../appwrite/auth.js'
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice.js'


function SignUp() {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const SignUpHandler=(e)=>{
      e.preventDefault();
        authService.createAccount({name,email,password}).then((user)=>{
          console.log(user);
          dispatch(login({userData:user}));
          navigate('/');
        })
    }

  return (
    <div className='w-full min-h-[85vh] flex items-center justify-center'>
        <div className=' w-[80%] flex items-center justify-center text-xl font-medium'>
            <div className='flex flex-col justify-evenly gap-4 border-2 border-white p-8 rounded-xl'>
                <label className='text-[#FD356D]'>Name: </label>
                  <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} required/>
                <label  className='text-[#FD356D]'>Email: </label>
                  <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <label  className='text-[#FD356D]'>Password: </label>
                  <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                <button  className='text-[#FD356D] border-2 border-[#FD356D]' type='submit' onClick={SignUpHandler}>SignUp</button>
            </div>

        </div>

    </div>
  )
}

export default SignUp