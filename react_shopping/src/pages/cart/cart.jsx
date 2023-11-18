import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../../context/shop-context';
import { CartItem } from "./cart-item"
import { Shop } from '../shop/shop';
import "./cart.css";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { cartItems, getTotalCartAmount, productList } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cartItems">
        {productList.map((product) => {
          if (cartItems[product.id] > 0){
            return <CartItem data={product}/>;
          }
        })}
      </div>
        { (() => {
          if(totalAmount > 0){
            return (<div className="checkout">
              <p> Subtotal: ${(totalAmount).toFixed(2)}</p>
              <Link to="/">
                <button>Continue Shopping</button>
              </Link>
              <Link to="/checkout">
                <button>Checkout</button>
              </Link>
            </div>)
          }
          else{
            return (<b>Your Cart is Currently Empty</b>)
          }
        })()
        }
    </div>
  )
}
  
