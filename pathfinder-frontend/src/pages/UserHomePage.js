import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import NavbarBS from '../layout/NavbarBS';

export default function UserHomePage() {

  const [futureHikes, setFutureHikes] = useState()
  const [hike, setHike] = useState({
    trailName: "",
    areaName: "",
    walkable: "",
    bikeFriendly: "",
    distance: "",
    date: ""
  })

  const loadAllHikes = async () => {
    const result = await axios.get("http://localhost:8080/allhikes");
    console.log(result)
    const sortedResult = result.data.sort((a, b) => {
      if (a.date > b.date) {
        return -1
      }
      if (a.date < b.date) {
        return 1
      }
      return 0
    })
    setFutureHikes(sortedResult);
  }


  return (

    <div className='section'>
      {/* <a className="btn btn-primary" href="#" role="button">Create Hike</a> */}
      <Link className="btn btn-primary mx-2" to="/createhike">Create Hike</Link>
      <button className="btn btn-primary mx-2" type="submit" onClick={loadAllHikes}>Hikes List</button>

      {/* {
  futureHikes ? <div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active"  aria-current="true">
    The current link item
  </a>
  <a href="#" class="list-group-item list-group-item-action">A second link item</a>
 
</div> : <div></div>
} */}


      <table className="table center" style={{ width: 600 + "px" }}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Trail Name</th>
            <th scope="col">Hike Date</th>
          </tr>
        </thead>
        <tbody>
          {futureHikes?.map((hike, index) => (
            <tr>
              <th scope="row" key={index}>{index + 1}</th>
              <td><Link to={`/viewhike/${hike.id}`}>{hike.trailName}</Link></td>
              <td>{hike.date}</td>

            </tr>
          ))}


        </tbody>
      </table>


      {/* <input className="btn btn-primary" type="button" value="Input"></input>
<input className="btn btn-primary" type="submit" value="Submit"></input>
<input className="btn btn-primary" type="reset" value="Reset"></input> */}
    </div>

  )
}