import React from 'react'
import {assets} from '../assets/assets'
import {useState} from 'react'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {


  const [image1 , setImage1] =useState(false);
  const [image2 , setImage2] =useState(false);
  const [image3 , setImage3] =useState(false);
  const [image4 , setImage4] =useState(false); 

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async(e) => {
    e.preventDefault();

    try{
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));
      if(image1) formData.append('image1', image1);
      if(image2) formData.append('image2', image2);
      if(image3) formData.append('image3', image3);
      if(image4) formData.append('image4', image4);
      

      const response = await axios.post(backendUrl + "/api/product/add", formData,{headers: {token}});
console.log(response.data);
      if(response.data.success){
        {
          toast.success("Product added successfully");
          setName('');
          setDescription('');
          setPrice('');
          setImage1(false);
          setImage2(false);
          setImage3(false);
          setImage4(false);
        }
      }else{
        toast.error(response.data.message );
      }

    }catch(err){
      console.log(err);
      toast.error("Error adding product");

    }
  }

  

  return (
    
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}/>
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" className='hidden'/>
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}/>
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" className='hidden'/>
          </label>
          <label  htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}/>
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" className='hidden'/>
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}/>
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" className='hidden'/>
          </label>
        </div>
      </div>

      <div className='w-full' style={{ maxWidth: '500px' }}>
        <p className='w-full'>Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full px-3 py-2' placeholder='Type Here' required/>
      </div>
      <div className='w-full' style={{ maxWidth: '500px' }}>
        <p className='w-full'>Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full px-3 py-2' placeholder='Type Here' required/>
      </div>
      <div className='flex flex-colsm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2' required>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
        
          </select>
        </div>
        <div>
          <p className='mb-2'>Sub Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2' required>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
        
          </select>
        </div>

        <div>
            <p className='mb-2'>Product Price</p>
            <input onChange={(e) => setPrice(e.target.value)} value={price} type='number' className='w-full px-3 py-2' placeholder='Type Here' required/>
        </div>
      </div>


      <div>
        <p>Product Sizes</p>
        <div className='flex gap-2 mt-2'>
          <div onClick={() => setSizes((prev) => prev.includes("S") ? prev.filter((size) => size !== "S") : [...prev, "S"])} className={`${sizes.includes("S") ? "bg-black text-white" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
            <p className={`${sizes.includes("S") ? "bg-black text-white" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
          </div>
          <div onClick={() => setSizes((prev) => prev.includes("M") ? prev.filter((size) => size !== "M") : [...prev, "M"])} className={`${sizes.includes("M") ? "bg-black text-white" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
            <p className={`${sizes.includes("M") ? "bg-black text-white" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
          </div>
          <div onClick={() => setSizes((prev) => prev.includes("L") ? prev.filter((size) => size !== "L") : [...prev, "L"])} className={`${sizes.includes("L") ? "bg-black text-white" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
            <p className={`${sizes.includes("L") ? "bg-black text-white" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
          </div>
          <div onClick={() => setSizes((prev) => prev.includes("XL") ? prev.filter((size) => size !== "XL") : [...prev, "XL"])} className={`${sizes.includes("XL") ? "bg-black text-white" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
            <p className={`${sizes.includes("XL") ? "bg-black text-white" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
          </div>
          <div onClick={() => setSizes((prev) => prev.includes("XXL") ? prev.filter((size) => size !== "XXL") : [...prev, "XXL"])} className={`${sizes.includes("XXL") ? "bg-black text-white" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
            <p className={`${sizes.includes("XXL") ? "bg-black text-white" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>

        <div className='flex gap-2 mt-2'>
          <input  onChange={(e) => setBestseller(prev =>!prev)} checked={bestseller} type="checkbox" id="bestseller" />
          <label className='cursor-pointer' htmlFor="bestseller">Add to bestsellers</label>
        </div>
      </div>

      <button type="submit" className='bg-black text-white px-4 py-4 cursor-pointer'>ADD PRODUCT</button>


    </form>
  )
}

export default Add
