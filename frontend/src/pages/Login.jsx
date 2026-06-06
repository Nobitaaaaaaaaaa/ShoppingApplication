import React, { useContext, useState ,useEffect} from 'react'
import axios from 'axios'
import {ShopContext} from '../context/ShopContextData.jsx'
import { toast } from 'react-toastify'


const Login = () => {
  const {setToken, navigate, backendUrl, token} = useContext(ShopContext);
  const [currentState , setCurrentState] = useState('Login');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const onSubmithandler = async (e) => {
    e.preventDefault();
    try{
      if(currentState === 'Sign Up'){

        const response = await axios.post(backendUrl + "/api/user/register",{name,email,password});
          if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem('token',response.data.token);
          }
          else{
            toast.error(response.data.message);
          }
        
      }else{
        const response = await axios.post(backendUrl + "/api/user/login",{email,password});
        console.log(response.data);
          if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem('token',response.data.token);
          }
          else{
            toast.error(response.data.message);
          }

      }
        

    }catch(error){
      
      toast.error(error.response?.data?.message || 'An error occurred');
      

    }
  }

  useEffect(()=>{
    if(token){
      navigate('/');
    }

  },[token])

  return (
    <form onSubmit={onSubmithandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700'>

      <div className='inline-flex items-center gap-2 mt-10'>
        <p className='text-3xl' >{currentState === 'Sign Up' ? 'Sign Up' : 'Login'}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : (
        <input onChange={(e) => setName(e.target.value)} value={name} type='text' className='w-full p-3 py-2 border border-gray-800' placeholder="Name"  required />
      )}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' className='w-full p-3 py-2 border border-gray-800' placeholder="Email" required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' className='w-full p-3 py-2 border border-gray-800' placeholder="Password" required />

      <div className='w-full flex justify-between text-sm -mt-2'>
        <p className='cursor-pointer hover:text-black'>Forgot Password</p>
        {
          currentState === 'Login' ?
          <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer hover:text-black'>Create Account</p> :
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer hover:text-black'>Login</p>
        }
      </div>
      <button className='w-full bg-gray-800 text-white py-3 rounded-sm'>{currentState === 'Sign Up' ? 'Create Account' : 'Login'}</button>
    </form>
  )
}

export default Login
