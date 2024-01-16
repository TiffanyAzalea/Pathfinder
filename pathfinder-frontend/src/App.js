
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
import UserHomePage from './pages/UserHomePage';
import AllHikes from './pages/AllHikes';
import React from 'react';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ViewUser from './users/ViewUser';
import Footer from './HomePage/Footer';
import DeleteUser from './users/DeleteUser';
import Explore from './components/Explore';
import EditHike from './hikes/EditHike';
import ViewHike from './hikes/ViewHike';

import Search from './components/Search';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/adduser" element={<AddUser />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout/>} />
           <Route exact path="/edituser/:id" element={<EditUser />} />
           <Route exact path="/viewuser/:id" element={<ViewUser />} />
           <Route exact path="/deleteuser/:id" element={<DeleteUser />} />
          <Route exact path="/userhomepage" element={<UserHomePage />} />
          <Route exact path="/createhike" element={<CreateHike />} />
          <Route exact path="/edithike/:id" element={<EditHike />} />
          <Route exact path="/viewhike/:id" element={<ViewHike />} />
          <Route exact path="/explore" element={<Explore/>} />
          <Route exact path="/allhikes" element={<AllHikes/>} />
      
        </Routes>
        
        <Footer/>
      </BrowserRouter>
      
      {/* <NavbarForHome /> */}
      {/* <UserHomePage /> */}

      {/* <CreateHike /> */}
      
    </div>
  );
}

export default App;
