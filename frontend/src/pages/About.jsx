import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/NewsletterBox'
const About = () => {
  return (
    <div>

    <div className='text-2xl text-center pt-8 border-t'>
      <Title text1={'About'} text2={'Us'} />
    </div>
    
    <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img src={assets.about_img}  className='w-full md:max-w-[450px]' />

      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-700 '>
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, nostrum repellendus! Eveniet, corrupti voluptas magnam porro doloribus rerum laborum neque, laudantium nostrum culpa consequuntur fuga quam necessitatibus odio sequi sed?</p>
        <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, nostrum repellendus! Eveniet, corrupti voluptas magnam porro doloribus rerum laborum neque, laudantium nostrum culpa consequuntur fuga quam necessitatibus odio sequi sed?</p>
        <b className='text-gray-800'>Our Misison</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, nostrum repellendus! Eveniet, corrupti voluptas magnam porro doloribus rerum laborum neque, laudantium nostrum culpa consequuntur fuga quam necessitatibus odio sequi sed?</p>

      </div>
    </div>

    <div className='text-xl py-4'>
      <Title text1={'Why'} text2={'Choose Us?'} />
    </div>

    <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-20 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, nostrum repellendus! Eveniet, corrupti voluptas magnam porro doloribus rerum laborum neque, laudantium nostrum culpa consequuntur fuga quam necessitatibus odio sequi sed?</p>

      </div>
        <div className='border px-20 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convinience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, nostrum repellendus! Eveniet, corrupti voluptas magnam porro doloribus rerum laborum neque, laudantium nostrum culpa consequuntur fuga quam necessitatibus odio sequi sed?</p>

      </div>
        <div className='border px-20 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, nostrum repellendus! Eveniet, corrupti voluptas magnam porro doloribus rerum laborum neque, laudantium nostrum culpa consequuntur fuga quam necessitatibus odio sequi sed?</p>

      </div>
    </div>

    <Newsletter />

      
    </div>
  )
}

export default About
