import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: ""
      });
    const {id}=useParams();

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
          <h2 className="text-center m-4">Welcome, {user.username}!</h2>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    Name: {user.firstName} {user.lastName}
                </li>
                <li className="list-group-item">
                    E-mail: {user.email}
                </li>
                <li className="list-group-item">
                    No. hikes created:
                </li>
                <li className="list-group-item">
                    No. miles hiked: 
                </li>
            </ul>
            <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.id}`}>Edit details</Link>
            <Link className="btn btn-outline-danger mx-2" to={`/`}>Cancel</Link>


        </div>
      </div>
    </div>
    )
}