import React, { useState, useContext } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { ShopContext } from "../context/shop-context";
import axios from "axios";
import { Shop } from "../pages/shop/shop";

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#FFFFFF",
			color: "#FFFFFF",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#FFFFFF" },
			"::placeholder": { color: "#FFFFFF" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}
export function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [cardNumber, setCardNumber] = useState();
  const { getTotalCartAmount } = useContext(ShopContext);
  const { clearCart } = useContext(ShopContext);
  const [totalAmount, setTotalAmount] = useState(getTotalCartAmount());

  
  const handleInput = (e) => {
		e.preventDefault();
		setCardNumber(e.target.value);		
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
	console.log("Successful payment");
	setTotalAmount(0);
	clearCart();
	setSuccess(true);
  }


  return (
    <div>
		<h2 className="subTotalCheckout"> Subtotal: ${(totalAmount).toFixed(2)}</h2>
		{!success ? 
		<form>
			<fieldset className="FormGroup">
				<div className="FormRow">
					<CardElement options={CARD_OPTIONS}/>
				</div>
			</fieldset>
			<button onClick={handleSubmit}>Pay</button>
		</form>	:
		<div>
			<h2 style={{ textAlign: 'center' }}>Just Paid for the Items</h2>
		</div>
		}
    </div>
  );
}
