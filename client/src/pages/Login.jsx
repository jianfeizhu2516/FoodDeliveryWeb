import React, { useEffect, useState } from 'react'
import "../styles/login.scss"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export const Login = () => {
    const [currentInputs, setInputs] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const onInputChange = (e) => {
        console.log(e)
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`,
                currentInputs,
                { withCredentials: true }
            );
            console.log('response是', response);
            alert(response.data.message)
            if(response.status === 200) navigate('/')
        } catch (err) {
            console.log('err is', err)
            alert(err.response?.data?.message || 'An error occurred');
        }

    }
    return (

        <div className='loginContainer'>
            <form action="" className='loginForm'>
                <h6>Email</h6>
                <input type="text" name="email" onChange={onInputChange} placeholder='enter your email' />
                <h6>Password</h6>
                <input type="password" name="password" onChange={onInputChange} placeholder='enter your password' />
                <button onClick={submitForm}>Login</button>

                <div className='signUpLink'>
                    <Link to="/signup">No account? Sign Up</Link>
                </div>

            </form>
        </div>
    )
}

export default Login;