import React, { useState } from 'react';
import "../cart/cart.css";
import { StripeContainer } from '../../components/stripeContainer';
import "./checkout.css";

export const CheckoutForm = () => {

  return (
    <div className='payment'>
      <StripeContainer/>
    </div>
  )
}
