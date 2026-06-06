import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContextData.jsx'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts.jsx'


const Product = () => {

  const {id} = useParams();
  const {products ,currency , addToCart} = useContext(ShopContext);
  const [productData , setProductData] = useState(null);
  const [image,setImage] = useState('');
  const [size, setSize] = useState('');


  const fetchProductData = async() => {
    products.map((item) => {
      if(item._id === id) {
        setProductData(item);
        setImage(item.image[0]);
      }
      return null;
    })
  }

  useEffect(() => {
    fetchProductData();
  },[id,products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* Product data */}
      <div className='flex flex-col gap-12 sm:gap-12 sm:flex-row'>
        {/* Product Image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index) => (
                <img src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' onMouseEnter={() => setImage(item)} />
              ))
            }
          </div>
          <div className='flex-1'>
            <img src={image} alt="product" className='w-full h-auto' />
          </div>
        </div>

        {/* Product Details */}
        <div className='flex-1'>
          <h1 className='font-bold text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-2 mt-2'>
            <img src={assets.star_icon} className='w-5'/>
            <img src={assets.star_icon} className='w-5'/>
            <img src={assets.star_icon} className='w-5'/>
            <img src={assets.star_icon} className='w-5'/>
            <img src={assets.star_dull_icon} className='w-5'/>
            <p className='pl-2'>122 Reviews</p>
          </div>
          <p className='mt-5 text-3xl font-bold'>${productData.price}</p>
          <p className='mt-5 text-gray-700 md:w-4/5'>{productData.description}</p>

          <div className='flex flex-col gap-4 my-8'>
            <div className='flex gap-2'>
              <label className='text-lg font-semibold'>Select Size:</label>
              <select onChange={(e) => setSize(e.target.value)} className='border-2 px-3 py-2'>
                <option value=''>Choose a Size</option>
                {productData.sizes.map((size,index) => (
                  <option key={index} value={size}>{size}</option>
                ))}
              </select>
            </div>
            <button onClick={()=> addToCart(productData._id , size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 rounded'>ADD TO CART</button>
          </div>

          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-700 mt-5 flex flex-col gap-1'>
            <p>✓ 100% Original product.</p>
            <p>✓ Cash on delivery is available on this product.</p>
            <p>✓ Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

        {/* Description and Review Section */}
        <div className='mt-20'>
          <div className='flex'>
            <b className='border px-5 py-3 text-sm'>Description</b>
            <p className = 'border px-5 py-3 text-sm'>Reviews(122)</p>
            
          </div>
          <div className='flex flex-col gap-4 border px-6 p-6 text-sm text-gray-700'>
            <p>{productData.description}</p>
          </div>
        </div>

        {/* Display related products */}

        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

      


    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
