
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

  

export default function LogIn() {

    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8080/login', {
                username,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
    
            console.log(JSON.stringify(response?.data));
    
            if (response.status !== 200) {
                throw new Error('Invalid credentials');
            }
    
            console.log('Login successful');
            navigate("/"); // Navigate to the desired location after successful login
        } catch (error) {
            console.error('Login failed:', error.message);
            navigate("/login"); // Navigate to the login page in case of login failure
        }
    };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='big-white p-3 rounded w-25'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username"><strong>Username</strong></label>
                    <input type="username" placeholder='Enter Username' className='form-control rounded-0' value={username} onChange={handleUsernameChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' className='form-control rounded-0' value={password} onChange={handlePasswordChange}/>
                </div>
                <button type='submit' className='btn btn-success w-100'>Log In</button>
                <p></p>
                <button className='btn btn-default border w-100 bg-light'>Create Account</button>
            </form>
        </div>
    </div>

   
  )
}