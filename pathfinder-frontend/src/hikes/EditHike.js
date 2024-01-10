import axios from "axios";
import React, { useEffect,useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../App.css';
import NavbarBS from "../layout/NavbarBS";


export default function EditHike() {
  let navigate = useNavigate();
  return(

    <div>
        <NavbarBS/>
        <div className="section">EditHike</div>
        
    </div>
  );
}