import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setToken }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    
    const onSubmitHandler = async (e) => {
        try{
            e.preventDefault();
            const response = await axios.post(backendUrl + "/api/user/admin", {email: email.trim(), password});
            if(response.data.success){
                setToken(response.data.token);
            }
            else{
                toast.error(response.data.message);
            }
        }
    catch(err){
        toast.error(err.response?.data?.message || "An error occurred while logging in.");
        }
    }
    
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md' >
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>

            <form onSubmit={onSubmitHandler}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your email' className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'/>
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter your password' className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'/>
                </div>
                <button type="submit" className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black'>Login</button>
            </form>

        </div>
      
    </div>
  )
}

export default Login
