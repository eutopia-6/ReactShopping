import React, { useContext } from 'react';  
import "./favorites.css";
import { ShopContext } from '../../context/shop-context';

export const FavoriteItems = (props) => {
    const { favoriteItems } = useContext(ShopContext); 
    const { id, title, image,  } = props.data;
  return (
    <div className='itemcenter'>    
        {favoriteItems[id] === 1 ? 
        <div className='favoriteItem' >
            <img src={image}/> 
            <div className='description'>
                <b>
                    {title}
                </b>
            </div>
        </div>
        
        
        : null}
    </div>
  )
}
