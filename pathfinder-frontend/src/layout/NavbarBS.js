import { NavDropdown , Container , Nav , Navbar } from 'react-bootstrap';
import { Link,useNavigate } from "react-router-dom";
import React from 'react';

function NavbarBS() {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    //let path = `newPath`; 
    navigate("/adduser");
  }

  
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">PathFinder</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example" className="justify-content-end">
          <Nav>
          <div className="d-flex flex-row-reverse">
                    
                    <button className="d-flex btn btn-outline-light">Log In</button>
                </div>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Menu"
              menuVariant="dark"
              align="end"
            >
              <NavDropdown.Item as={Link} to="/">Home</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/adduser" onClick={routeChange}>Create Account</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/viewuser" >View Account</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/edituser" >Edit Account</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/deleteuser">Delete Account</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarBS;