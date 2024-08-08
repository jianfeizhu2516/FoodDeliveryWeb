import "../styles/signup.scss"
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export const Signup = () => {
    const navigate  = useNavigate();
    const [currentInputs, setInputs] = useState({
        email: "",
        password: ""
    });
    const onInputChange = (e) => {
        console.log(e)
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, currentInputs);
            alert(response.data.message);
        }
        catch (err) {
            const message = err.response?.data?.message || 'An error occurred';
            alert(message);
        }
    }
    return (
        <div className='signUpContainer'>
            <form action="" className='loginForm'>
                <h6>Email</h6>
                <input type="text" name="email" onChange={onInputChange} placeholder='enter your email' />
                <h6>Password</h6>
                <input type="password" name="password" onChange={onInputChange} placeholder='enter your password' />

                <button onClick={submitForm}>Sign Up</button>

                <div className='loginLink'>
                    <Link to="/login">Already registered? Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Signup;