
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

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
    
        fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.get('username'),
            password: formData.get('password'),
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if(data.fieldErrors) {
              data.fieldErrors.forEach(fieldError => {
                if(fieldError.field === 'username'){
                  setUsernameError(fieldError.message);
                }
    
                if(fieldError.field === 'password'){
                  setPasswordError(fieldError.message);
                }
              });
            } else {
              alert("Success !!");
            }
          })
          .catch((err) => console.error(err));
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
                <div>
                    <button type='submit' className='btn btn-success w-100'>Log In</button>
                    <p></p>
                    <button className='btn btn-default border w-100 bg-light'><Link to="/adduser" >Create Account</Link></button>
                </div>
            </form>
        </div>
    </div>

   
  )
}