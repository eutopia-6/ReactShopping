import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from "./paymentForm";

const PUBLIC_KEY = "pk_test_51O8V3tKf6QsSxfqYuujrzwjvu5KkFNUo5ntzRE4CU7p41SirF2bqcOWbpXuKkgR7u2FvAMhoL95BmOIl43e0q00p008pMhc6cQ";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

export function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  )
}