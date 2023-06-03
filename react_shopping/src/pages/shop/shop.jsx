import React from 'react';
import { PRODUCTS } from "../../products";
import { useState, useEffect } from 'react';
import { Product } from "./product";
import "./shop.css";
import { Cart } from '../cart/cart';

export const Shop = () => {
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
    <div className="shop">
        <div className="shopTitle">
            <h1>Shop</h1>
        </div>
        <div className="products">
            {productList.map((product) => (
              <Product data={product}/>
            ))}
        </div>
    </div>
  )
}