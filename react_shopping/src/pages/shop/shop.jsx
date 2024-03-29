import React, { useContext, useState, useEffect } from 'react';
import { Product } from "./product";
import "./shop.css";

export const Shop = () => {
  const [productList, SetProductList] = useState([]);

    const GetProducts = async () => {
        const temp = await fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())

        SetProductList(temp)
        
    }

    useEffect(() => {
        GetProducts();
    }, [])

  return (
    <div className="shop">
        <div className="shopTitle">
            <h1>The Fake Ecommerce Site</h1>
        </div>
        <div className="products">
            {productList.map((product) => (
              <Product data={product} key={product.id}/>
            ))}
        </div>
    </div>
  )
}