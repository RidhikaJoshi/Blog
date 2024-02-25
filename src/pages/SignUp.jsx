import React from 'react'
import { useState } from 'react'
import authService from '../appwrite/auth.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice.js'
import {Link} from 'react-router-dom'
import { ToastContainer,toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";


function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [SignUp, setSignUp] = useState('Create Account');

    const handleGoogleSignUp = async () => {
        authService.loginWithGoogle().then((user) => {
          if (user) {
            dispatch(login({ userData: user }));
            navigate('/');
            toast.success('Loggin Successfull!');
          }
        });
      };

  const SignUpHandler = async (e) => {
    e.preventDefault();
    setSignUp('Creating Account...');
    if(name===''||email===''||password===''||name===undefined||email===undefined||password===undefined)
    {
      toast.warn('Please fill all the fields')
      setEmail('');
      setPassword('');
      setSignUp('Create Account');
      return;
    }
    if(password.length<8)
    {
      toast.warn('Password should be atleast 8 characters long')
      setPassword('');
      setSignUp('Create Account');
      return;
    }
    if(!email.includes('@')||!email.includes('.'))
    {
      toast.warn('Invalid email');
      setEmail('');
      setPassword('');
      setSignUp('Create Account');
      return;
    }
    const user=await authService.createAccount({ name, email, password })
      console.log(user);
      if(user!==undefined)
      {
        toast.success('Account Created Successfully');
        dispatch(login({ userData: user }));
        navigate('/');
      }
      else
      {
        toast.error('Error Occured while creating account');
        setEmail('');
        setPassword('');
        setSignUp('Create Account');
      }
  
  }

  return (
    <div className='w-full min-h-[100vh] flex items-center justify-center'>
        <div className=' w-[80%]  flex items-center justify-center text-xl font-medium'>
            <div className='flex  flex-col justify-evenly shadow-sm shadow-white p-6 rounded-xl gap-4'>
          <label className='text-[#FD356D]'>Name: </label>
          <input type="text" name="name" value={name} className='h-10 italic outline-none p-4' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} required />
          <label className='text-[#FD356D]'>Email: </label>
          <input type="email" name="email" value={email} className='h-10 italic outline-none p-4' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} required />
          <label className='text-[#FD356D]'>Password: </label>
          <input type="password" name="password" value={password} className='h-10 italic outline-none p-4' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required />
          <button className='text-white italic bg-[#FD356D] px-4 py-2 rounded-full ' type='submit' onClick={SignUpHandler}>{SignUp}</button>

           <button className="flex justify-center items-center gap-2 border-2 border-slate-600 px-5 py-2 rounded-lg"  onClick={ handleGoogleSignUp  }>
                    <FcGoogle size={30} />
                    <span className='text-white italic'>SignUp with Google</span>
                </button>
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