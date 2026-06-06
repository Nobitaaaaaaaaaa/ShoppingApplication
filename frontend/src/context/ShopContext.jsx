import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ShopContext } from './ShopContextData.jsx'

const ShopContextProvider =(props) => {
    const currency ='$';
    const backendUrl= import.meta.env.VITE_BACKEND_URL
    const delivery_fee = 10;
    const [search , setSearch] = React.useState('');
    const [showSearch , setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [token,setToken] = useState(localStorage.getItem('token') || '')

    const addToCart = async(itemId,size)=>{ 
        let cartData= JSON.parse(JSON.stringify(cartItems));

        if(!size){
            toast.error('Select the Product Size');
            return;
        }
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        toast.success('Product added to cart');

        if(token){
            try{
                await axios.post(backendUrl + "/api/cart/add", {itemId, size}, {
                    headers: {
                        token: token
                    }
                });
            }catch(error){
                console.log(error);
                toast.error(error.message);
            }
        }
    }
    const getCartCount = () => {
    let totalCount = 0;
    for(const items in cartItems){
        for( const item in cartItems[items]){
            try{
                if(cartItems[items][item] > 0){
                    totalCount += cartItems[items][item];
                }
            } catch (error) {
                console.error('Error occurred while calculating cart count:', error);
            }
        }
    }
    return totalCount;
    }

    const updateQuantity=async(itemId,size,quantity)=>{
        let cartData= structuredClone(cartItems);

        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if(token){
            try{
                await axios.post(backendUrl + "/api/cart/update", {itemId, size, quantity}, {
                    headers: {
                        token: token
                    }
                }); 
            }
            catch(error){
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo =products.find((product) => product._id === items);
            if(!itemInfo){
                continue;
            }
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0){
                        totalAmount += cartItems[items][item] * itemInfo.price;
                        
                    }
                } catch (error) {
                    console.error('Error occurred while calculating cart amount:', error);
                }
                
            }
        }
        return totalAmount;
    }
    
    const getProductsData= async()=>{
        try{
            const response = await axios.get(backendUrl + "/api/product/list");
            if(response.data.success){
            setProducts(response.data.products);
            }else
            {
                toast.error(response.data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error('Error occurred while fetching products');
        }
    }

    const getUserCart = async(token)=>{
        try{
            const response = await axios.post(backendUrl + "/api/cart/get", {}, {
                headers: {
                    token: token
                }
            });
            if(response.data.success){
                setCartItems(response.data.cartData);
            }else{
                toast.error(response.data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error('Error occurred while fetching user cart');
        }
    }

    useEffect(()=>{
        getProductsData();
    },[ ])


    useEffect(()=>{
        if(token){
            getUserCart(token);
        }
    },[token])

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token
    }
    return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
}


export default ShopContextProvider;