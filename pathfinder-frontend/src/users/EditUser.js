import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";


export default function EditUser() {

  const [userAuth, setUserAuth] = useState();

  // need to duplicate use of this object w/ diff. name for the
  // put function so it doesn't continuously update from get function
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: ""
  });

  const [editUser, setEditUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: ""
  });

  const loadLogin = useLogin();

  useEffect(() => {
    setUserAuth(loadLogin);
  }, [loadLogin]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/${userAuth}`
        );
        setUser(response?.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user, userAuth]);

  const loadUser = () => {
    setEditUser(user);
  }

  useEffect(() => {
    loadUser();
  }, [])

  let navigate = useNavigate();

  const { id, firstName, lastName, username, password, email } = user;

  const onInputChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(`http://localhost:8080/user/${user.id}`, editUser,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    console.log(JSON.stringify(response?.data));
    navigate("/viewuser");
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
                placeholder={user.firstName}
                name="firstName"
                value={editUser.firstName}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder={user.lastName}
                name="lastName"
                value={editUser.lastName}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
          
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder={user.password}
                name="password"
                autoComplete="off"
                value={editUser.password}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder={user.email}
                name="email"
                autoComplete="off"
                value={editUser.email}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">Submit</button>
            <Link className="btn btn-outline-danger mx-2" to="/viewuser">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

