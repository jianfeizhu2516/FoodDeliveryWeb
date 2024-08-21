import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import "../styles/foodCard.scss"
import { Row, Col } from 'react-bootstrap';
import burgerLogo from "../assets/images/hamburger.png"
import breadLogo from "../assets/images/bread.png"
import pizzaLogo from "../assets/images/pizza.png"
import { useDispatch } from 'react-redux'
import { addItemToCart } from '../store/cartSlice.js'
import { useEffect } from 'react';
import axios from "axios";
export const FoodCard = () => {
  const dispatch = useDispatch()
  const addToCartClick = (item) => {
    dispatch(addItemToCart(item))
  }

  const [selectedCategory, setCategory] = useState('');

  const [filteredData, setFilteredData] = useState([]);

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])


  useEffect(() => {
    if (selectedCategory !== "" && selectedCategory !== "all") {
      const filtered = productList.filter((item) => item.category === selectedCategory)
      setFilteredData(filtered)
    } else{
      setFilteredData(productList)
    }
  }, [selectedCategory])

  const fetchData = async () => {
    try {
       const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
      if (res.data?.length > 0) {
        setProductList(res.data)
        setFilteredData(res.data)
      }
      }
       catch (err) {
      console.log('err是',err)
    }
  }



  return (
    <div className='foodCardContainer'>
      <div className='foodTypeBanner'>

        <button className='button'>
          <span className='foodType' onClick={() => setCategory('all')}>
            <span className='foodTypeText'>All</span>
          </span>
        </button>

        <button className='button'>
          <span className='foodType' onClick={() => setCategory('burger')}>
            <img className="foodTypeLogos" src={burgerLogo} alt="" />
            <span className='foodTypeText'>Burger</span>
          </span>
        </button>

        <button className='button'>
          <span className='foodType' onClick={() => setCategory('pizza')}>
            <img className="foodTypeLogos" src={pizzaLogo} alt="" />
            <span className='foodTypeText'>Pizza</span>
          </span>
        </button>

        <button className='button' onClick={() => setCategory('bread')}>
          <span className='foodType'>
            <img src={breadLogo} className="foodTypeLogos" alt="" />
            <span className='foodTypeText'>Bread</span>
          </span>
        </button>

      </div>
      <Row className="cardOuterContainer">
        {
          filteredData?.map((item) => (
            <Col key={item.id} >
              <Card className='foodCard'>
                <div className='cardImgDiv'>
                  <Card.Img variant="top"
                    src={item.image}
                    className='cardImg' />
                </div>
                <Card.Title style={{ textAlign: "center", fontSize: "medium" }}>{item.name}</Card.Title>
                <Card.Text>
                  <div className='priceDiv'>
                    <span>{'$' + item.price}</span>
                  </div>
                  <div className='cartButtonDiv'>
                    <button className="cartButton" onClick={() => addToCartClick(item)}>
                      <span style={{ padding: "1vw" }}>Add to Cart</span>
                    </button>
                  </div>
                </Card.Text>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};


export default FoodCard;