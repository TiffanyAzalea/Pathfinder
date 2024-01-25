import React, { useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import NavbarBS from '../layout/NavbarBS';

export default function UserHomePage() {

  const [futureHikes, setFutureHikes] = useState()

  const [userId, setUserId] = useState();
  const [hike, setHike] = useState({
    trailName: "",
    areaName: "",
    walkable: "",
    bikeFriendly: "",
    distance: "",
    date: ""
  })
  const username = localStorage.getItem("user");
  axios.get("http://localhost:8080/user/" + username).then(res => {
    setUserId(res.data.id);
  })

  const loadAllHikes = async () => {
   
    const result = await axios.get("http://localhost:8080/allhikes");
    setFutureHikes(result.data);
    Navigate("/allHikes")
  }


  return (

    <div className='section'>
      {/* <a className="btn btn-primary" href="#" role="button">Create Hike</a> */}
      <Link className="btn btn-primary mx-2" to="/createhike">Create Hike</Link>
      <Link className="btn btn-primary mx-2" to="/hikeslist">Hikes List</Link>

      {/* {
  futureHikes ? <div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active"  aria-current="true">
    The current link item
  </a>
  <a href="#" class="list-group-item list-group-item-action">A second link item</a>
 
</div> : <div></div>
} */}




      {/* <input className="btn btn-primary" type="button" value="Input"></input>
<input className="btn btn-primary" type="submit" value="Submit"></input>
<input className="btn btn-primary" type="reset" value="Reset"></input> */}
    </div>

  )
}