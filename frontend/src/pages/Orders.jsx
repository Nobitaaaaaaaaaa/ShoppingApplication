import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContextData.jsx'
import Title from '../components/Title'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'


const Orders = () => {

  const {backendUrl , token , currency}= useContext(ShopContext)
  const [orderData, setOrderData] = useState([])

  const loadOrderData = async()=>{
    try{
      if(!token){
        return null
      }

      const response = await axios.get(backendUrl + "/api/order/userorders", {headers: {token}})
      if(response.data.success){
        let allOrdersItem=[]
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          })
        })

        setOrderData(allOrdersItem.reverse());
      } else {
        toast.error(response.data.message)
      }

    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
  
  }

  useEffect(()=>{
    loadOrderData();
  },[token])

  return (
    <div className= 'border-t pt-16'>
      
      <div className='text-2xl'>
        <Title text1={'My'} text2={'Orders'} />

      </div>

      <div>
        {
          orderData.map((item, index) => {
            if(!item){
              return null;
            }

            return (
            <div key={index} className='py-4 border-t  border-b text-gray-700 flex flex-col md:flex-row md:items-center gap-6 justify-between'>
              
              <img className='w-16 sm:w-20' src={item.image?.[0]} alt={item.name} />
              
              <div className='flex-1'>
                <p className='font-medium sm:text-base'>{item.name}</p>
                <div className='flex items-center gap-3 mt-2 text-sm text-gray-700'>
                  <p className='text-lg'>{currency}{item.price * item.quantity}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='mt-2 text-sm'>Date <span className='text-gray-400'> {new Date(item.date).toDateString()} </span></p>
                <p className='mt-2 text-sm'>Payment: <span className='text-gray-400'> {item.paymentMethod} </span></p>
              </div>

              <div className='flex items-center gap-2'>
                <p className='w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>{item.status } </p>
              </div>
              <button className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
            </div>
            )
          })

        }
      </div>
      
    </div>
  )
}

export default Orders
