import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'Contact'} text2={'Us'} />

      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} className='w-full md:max-w-[450px]' />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl'>Our Store</p>
          <p className='text-gray-600'>54321 Singhania Street <br /> New York, NY 10001</p>
          <p className='text-gray-600'>Tel: (123) 456-7890</p>
          <p className='font-semibold text-xl'>Carrers at Forever</p>
          <p className='text-gray-600'>Learn more about our teams and job openings</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition duration-300'>Explore Jobs</button>
        </div>
      </div>
      <NewsLetterBox />
      
    </div>
  )
}

export default Contact
