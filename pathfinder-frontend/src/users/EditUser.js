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

  // useEffect(() => {
  //     const loggedInUser = localStorage.getItem("user");
  //     const loggedInToken = localStorage.getItem("token");
  //     if (loggedInToken === "token123") {
  //         const foundUser = loggedInUser;
  //         console.log(localStorage.getItem('user'));
  //         console.log(loggedInUser);
  //         console.log(foundUser);
  //         setUserAuth(foundUser);
  //     }
  // }, []);

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
        console.log(response?.data);
        setUser(response?.data);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user, userAuth]);

  //   useEffect(()=>{
  //     loadUser()
  // },[]) 

  // const loadUser = async ()=>{
  //     const result = await axios.get(`http://localhost:8080/user/${userAuth}`)
  //     console.log(result?.data);
  //     setUser(JSON.stringify(result?.data));
  // }

  let navigate = useNavigate();

  const { id, firstName, lastName, username, password, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/user/${user.id}`, user,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
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
            {/* <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Change your Username here"
              name="username"
              autoComplete="off"
              value={user.username}
              onChange={(e) => onInputChange(e)}
            />
          </div> */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Change your Password here"
                name="password"
                autoComplete="off"
                value={user.password}
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
                autoComplete="off"
                value={user.email}
                onChange={(e) => onInputChange(e)}
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

