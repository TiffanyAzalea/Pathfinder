import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();
  const initialValues = { 
                  firstName: "",
                  lastName: "",
                  username: "",
                  email:"",
                  password: ""
                  
            }
  const [ user, setUser] = useState({initialValues});
  const [visible,setVisible] = useState(false);

  const {id}=useParams();
  const { firstName, lastName, username, password, email } = user;

  const onInputChange = (e) => {
    const {name, value} = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/user", user);
    navigate(`/viewuser/${id}`);
  };

  useEffect(()=>{
    loadUser()
},[]);

const loadUser= async ()=>{
    const result=await axios.get(`http://localhost:8080/user/${id}`)
    setUser(result.data)
}


  return (
    <div className="container">
    
    <div className="row">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      <form onSubmit={onSubmit}>
        <h2 className="text-center">Save Changes!</h2>
        
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label" >
              First Name
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder={user.firstName}
              name="firstName"
              value={user.firstName}
              onChange={onInputChange}
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
              value={user.lastName}
              onChange={onInputChange}
            />
          </div>
        
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder={user.username}
              name="username"
              value={user.username}
              onChange={onInputChange}
            />
          </div>
         
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              className="form-control"
              placeholder={user.email}
              name="email"
              value={user.email}
              onChange={onInputChange}
            />
          </div>
          
          <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={visible ? "text" : "password"}
                className="form-control"
                placeholder={user.password}
                name="password"
                value={user.password}
                onChange={onInputChange}
              />
            </div>

            
          <button type="submit" to={`/viewuser/${user.id}`} className="btn btn-outline-primary">
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

