import React from 'react';
import { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import axios from 'axios';

export default function Home() {

    const { setAuth } = useContext(AuthContext);

    const [user, setUser] = useState();

    let navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            // const foundUser = JSON.parse(loggedInUser);
            setUser(loggedInUser);
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
                ? <p>Logged in!</p>
                : <p>Womp womp.</p>
            }
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}
