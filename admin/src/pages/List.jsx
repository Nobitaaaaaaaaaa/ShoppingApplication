import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl , currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {  
  

  const [list,setList] = useState([]);

  const fetchList = async() => {
    try{
      const response = await axios.get(backendUrl + "/api/product/list");
      console.log(response.data);
      const products = Array.isArray(response.data)
        ? response.data
        : response.data.products;

      if(response.data.success || Array.isArray(response.data)){
        setList(products || []);
      }
      else{
        toast.error(response.data.message || "Error fetching product list");
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
      toast.error(error.response?.data?.message || "Error fetching product list");
    }

  }

  const removeProduct = async (id) => {
    try{
      const response = await axios.post(backendUrl + "/api/product/remove", {id}, {headers: {token}});
      if(response.data.success){
        toast.success(response.data.message);
        await fetchList();
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error(error.response?.data?.message || "Error removing product");
    }
  }

  useEffect(() => {
    fetchList();
  }, []);



  return (
    <>
      <p className='mb-2'>All Products list</p>
      <div className='flex flex-col gap-2'>
        {/* List Table Title */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Category</b>
          <b className='text-center'>Actions</b>
        </div>


        {/* {Product List } */}

        {list.map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'>
            <img src={item.image[0]} className='text-right md:text-denter cursor-pointer text-lg'/>
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price.toFixed(2)}</p>
            <p onClick={()=>removeProduct(item._id)} className='text-red-500 hover:text-red-700 cursor-pointer'>X</p>
          </div>
        ))}

      </div>
    </>
  )
}

export default List
