import React from 'react'
import "../styles/cart.scss"
import { useSelector, useDispatch } from 'react-redux'
import { addItemToCart, subtractCartItem } from '../store/cartSlice.js'
import { useNavigate } from 'react-router-dom';
import priceMapping from '../priceMapping.js';
export const Cart = () => {

  const dispatch = useDispatch()


  const subTotal = useSelector((state) => state.cart.subTotal)

  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/foods");
  };
  const cartItems = useSelector((state) => state.cart.cartItems)


  const handleCheckout = async () => {
    // for stripe checkout
    const itemsForCheckout = cartItems.map(item => ({
      price: priceMapping[item.id],
      quantity: item.quantity,
    })); 
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: itemsForCheckout }),
      });

      const session = await response.json();
      window.location.href = session.url;

    } catch (err) {
      console.error('Error creating checkout session:', err);
    }
  }


  return (
    <>
      <h2 className='cartSummary'>Cart Summary</h2>

      <table className='tableContainer'>
        <thead>
          <tr>
            <th className='imgCol'>Image</th>
            <th className='productCol'>Product Name</th>
            <th className='quantityCol'>Quantity</th>
            <th className='priceCol'>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr className='tableRow'>
              <td>
                <img className="tableImg" src={item.image} alt="" />
              </td>

              <td>
                <h6>{item.name}</h6>
              </td>

              <td>
                <button className='plusButton' onClick={() => { dispatch(addItemToCart(item)) }}>+</button>
                <button className='quantityButton'>{item.quantity}</button>
                <button className='minusButton' onClick={() => { dispatch(subtractCartItem(item)) }}>-</button>
              </td>

              <td><h6>${item.price * item.quantity}</h6></td>
            </tr>
          ))}
        </tbody>
      </table>


      <h5 className='subTotalContainer'>Subotal:$
        <span className='subTotalPrice'>{subTotal}</span>
      </h5>

      <div className='buttonGroupCheckout'>
        <button className='continueButton' onClick={handleContinueShopping}>Continue Shopping</button>
        <button className='checkoutButtonCartPage' onClick={handleCheckout}>Proceed To Checkout</button>
      </div>


    </>
  )
}

export default Cart;