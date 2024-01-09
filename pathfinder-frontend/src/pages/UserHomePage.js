import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

import NavbarBS from '../layout/NavbarBS';
import '../HomePage/Button.css';

export default function UserHomePage() {
  let navigate = useNavigate();
  
  
  const [futureHikes, setFutureHikes] = useState()
  // function onClickHandle() {
  //   setFutureHikes(true);
  // }
  const loadAllHikes = async () => {
    const result = await axios.get("http://localhost:8080/allhikes");
    setFutureHikes(result.data);
    navigate("/allhikes");
  }
 

  return (
<section className='section'>
  <div><NavbarBS/></div>

    <div >
    
      <div className='hero-containers'>
      <image src='/public/images/img-9.jpg' />
      <h1>Welcome Back!</h1>
      {/* <a className="btn btn-primary" href="#" role="button">Create Hike</a> */}
      <a href="/createhike" className="button">Create Hike</a>
      <button className="button" type="submit" onClick={loadAllHikes}>Future Hikes</button>
      <button className="button" type="submit">Past Hikes</button>

      {/* {
  futureHikes ? <div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active"  aria-current="true">
    The current link item
  </a>
  <a href="#" class="list-group-item list-group-item-action">A second link item</a>
 
</div> : <div></div>
} */}


      <table className="center">

        <tbody>
          {futureHikes?.map((hike, index) => (
            <tr>
              <th scope="row" key={index}>{index + 1}</th>
              <td>{hike.trailName}</td>
              <td>{hike.date}</td>

            </tr>
          ))}


        </tbody>
      </table>


      {/* <input className="btn btn-primary" type="button" value="Input"></input>
<input className="btn btn-primary" type="submit" value="Submit"></input>
<input className="btn btn-primary" type="reset" value="Reset"></input> */}

   
</div>
</div>
</section>
  )
}
