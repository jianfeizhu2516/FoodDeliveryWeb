import React, { useState, useEffect } from "react";


export const Checkout = () => {

  const handleClick = async ()=>{
    const cartItems = [
      { price: 'price_1PlKuLAAMFTLuMMi5TxkxfCg', quantity: 2 },
    ];
    try{
      const response = await fetch('http://localhost:8800/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems }),
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