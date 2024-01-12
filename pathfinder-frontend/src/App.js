
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
import Login from './pages/Login';
import ViewUser from './users/ViewUser';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import AmILoggedIn from './pages/AmILoggedIn';

function App() {

  return (
    <div className="App">
      <NavbarBS />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/amiloggedin" element={<AmILoggedIn />} />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/edituser/:id" element={<EditUser />} />
            <Route path="/viewuser/:id" element={<ViewUser />} />
            <Route path="/userhomepage" element={<UserHomePage />} />
            <Route path="/createhike" element={<CreateHike />} />
          </Route>
          <Route path="/allhikes" element={<AllHikes />} />
        </Route>
      </Routes>
      {/* <NavbarForHome /> */}
      {/* <UserHomePage /> */}

      {/* <CreateHike /> */}
    </div>
  );
}

export default App;
