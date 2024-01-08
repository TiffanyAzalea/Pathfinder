import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";



export default function DeleteHike() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: ""
  });

  const {id}=useParams();
  const { firstName, lastName, username, password, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.delete(`http://localhost:8080/user/${id}`);
    navigate(`/`);
  };

  useEffect(()=>{
    loadUser()
},[])

const loadUser= async ()=>{
    const result=await axios.get(`http://localhost:8080/user/${id}`)
    setUser(result.data)
}
  
  return (
    <div className="container">
        <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <h2 className="text-center m-4">Delete Account!</h2>
            <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3"></div>
            <label htmlFor="username" className="form-label">
            Are you sure you want to delete your account
              </label>
                <div className="mb-3">
                <button type="submit" to={"/"} className="btn btn-danger ">
            Delete
          </button>
                    <Link to={`/viewuser/${user.id}`} className="btn btn-primary mx-2">
                    Cancel
                </Link>
                </div>
                </form>
            </div>
        </div>
    </div>

  );
}

