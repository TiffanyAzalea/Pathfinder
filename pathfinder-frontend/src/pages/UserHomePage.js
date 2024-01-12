import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import NavbarBS from '../layout/NavbarBS';

export default function UserHomePage() {
  let navigate = useNavigate();
  const [futureHikes, setFutureHikes] = useState()
  const [hikes, setHikes] = useState()
  // function onClickHandle() {
  //   setFutureHikes(true);
  // }
  const loadAllHikes = async () => {
    const result = await axios.get("http://localhost:8080/allhikes");
    setFutureHikes(result.data);
  }
  const {id}=useParams();

    useEffect(()=>{
        loadHikes()
    },[])

    const loadHikes= async ()=>{
        const result=await axios.get(`http://localhost:8080/viewhike/${id}`)
        setFutureHikes(result.data)
    }
const onSubmit = async (e) => {
  e.preventDefault();
  await axios.get("http://localhost:8080/allhikes",);
  navigate("/viewhike");
};

  return (

    <div className='section'>
      <NavbarBS/>
      {/* <a className="btn btn-primary" href="#" role="button">Create Hike</a> */}
      <Link className="btn btn-primary mx-2" to="/createhike">Create Hike</Link>
      <button className="btn btn-primary mx-2" type="submit" onClick={loadAllHikes}>Future Hikes</button>
      <button className="btn btn-primary mx-2" type="submit">Past Hikes</button>

      {/* {
  futureHikes ? <div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active"  aria-current="true">
    The current link item
  </a>
  <a href="#" class="list-group-item list-group-item-action">A second link item</a>
 
</div> : <div></div>
} */}

<form onSubmit={(e) => onSubmit(e)}>
      <table className="center">

        <tbody>
          {futureHikes?.map((hike, index) => (
            <tr>
              <th scope="row" key={index}>{index + 1}</th>
              <Link to={`/viewhike/${id}`}><td>{hike.trailName}</td></Link>
              <td>{hike.date}</td>

            </tr>
          ))}


        </tbody>
      </table>
      </form>
    
      {/* <input className="btn btn-primary" type="button" value="Input"></input>
<input className="btn btn-primary" type="submit" value="Submit"></input>
<input className="btn btn-primary" type="reset" value="Reset"></input> */}
    </div>

  )
}