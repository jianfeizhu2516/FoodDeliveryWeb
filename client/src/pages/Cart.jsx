import React from 'react'
import "../styles/cart.scss"
import { useSelector, useDispatch } from 'react-redux'
import { addItemToCart, subtractCartItem } from '../store/cartSlice.js'
import { useNavigate } from 'react-router-dom';
export const Cart = () => {

  const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cart.cartItems)

  const subTotal = useSelector((state)=>state.cart.subTotal)

  const navigate  = useNavigate();

  const handleContinueShopping = () => {
    navigate("/foods");
  };

  
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
        <button className='checkoutButtonCartPage'>Proceed To Checkout</button>
        </div>
  

    </>
  )
}

export default Cart;