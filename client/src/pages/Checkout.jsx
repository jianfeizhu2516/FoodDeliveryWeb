import React, { useState, useEffect } from "react";
import priceMapping from '../priceMapping.js';
import { useSelector, useDispatch } from 'react-redux'
export const Checkout = () => {

  const cartItems = useSelector((state) => state.cart.cartItems)
  const handleClick = async ()=>{
   
    const itemsForCheckout = cartItems.map((item) => ({
      price: priceMapping[item.id],
      quantity: item.quantity,
    }));
  
    try{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: itemsForCheckout }),
      });

      const session = await response.json();
      window.location.href = session.url;

    }catch(err){
      console.error('Error creating checkout session:', err);
    }
  }

  return (
  <div className="checkout">
      <button type="submit" onClick={handleClick}>
        Checkout
      </button>
  </div>
  )
}

export default Checkout;