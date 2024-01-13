import React from 'react';
import { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import axios from 'axios';

export default function Home() {

    const { setAuth } = useContext(AuthContext);

    const [user, setUser] = useState();

    let navigate = useNavigate();


    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        const loggedInToken = localStorage.getItem("token");
        if (loggedInToken === "token123") {
            const foundUser = loggedInUser;
            console.log(localStorage.getItem('user'));
            console.log(loggedInUser);
            console.log(foundUser);
            setUser(foundUser);
        }
    }, []);

    const handleLogout = () => {
        setUser("");
        localStorage.clear();
    };

    return (
        <div>
            <h2>Your current status is:</h2>
            {user
                ? <p>Logged in! You are {user}.</p>
                : <p>Womp womp.</p>
            }
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}
