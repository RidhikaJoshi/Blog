import React from 'react'
import { useState,useEffect } from 'react'
import authService from '../appwrite/auth.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice.js'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Login, setLogin] = useState('Login');
  const [loginTest, setLoginTest] = useState('Login as Test User');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>
    {
      window.scrollTo({
        top: 0
      });
    }, []);

  const handleGoogleLogin = async () => {
    authService.loginWithGoogle().then((user) => {
      if (user) {
        dispatch(login({ userData: user }));
        navigate('/');
        toast.success('Loggin Successfull!');
      }
    });
  };


  const loginHandler = async (e) => {
    e.preventDefault();
    setLogin('Logging in...');
    if (email === '' || password === '' || email === undefined || password === undefined) {
      toast.error('Please fill all the fields');
      setEmail('');
      setPassword('');
      setLogin('Login');
      return;

    }
    if (password.length < 8) {
      toast.error('Password should be atleast 8 characters long');
      setPassword('');
      setLogin('Login');
      return;
    }
    authService.login(email, password).then((user) => {
      if (user != undefined) {
        dispatch(login({ userData: user }));

        navigate('/');
        toast.success('Loggin Successfull!');


      }
      else {
        toast.error('Invalid Email or Password');
        setEmail('');
        setPassword('');
        setLogin('Login');
        //console.log('Invalid email or password');
      }
    })
  }
  const loginTestHandler = async () => {
    setLoginTest ('Logging in...');
    const testEmail = "test@test.com";
    const testPassword = "12345678";
    setEmail(testEmail);
    setPassword(testPassword);
    const user = await authService.login(testEmail, testPassword);
    //console.log(user);
    if (!user) {
      toast.error('Internal Server Error');
      setEmail('');
      setPassword('');
      setLogin('Login');
    } else {
      dispatch(login({ userData: user }));
      navigate('/');
    }
  }

  return (
    <div className='w-full min-h-[85vh] flex items-center justify-center'>
      <div className=' w-[80%]  flex items-center justify-center text-xl font-medium'>
        <div className='flex  flex-col justify-evenly shadow-sm shadow-white p-6 rounded-xl gap-4'>
          <label className='text-[#FD356D]'>Email: </label>
          <input type="email" name="email" value={email} className='h-10 italic outline-none p-4' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} required />
          <label className='text-[#FD356D]'>Password: </label>
          <input type="password" name="password" value={password} className='h-10 italic outline-none p-4' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required />
          <button className='text-white italic bg-[#FD356D] px-4 py-2 rounded-full ' type='submit' onClick={loginHandler}>{Login}</button>
          <button className='text-white italic bg-[#FD356D] px-4 py-2 rounded-full ' type='submit' onClick={loginTestHandler}>{loginTest}</button>
          <button className="flex justify-center items-center gap-2 border-2 border-slate-600 px-5 py-2 rounded-lg" onClick={handleGoogleLogin}>
            <FcGoogle size={30} />
            <span className='text-white italic'>Login with Google</span>
          </button>
          <p className=' text-white'>Don&apos;t have an acoount? <Link to='/signup' className='text-[#FD356D]'>SignUp</Link></p>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="dark"
          />
        </div>


      </div>

    </div>
  )
}

export default LoginPage