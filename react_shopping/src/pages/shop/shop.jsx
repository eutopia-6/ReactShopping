import React, { useContext } from 'react';
import { Product } from "./product";
import "./shop.css";
import { ShopContext } from '../../context/shop-context';


export const Shop = () => {
  const {productList} = useContext(ShopContext);

  return (
    <div className="shop">
        <div className="shopTitle">
            <h1>Shop</h1>
        </div>
        <div className="products">
            {productList.map((product) => (
              <Product data={product} key={product.id}/>
            ))}
        </div>
    </div>
  )
}