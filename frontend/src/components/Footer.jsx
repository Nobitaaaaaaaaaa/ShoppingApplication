import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            <div>
                <img src={assets.logo} className='mb-5 w-32'/>
                <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, vel quis. Quia ex earum itaque ab assumenda. Repellendus iste, minus ducimus vero dicta odit magnam placeat nihil eaque, modi dolores.</p>
            </div>    

            <div>
                <p className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li className='cursor-pointer hover:text-gray-800 transition'>About Us</li>
                    <li className='cursor-pointer hover:text-gray-800 transition'>Contact Us</li>
                    <li className='cursor-pointer hover:text-gray-800 transition'>Privacy Policy</li>
                    <li className='cursor-pointer hover:text-gray-800 transition'>Terms of Service</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li className='cursor-pointer hover:text-gray-800 transition'>Email: contact@forever.com</li>
                    <li className='cursor-pointer hover:text-gray-800 transition'>Phone: +1 (123) 456-7890</li>
                    <li className='cursor-pointer hover:text-gray-800 transition'>Address: 123 Main St, City, State 12345</li>
                </ul>
            </div>
            
        </div>


        <div>

            <hr/>
            <p className='py-5 text-sm text-center'> Copyright &copy; 2024 Forever. All rights reserved.</p>
        
        </div> 
    </div>
  )
}

export default Footer
