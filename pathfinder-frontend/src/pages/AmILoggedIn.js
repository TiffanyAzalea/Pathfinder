import React from 'react';
import { useState, useEffect } from 'react';

export default function Home() {

    const [user, setUser] = useState();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        const loggedInToken = localStorage.getItem("token");
        if (loggedInToken === "token123") {
            const foundUser = loggedInUser;
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
