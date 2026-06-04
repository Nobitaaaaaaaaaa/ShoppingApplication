import React from 'react'
import { NavLink } from 'react-router-dom'
import {assets} from '../assets/assets'    


const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2' >
        <div className='flex flex-col gap-5 pt-6 pl-[20%] text-[15px]'>

            <NavLink className='flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-l' to="/add">
                <img src={assets.add_icon} className='w-6 h-5'/>
                <p className=' hidden md:block'>Add Items</p>
            </NavLink>
            <NavLink className='flex items-center gap-3 border border-gray-300  px-3 py-2 rounded-l' to="/list">
                <img src={assets.order_icon} className='w-6 h-5'/>
                <p className=' hidden md:block'>List Items</p>
            </NavLink>
            <NavLink className='flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-l' to="/orders">
                <img src={assets.order_icon} className='w-6 h-5'/>
                <p className=' hidden  md:block'>Orders</p>
            </NavLink>
            

        </div>
      
    </div>
  )
}

export default Sidebar
