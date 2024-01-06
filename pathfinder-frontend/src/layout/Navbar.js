
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Pathfinder
          </Link>
          <div class="btn-group dropstart">
            <button 
              class="btn btn-secondary dropdown-toggle" 
              type="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              Menu
            </button>
            <ul class="dropdown-menu">
              <li><Link className="dropdown-item" to="/">Home</Link></li>
              <li><Link className="dropdown-item" to="/login">Log In</Link></li>
              <li><Link className="dropdown-item" to="/adduser">Create Account</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}