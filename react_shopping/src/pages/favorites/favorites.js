import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/shop-context';
import "./favorites.css";
import { FavoriteItems } from './favorite-items';

export const Favorites = () => {
  const {productList} = useContext(ShopContext);
  
    return (
    <div>
        <h1 className='favoriteh1'>Favorite Items</h1>
        <div>
            {
                productList.map((product) => {
                   return <FavoriteItems data={product}/>     
                })
            }
        </div>
    </div>
  )
}
