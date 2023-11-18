import React, { useState, useContext } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { ShopContext } from "../context/shop-context";
import axios from "axios";

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
  const totalAmount = getTotalCartAmount();
  
  const handleInput = (e) => {
		e.preventDefault();
		setCardNumber(e.target.value);		
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
    })

	if(!error) {
		try {
			const {id} = paymentMethod;
			const response = await axios.post("http://placeHolder", {
				amount: 1000,
				id: id
			});
	
			if(response.data.success) {
				console.log("Successful payment");
				setSuccess(true);
			}
		}
		catch (error) {
			console.log("Error: ", error);
		}
	  }
	  else {
		console.log(error.message);
	  }
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
			<button>Pay</button>
		</form>	:
		<div>
			<h2>Just Paid for the Items</h2>
		</div>
		}
    </div>
  );
}
