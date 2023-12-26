
import React, { useState } from 'react';

export default function LogIn() {

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
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            console.log('Login successful');
        } catch (error) {
            console.error('Login failed:', error.message);
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