import React, { useEffect, useState } from 'react'
import "../styles/header.scss"
import { Link } from 'react-router-dom';
import logo from "../assets/images/res-logo.png";
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import { addItemToCart, subtractCartItem } from '../store/cartSlice.js'
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { userLogout } from '../store/userSlice.js'
export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const dispatch = useDispatch()

    const totalQuantity = useSelector((state) => state.cart.totalQuantity)

    const currentUser = useSelector((state) => state.user.currentUser)

    const [subTotal, setSubTotal] = useState(0);

    const cartItems = useSelector((state) => state.cart.cartItems)

    const navigate = useNavigate();

    useEffect(() => {
        let sum = 0;
        cartItems.forEach(item => {
            sum += item.price * item.quantity
        })
        setSubTotal(sum);
    }, [cartItems])

    const showCartModal = () => {
        setShowModal(!showModal)
    }
    const [showModal, setShowModal] = useState(false);

    const handleCheckout = () => {
        setShowModal(false)
        navigate("/cart")
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const logOut = () => {
        dispatch(userLogout)
    }

    return (
        <><div className='container'>
            <img src={logo} alt="Tasty Treat" className='logo' />
            <Link className="link" to="/"><h5>Home</h5></Link>
            <Link to="/foods" className='link'> <h5>Foods</h5></Link>
            <Link to="/cart" className='link'><h5>Cart</h5></Link>
            <Link to="/contact" className='link'><h5>Contact</h5></Link>

            <div className='icons'>
                <span className='cartIcon' onClick={() => { showCartModal() }}>
                    <i className="ri-shopping-basket-line"></i>
                </span>
                <span className='cartNumberBadge'>
                    {totalQuantity}
                </span>

            

                <span className='userIcon'>

                    <Dropdown>
                        <Dropdown.Toggle className="dropdown-basic" onBlur={() => document.querySelector('.dropdown-basic').style.backgroundColor = 'rgb(224,26,26)'}>
                            <i class="ri-user-line"></i>
                        </Dropdown.Toggle>
                        {currentUser ?
                            <Dropdown.Menu>
                                <Dropdown.Item className='dropdown-item' disabled>{currentUser === undefined ? "You are not logged in" : currentUser}</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" href="/"><button onClick={logOut}>Logout</button></Dropdown.Item>
                            </Dropdown.Menu> :

                            <Dropdown.Menu>
                                <Dropdown.Item ><button onClick={() => navigate("/login")}>Login</button></Dropdown.Item>
                            </Dropdown.Menu>

                        }

                    </Dropdown>
                </span>

            </div>
        </div>

            <Modal
                size='xl'
                show={showModal}
                dialogClassName="modalContainer"
                fullscreen

            >
                <Modal.Header closeButton onHide={() => { setShowModal(false) }}>
                    <Modal.Title >
                        Cart Summary
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {cartItems.map((item, index) => (
                        <div className='itemRow'>
                            <span className='itemSummary'>
                                <h6 key={index} style={{ maxWidth: "10vw" }}>{item.name}</h6>
                                <div className='buttonGroup'>

                                    <button className='plusButton' onClick={() => { dispatch(addItemToCart(item)) }}>+</button>
                                    <button className='quantityButton'>{item.quantity}</button>
                                    <button className='minusButton' onClick={() => { dispatch(subtractCartItem(item)) }}>-</button>

                                </div>
                                <h6>${item.price * item.quantity}</h6>
                            </span>
                        </div>
                    ))}


                </Modal.Body>
                <Modal.Footer className='modalFooter'>
                    <span className='subTotal'>Subtotal: ${subTotal}</span>
                    <button className='checkoutButton' onClick={handleCheckout}>Checkout</button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default Header;