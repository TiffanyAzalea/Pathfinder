import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: ""
  });

  const { firstName, lastName, username, password, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/user", user);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
      
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        
          <h2 className="text-center m-4">Become a Pathfinder!</h2>
          
          <form onSubmit={onSubmit}>
            <div className="mb-3" style={{textAlign: 'left'}}>
              <label htmlFor="firstName" className="form-label">
                First Name
                </label><input
                type={"text"}
                className="form-control"
                placeholder="Eg:Edmund"
                name="firstName"
                value={firstName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3" style={{textAlign: 'left'}}>
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Eg:Hillary"
                name="lastName"
                value={lastName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3" style={{textAlign: 'left'}}>
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Eg:sireddyhills"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3" style={{textAlign: 'left'}}>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Eg:icl1mb3verest"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3" style={{textAlign: 'left'}}>
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Eg:you@pathfinder.com"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
                autoComplete="off"
              />
            </div>
            <button type="submit" className="btn btn-outline-primary" >
              Submit
            </button>
           
          </form>
        </div>
      </div>
    </div>
  );
}