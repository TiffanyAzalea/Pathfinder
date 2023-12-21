import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function EditUser() {
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
    await axios.put("http://localhost:8080/user", user);
    navigate("/");
  };

  
  return (
    <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      
        <h2 className="text-center">Save Changes!</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Change your First name here"
              name="firstName"
              value={firstName}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Change your Last name here"
              name="lastName"
              value={lastName}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Change your Username here"
              name="username"
              value={username}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Change your Password here"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Change your E-mail here"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          <button type="submit" className="btn btn-outline-primary">
            Submit
          </button>
          <Link to="/" className="btn btn-outline-danger mx-2">
              Cancel
            </Link>
        </form>
      </div>
    </div>
  </div>
  );
}

