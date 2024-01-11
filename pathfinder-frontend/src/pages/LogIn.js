import { useState, useRef, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const { setAuth } = useAuth;
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');


    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

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
            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response));
            console.log(JSON.stringify(response?.data?.username));
            console.log(JSON.stringify(response?.status));
            // setAuth({ username, password });
            setUsername('');
            setPassword('');
            navigate(from, { replace: true });
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
        <section>
            <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
                <div className='big-white p-3 rounded w-25'>
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
                        <button type='submit' className='btn btn-success w-100'>Sign In</button>
                    </form>
                    <p>
                        Want to become a Pathfinder?<br />
                        <span className="line">
                            <button className='btn btn-default border w-100 bg-light'><Link to="/adduser" >Create Account</Link></button>
                        </span>
                    </p>
                </div>
            </div >
        </section >
    )
}
export default Login