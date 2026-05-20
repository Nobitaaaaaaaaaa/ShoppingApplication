import React from 'react'
import {assets} from '../assets/assets'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      
      <img src={assets.logo} alt="logo" className='w-16' />

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink className='w-24 border-none h-[1.5px] bg-gray-700'/>
      </ul>
    </div>
  )
}

export default Navbar
