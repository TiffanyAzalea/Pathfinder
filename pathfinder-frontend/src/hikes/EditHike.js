import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import './EditHike.css';
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import Search from "../components/Search";
import ImageUpload from "./ImageUpload";



export default function EditHike() {
    
    const [hikeDate, changeHikeDate] = useState(new Date());
    const [level,setLevel] = useState("");
    let navigate = useNavigate();
    const { id } = useParams();
    
    const [allhikes, setAllHikes] = useState({
        trailName: "",
        areaName: "",
        walkable: "",
        bikeFriendly: "",
        distance: "",
        date: "",
        levels:""
    })
    const { trailName, areaName, walkable, bikeFriendly, distance, date,levels } = allhikes

    const [editHike, setEditHike] = useState({
        trailName: "",
        areaName: "",
        walkable: "",
        bikeFriendly: "",
        distance: "",
        date: "",
        levels:""
    })


    const onInputChange = (e) => {
        setAllHikes({ ...allhikes, [e.target.name]: e.target.value });
    }
    function changeValue(val) {
        changeHikeDate(val);
    }
    useEffect(() => {
        loadAllHikes();
    }, []);

    const loadAllHikes = async () => {
        const result = await axios.get(`http://localhost:8080/viewhike/${id}`);
        setAllHikes(result.data);
       
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const result= await axios.put(`http://localhost:8080/edithike/${allhikes.id}`,allhikes);
        console.log(result);
        //console.log('Selected Level:', level);
        navigate("/hikeslist")
    }
    const handleLevelChange = (e) => {
        setLevel(e.target.value);
      };
    
      /*const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Send selectedOption to the Spring Boot backend
        // You can use Axios, Fetch, or any other HTTP library for this
       await axios.put(`http:localhost:8080/edithike/${id}`, editHike,
          {
            headers:  {'Content-Type' : 'application/json'},
          },{
          body: JSON.stringify({ level }),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            // Handle success response from the backend
          })
          .catch(error => {
            console.error('Error:', error);
            // Handle error
          });
      };*/
      
     
    
  return(

    <div >
         <form onSubmit={(e) => {onSubmit(e)}}>
        <div className="section">
           
        
        <div className="center">
                        <Link type="submit" to="/hikeslist"className="btn btn-primary mx-2">Update</Link>
                        <Link className="btn btn-primary mx-2" to={`/viewhike/${allhikes.id}`}>Cancel</Link>

                        <Link className="btn btn-primary mx-2" to="/userhomepage">Back</Link>
                    </div><hr/>
                    
            <div className="center">
            <h1>Update Hike Details</h1>
                   
                        <div className="mb-3">
                        <label>Trail Name: </label>
                        <input

                            type={"text"}
                            autoComplete="off"
                            value={allhikes.trailName}
                            onChange={(e) => onInputChange(e)}
                            disabled={true}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Area Name: </label>
                        <input
                            type={"text"}
                            autoComplete="off"
                            value={allhikes.areaName}
                            onChange={(e) => onInputChange(e)}
                            disabled={true}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Walkable</label>
                        <input
                            type={"text"}
                            autoComplete="off"
                            value={allhikes.walkable}
                            onChange={(e) => onInputChange(e)}
                            disabled={true}
                        /></div>
                    <div className="mb-3">
                        <label>Bike Friendly</label>
                        <input
                            type={"text"}
                            autoComplete="off"
                            value={allhikes.bikeFriendly}
                            onChange={(e) => onInputChange(e)}
                            disabled={true}
                        /></div>
                    <div className="mb-3">
                        <label>Distance</label>
                        <input
                            type={"text"}
                            autoComplete="off"
                            value={allhikes.distance}
                            onChange={(e) => onInputChange(e)}
                            disabled={true}
                        /></div>
                    {/*<div className="mb-3">
                        <label>Date:</label>
                        <DatePicker
                        disabled={true}
                        multiple
                           minDate="1950/01/01"
                           maxDate="2100/01/01"
                           value={allhikes.date}
                           onChange={changeValue}
                           />   
                        </div>
                        <div className="mb-3">
                        <label>Level: </label>
                        <input

                            type={"text"}
                            autoComplete="off"
                            value={allhikes.levels}
                            onChange={(e) => onInputChange(e)}
                            disabled={true}
                        />
  </div>*/}
                
                    <hr/>
                    
                    <div>
                <ImageUpload/>
            </div>
                        
            </div>
           
        </div>
           </form>  
          </div>
  );
}