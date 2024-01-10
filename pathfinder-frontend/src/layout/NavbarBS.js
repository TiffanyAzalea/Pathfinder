import axios from "axios";
import { NavDropdown , Container , Nav , Navbar } from 'react-bootstrap';
import { Link, useParams} from "react-router-dom";
import React, { useEffect,useState }  from 'react';
import logo from '../img/logo1.jpg';


function NavbarBS() {
 

  const [user, setUser] = useState({
    username: "",
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
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand className='navbar-logo' href="/userhomepage"><img src={logo} alt="logo.jpg"></img>Pathfinder</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example" className="justify-content-end">
        
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Menu"
              menuVariant="dark"
              align="end"
              
            >
              <NavDropdown.Item as={Link} to={`/userhomepage`}>Home</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/">Logout</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/adduser">Create Account</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={`/edituser/${user.id}`}>Edit Account</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={`/viewuser/${user.id}`}>View Account</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/deleteuser/:id">Delete Account</NavDropdown.Item>
              

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarBS;