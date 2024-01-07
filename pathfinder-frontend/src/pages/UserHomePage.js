import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import AllHikes from './AllHikes';

export default function UserHomePage() {
  const [futureHikes, setFutureHikes] = useState()
  // function onClickHandle() {
  //   setFutureHikes(true);
  // }
  const loadAllHikes = async () => {
    const result = await axios.get("http://localhost:8080/allhikes");
    setFutureHikes(result.data);
  }


  return (
    <div>
      {/* <a className="btn btn-primary" href="#" role="button">Create Hike</a> */}
      <Link className="btn btn-primary" to="/createhike">Create Hike</Link>
      <button className="btn btn-primary" type="submit" onClick={loadAllHikes}>Future Hikes</button>
      <button className="btn btn-primary" type="submit">Past Hikes</button>

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

  )
}