
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
import UserHomePage from './pages/UserHomePage';
import AllHikes from './pages/AllHikes';
import React from 'react';
import ViewUser from './users/ViewUser';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <NavbarBS />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/adduser" element={<AddUser />} />
           <Route exact path="/edituser/:id" element={<EditUser />} />
           <Route exact path="/viewuser/:id" element={<ViewUser />} />
          <Route exact path="/userhomepage" element={<UserHomePage />} />
          <Route exact path="/createhike" element={<CreateHike />} />
          <Route exact path="/allhikes" element={<AllHikes/>} />
        </Routes>
      </BrowserRouter>
      {/* <NavbarForHome /> */}
      {/* <UserHomePage /> */}

      {/* <CreateHike /> */}
    </div>
  );
}

export default App;
