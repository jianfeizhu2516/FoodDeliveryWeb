import React from 'react'

import { Row, Col } from 'react-bootstrap';
import "../styles/home.scss"
import heroLogo from "../assets/images/hero.png";
import { useNavigate } from 'react-router-dom';
import FoodCard from "./FoodCard"

export const Home = () => {
  const navigate  = useNavigate();
  return (
    <>
    <div className='home'>
      <Row>
        <Col>
          <h3 className='slogan'>Easy way to make an order</h3>
          <h2><span style={{ color: "red" }}>HUNGRY?</span>  Just wait </h2>
          <h2>food at <span style={{ color: "red" }}>your door</span></h2>
          <h4 style={{ marginTop: "30px" }}>Check out our award-nominated pizza! </h4>

          <div>
            <button className='orderButton' onClick={()=>{navigate("/foods");}}>
              Order Now
              <i class="ri-arrow-right-s-line"></i>
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", marginTop: "1.5vh" }}>
            <i class="ri-car-line"> </i><span className='shippingCost'>No shipping cost</span>
            <i class="ri-shield-check-line"></i><span className='secureCheckout'>100% secure checkout</span>
          </div>
        </Col>

          <Col>
            <img src={heroLogo} alt="Hero"  className='img'/>
          </Col>
       
      </Row>
    </div>

    <div className="popularFoods">
        <h1>Popular Foods</h1>
    </div><FoodCard /></>

  )
}

export default Home
