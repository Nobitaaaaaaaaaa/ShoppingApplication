import React from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContextData.jsx'
import { assets } from '../assets/assets';

const PlaceOrder = () => {
  const { cartItems } = useContext(ShopContext)
  const {navigate} = useContext(ShopContext)

  const [method, setMethod] = React.useState('cod onClick={()=>set')

  return (


    <div className='flex flex-col lg:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input type='text' placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' /> 
          <input type='text' placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' /> 
        </div>

          
          <input type='email' placeholder='Email' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' /> 
          <input type='text' placeholder='Street Address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />

          <div className='flex gap-3'>
          <input type='text' placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' /> 
          <input type='text' placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' /> 
        </div> 

        <div className='flex gap-3'>
          <input type='number' placeholder='Zip Code' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' /> 
          <input type='text' placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' /> 
        </div>

        <input type='number' placeholder='Phone Number' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' /> 
       

      </div>


      {/* RIght sIDE */}
      <div className='w-full flex flex-col'>
        <div className='mt-8 min-w-80 flex '>
            <CartTotal />
        </div>

        {/* Payement method selection */}
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
              <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}></p>
                <img src={assets.stripe_logo}  />
              </div>

              <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-500' : ''}`}></p>
                <img src={assets.razorpay_logo}  />
              </div>
              <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
                <p className='text-gray-500 text-sm font-medium mx-4 pt-2 py-2'>Cash on Delivery</p>
              </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button onClick={() => navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm cursor-pointer hover:bg-gray-800'>Place Order</button>
          </div>
        </div>

       </div>

      
    </div>
  )
}

export default PlaceOrder
