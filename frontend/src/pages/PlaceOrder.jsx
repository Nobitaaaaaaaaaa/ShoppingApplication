import React from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContextData.jsx'
import { assets } from '../assets/assets';
import axios from 'axios'
import { toast } from 'react-toastify'


const PlaceOrder = () => {
  const { cartItems,setCartItems,getCartAmount , delivery_fee , products } = useContext(ShopContext)
  const {navigate , backendUrl ,token  } = useContext(ShopContext)

  const [method, setMethod] = React.useState('cod')

  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    state: '',
    city: '',
    zipcode: '',
    country: '',
    phone: ''
  })
  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const initPay=(order, razorpayKey)=>{
    const options={
      key: razorpayKey || import.meta.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      description: 'Order Payment',
      order_id: order.id,
      handler:async(response)=>{
        console.log(response);
        try{
          const {data} = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } });
          if(data.success){
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(data.message || "Payment verification failed");
          }
        }catch(error){
          console.log(error);
          toast.error(error.message);
        }
      }

    }
    const rzp = new window.Razorpay(options); 
    rzp.open();
  }

  

  const onSubmitHandler = async (e) => {
    e.preventDefault();
   
    try{
      let orderItems = [];

      for(const items in cartItems){
        const productInfo = products.find((product) => product._id === items);
        if(!productInfo){
          continue;
        }

        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            const itemInfo = structuredClone(productInfo);
            itemInfo.size = item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo);
          }
        }
      }
        let orderData = {
          address: formData,
          items: orderItems,
          amount: getCartAmount() + delivery_fee,
        }
        if(orderItems.length === 0){
          toast.error('Cart is empty');
          return;
        }
        switch(method){

          //cod
          case 'cod':
            const response = await axios.post(backendUrl + '/api/order/place', orderData, {
              headers:{token}
            });
            if(response.data.success){
              setCartItems({});
              navigate('/orders');
            }
            else{
              toast.error(response.data.message);
            }
            break;

          //stripe
          case 'stripe':
            const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers:{token}});
            if(responseStripe.data.success){
              const {session_url} = responseStripe.data;
              window.location.replace(session_url);
            }else{
              toast.error(responseStripe.data.message);
            }
            break;
          
          case 'razorpay':
            const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers:{token}});
            if(responseRazorpay.data.success){
              initPay(responseRazorpay.data.order, responseRazorpay.data.razorpayKey);
            }
            break;

            default:{
              break;
            }


          }


  }catch(error){
    console.log(error);
    toast.error(error.message);
  }
}

  return (


    <form onSubmit={onSubmitHandler} className='flex flex-col lg:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-120'>

        <div className='text-xl sm:text-2xl'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' type='text' placeholder='First Name' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' /> 
          <input required onChange={onChangeHandler} name='lastName' type='text' placeholder='Last Name' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' /> 
        </div>

          
          <input required onChange={onChangeHandler} name='email' type='email' placeholder='Email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' /> 
          <input required onChange={onChangeHandler} name='street' type='text' placeholder='Street Address' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />

          <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' type='text' placeholder='City' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' /> 
          <input required onChange={onChangeHandler} name='state' type='text' placeholder='State' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' /> 
        </div> 

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' type='number' placeholder='Zip Code' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' /> 
          <input required onChange={onChangeHandler} name='country' type='text' placeholder='Country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' /> 
        </div>

        <input required onChange={onChangeHandler} name='phone' type='number' placeholder='Phone Number' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' /> 
       

      </div>
<div></div>

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
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm cursor-pointer hover:bg-gray-800'>Place Order</button>
          </div>
        </div>

       </div>

      
    </form>
  )
}


export default PlaceOrder
