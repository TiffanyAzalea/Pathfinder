import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarForHome from '../HomePage/NavbarForHome';
import '../HomePage/HeroSection.css';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    let navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/login",
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            localStorage.setItem('user', response?.data?.username);
            localStorage.setItem('token', response?.data?.token);
            setUsername('');
            setPassword('');
            navigate("/userhomepage");
            window.location.reload(false);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response.');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing username or password.');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized.');
            } else if (err.response?.status === 409) {
                setErrMsg('Incorrect password.');
            } else {
                setErrMsg('Login failed.');
            }
            errRef.current.focus();
        }
    }

    return (

        <section >
            <div className='d-flex justify-content-center align-items-center vh-100'>
                <div className='w-25 box1'>
                    <div>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>
                        <button type='submit' className='btn btn-success w-50'>Sign In</button>
                    </form>
                    <p>
                        Want to become a Pathfinder?<br />
                        <span className="line">
                            <button className='btn btn-default border w-80 bg-light'><Link to="/adduser" className='btn h-50'>Create Account</Link></button>
                        </span>
                    </p>
                </div>
            </div >
        </section >
    )
}
export default Login
