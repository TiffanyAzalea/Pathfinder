
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from './layout/Navbar';
import NavbarBS from './layout/NavbarBS';
import Home from './pages/Home';
import AddUser from './users/AddUser';
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import NavbarForHome from './HomePage/NavbarForHome';
import Corousal from './layout/Corousal';
import CreateHike from './components/CreateHike';
import EditUser from './users/EditUser';
import React from 'react';
import ViewUser from './users/ViewUser';
import DeleteUser from './users/DeleteUser';
import UserHomePage from './pages/UserHomePage';
import AllHikes from './pages/AllHikes';
import Explore from './components/Explore';
import ViewHike from './pages/ViewHike';

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
          <Route exact path="/deleteuser/:id" element={<DeleteUser />} />
          <Route exact path="/userhomepage" element={<UserHomePage />} />
          <Route exact path="/createhike" element={<CreateHike />} />
          <Route exact path="/allhikes" element={<AllHikes/>} />
          <Route exact path="/explore" element={<Explore/>} />
          <Route exact path="/viewhike/:id" element={<ViewHike/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
