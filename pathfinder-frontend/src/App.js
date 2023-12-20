
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from './layout/Navbar';
import NavbarBS from './layout/NavbarBS';
import Home from './pages/Home';
import AddUser from './users/AddUser';
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import NavbarForHome from './layout/NavbarForHome';
import Corousal from './layout/Corousal';
import CreateHike from './components/CreateHike';
import EditUser from './users/EditUser';
import React from 'react';
import LogIn from './pages/LogIn';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <NavbarBS />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/adduser" element={<AddUser />} />
          <Route exact path="/edituser" element={<EditUser />} />
          <Route exact path="/login" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
      <NavbarForHome />

      <CreateHike />
    </div>
  );
}

export default App;
