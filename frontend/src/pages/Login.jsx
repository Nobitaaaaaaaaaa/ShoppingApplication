import React from 'react'

const Login = () => {

  const [currentState , setCurrentState] = React.useState('Sign Up');

  const onSubmithandler = async (e) => {
    e.preventDefault();
  }
  return (
    <form onSubmit={onSubmithandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700'>

      <div className='inline-flex items-center gap-2 mt-10'>
        <p className='text-3xl' >{currentState === 'Sign Up' ? 'Sign Up' : 'Login'}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : (
        <input type='text' className='w-full p-3 py-2 border border-gray-800' placeholder="Name"  required />
      )}
      <input type='email' className='w-full p-3 py-2 border border-gray-800' placeholder="Email" required />
      <input type='password' className='w-full p-3 py-2 border border-gray-800' placeholder="Password" required />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
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
