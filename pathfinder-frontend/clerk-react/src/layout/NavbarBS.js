import { NavDropdown , Container , Nav , Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import React from 'react';

function NavbarBS() {
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">Pathfinder</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example" className="justify-content-end">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Menu"
              menuVariant="dark"
              align="end"
            >
              <NavDropdown.Item as={Link} to="/">Home</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/adduser">Create Account</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/edituser">Edit User Details</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarBS;