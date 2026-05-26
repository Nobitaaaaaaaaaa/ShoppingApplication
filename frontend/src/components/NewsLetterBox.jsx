 import React from 'react'
 
 const NewsLetterBox = () => {
    const onSubmitHandler=(e)=>{
        e.preventDefault();
    }
   
   return (
     <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now and get 20% off your first order!</p>

        <p className='text-gray-400 mt-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur molestias minima asperiores placeat at soluta iure minus aut modi rem vitae quo voluptatem mollitia, eius ipsam ab praesentium eligendi.</p>

        <form  onSubmit={onSubmitHandler}className='w-full  sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
          <input type='email' placeholder='Enteryour Email' className='w-full sm:flwx-1 outline-none '>
          </input>

          <button type='submit' className='bg-black text-white text-xs px-10 py-4'>
            Subscribe
          </button>
        </form>
     </div>
   )
 }
 
 export default NewsLetterBox
 