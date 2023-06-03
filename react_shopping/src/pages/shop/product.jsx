import React, { useCallback, useContext } from 'react'
import {ShopContext} from "../../context/shop-context";
import { Shop } from './shop';

export const Product = (props) => {
    const { id, title:productName, price, image:productImage } = props.data;
    const { addToCart, cartItems } = useContext(ShopContext);
    const cartItemAmount = cartItems[id];
    
  return (
    <div className="product">
        <img src={productImage} />

        <div className="description">
            <p className='name'>
                <b>{productName}</b>
            </p>
            <p className='price'>
                ${(price).toFixed(2)}
            </p>
        </div>
        <button className="addToCartBttn" onClick={() => addToCart(id)}>
            Add To Cart 
            {cartItemAmount > 0 && 
                <> 
                ({cartItemAmount})
                </>}
        </button>

    </div>
  )
}
