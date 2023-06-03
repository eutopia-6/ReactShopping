import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../../context/shop-context';
import { CartItem } from "./cart-item"
import { Shop } from '../shop/shop';
import "./cart.css";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { cartItems } = useContext(ShopContext);
  const [productList, SetProductList] = useState([]);

  const GetProducts = async () => {
    const temp = await fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    console.log(temp);

    SetProductList(temp)
  }

  useEffect(() => {
    GetProducts();
  }, [])

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cartItems">
        {productList.map((product) => {
          console.log(cartItems[product.id])
          if (cartItems[product.id] > 0){
            return <CartItem data={product}/>;
          }
        })}
      </div>
      <div className="checkout">
        <p> Subtotal $</p>
        <Link to="/">
          <button>Continue Shopping</button>
        </Link>
        <button > Checkout </button>
      </div>
    </div>
  )
}
  