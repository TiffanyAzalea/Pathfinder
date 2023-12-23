import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


export default function DeleteUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: ""
  });

  const {id}=useParams();
  //const { firstName, lastName, username, password, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.delete("http://localhost:8080/user", user);
    //navigate(`/`);
  };

  useEffect(()=>{
    loadUser()
},[])

const loadUser= async ()=>{
    const result=await axios.get(`http://localhost:8080/user/${id}`)
    setUser(result.data)
}

const deleteUser=async (id)=>{
    await axios.delete(`http://localhost:8080/user/${id}`)
    navigate("/");
}
  
  return (
    <div className="container">
        <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <h2 className="text-center m-4">Delete, {user.username} Account!</h2>
            <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3"></div>
            <label htmlFor="username" className="form-label">
            Are you sure you want to delete your account
              </label>
                <div className="mb-3">
                    <button className="btn btn-danger mx-2" 
                    onClick={()=>deleteUser(user.id)}>Delete</button>
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

