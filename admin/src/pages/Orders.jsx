import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl, currency } from '../App'
import { assets } from '../assets/assets'



const Orders = ({token}) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async()=>{

    if(!token){
      return null
    }
    try{
      const response = await axios.post(backendUrl + "/api/order/list",{}, {headers: {token}})
      if(response.data.success){
        setOrders(response.data.orders);
        
      }else{
        toast.error(response.data.message);
      }
    }
    catch(error){
      console.log(error);
      toast.error(error.message);
    }

  }

  useEffect(()=>{
    fetchAllOrders();
  },[token])

  const statusHandler = async (event, orderId) => {
    try{
      const response = await axios.post(backendUrl + "/api/order/status", { orderId, status: event.target.value }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAllOrders();
      }
    }
    catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }



  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray' key={index}>
              <img className='w-10' src={assets.parcel_icon} />
              <div>
                {order.items.map((item, index) => {
                  if(index === order.items.length-1){
                    return <p className='py-0.5' key={index}>{item.name} * {item.quantity} <span>{item.size}</span></p>
                  }
                  else{
                    return <p  className='py-0.5' key={index}>{item.name} * {item.quantity} <span>{item.size}</span>,</p>

                  }
                })}
                <p className='font-medium mt-3 mb-2 '>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street}, {order.address.city}, {order.address.state} {order.address.zip}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className='text-sm  sm:text-[15px]'>Items : {order.items.length}</p>
                <p className='mt-3'>Method: {order.paymentMethod}</p>
                <p className='mt-3'>Payment:{order.payment ? 'Paid' : 'Not Paid'}</p>
                <p className='mt-3'>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{currency} {order.amount.toFixed(2)}</p>
              <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className='p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
    
  )
}

export default Orders
