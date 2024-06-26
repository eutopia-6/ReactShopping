import React from 'react'
import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i < 25; i++){
        cart[i] = 0;
    }
    return cart;
};

const getDefaultFavorite = () => {
    let cart = {};
    for (let i = 1; i < 25; i++){
        cart[i] = 0;
    }
    return cart;
};

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [favoriteItems, setFavoriteItems] = useState(getDefaultFavorite());
    const [productList, SetProductList] = useState([]);

    const GetProducts = async () => {
        const temp = await fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())

        SetProductList(temp)
    }

    useEffect(() => {
        GetProducts();
    }, [])

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0){
                let itemInfo = productList.find((product) => product.id === Number(item));
                totalAmount += cartItems[item] * itemInfo.price;
            }
        }
        return totalAmount;

    }

    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
    };

    const updateCartItemCount = (newAmount, itemId) => {
        setCartItems((prev) => ({...prev, [itemId] : newAmount}));
    }

    const addToFavorites = (itemId) => {
        setFavoriteItems((prev) => (
            {...prev, 
            [itemId] : prev[itemId] === 1 ? prev[itemId] - 1 : prev[itemId] + 1}))}

    const clearCart = () => {
        setCartItems(getDefaultCart());
    }
    

    const contextValue = {
        cartItems, 
        addToCart, 
        removeFromCart,
        updateCartItemCount,
        getTotalCartAmount,
        productList,
        addToFavorites,
        favoriteItems,
        clearCart

    };

  return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
    );
};
