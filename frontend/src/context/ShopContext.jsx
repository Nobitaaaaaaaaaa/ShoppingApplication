import {createContext} from 'react'
import {products} from '../assets/assets'
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export const ShopContext = createContext()

const ShopContextProvider =(props) => {
    const currency ='$';
    const delivery_fee = 10;
    const [search , setSearch] = React.useState('');
    const [showSearch , setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    

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
    }

    const getCartAmount = aynce => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo =products.find((product) => product._id === items);
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0){
                        totalAmount += cartData[items][item] * itemInfo.price;
                        
                    }
                } catch (error) {
                    console.error('Error occurred while calculating cart amount:', error);
                }
                
            }
        }
        return totalAmount;
    }


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
    }
    return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
}


export default ShopContextProvider;