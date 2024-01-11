import axios from "axios";
import React, { useEffect,useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import './EditHike.css'
import NavbarBS from "../layout/NavbarBS";
import Calendar from "react-calendar";


export default function ViewHike() {
    const [allhikes, setAllHikes] = useState([]);
    const [hikeDate, changeHikeDate] = useState(new Date());
    const [feature, setFeature] = useState({});
    let navigate = useNavigate();
    const [hike, setHike] = useState({
        trailName: "",
        areaName: "",
        walkable: "",
        bikeFriendly: "",
        distance: "",
        date: ""
      })
      const { trailName, areaName, walkable, bikeFriendly, distance, date } = hike
     
    const onInputChange = (e) => {

    }
    function changeValue(val) {
        changeHikeDate(val);
      }
    useEffect(() => {
        loadAllHikes();
    }, []);

    const loadAllHikes = async () => {
        const result = await axios.get("http://localhost:8080/allhikes");
        setAllHikes(result.data);
    }
    const deletehike=async (id)=>{
        await axios.delete(`http://localhost:8080/deletehike/${id}`)
        loadAllHikes();
    }

      useEffect(()=>{
        loadAllHikes()
    },[])
    const {id}=useParams();

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.get(`http://localhost:8080/viewhike/${id}`,{
            trailName: feature.properties.TRAIL_NAME,
            areaName: feature.properties.AREA_NAME,
            walkable: feature.properties.WALKING,
            bikeFriendly: feature.properties.BIKING,
            distance: feature.properties.GIS_MILES.toFixed(2),
            date: hikeDate.toLocaleDateString()
          });
        navigate("/createhike");
      };
  return(

    <div >
        <NavbarBS/>
        <div className="section">
            <div className="split-left">
            <h1>View Hike Details</h1>
                <form onSubmit={(e) => onSubmit(e)}>
                    
                        <div className="mb-3">
                        <label>Trail Name: </label>
                            <input 
                            
                                type={"text"}
                            autoComplete="off"
                                value={hike.trailName}
                                onChange={(e) => onInputChange(e)}
                        />
                        </div>
                        <div className="mb-3">
                        <label>Area Name: </label>
                            <input 
                                type={"text"}
                                autoComplete="off"
                                value={hike.areaName}
                                onChange={(e) => onInputChange(e)}
                        />
                        </div>
                        <div className="mb-3">
                        <label>Walkable</label>
                            <input 
                                type={"text"}
                                autoComplete="off"
                                value={hike.walkable}
                                onChange={(e) => onInputChange(e)}
                        /></div>
                        <div className="mb-3">
                        <label>Bike Friendly</label>
                            <input 
                                type={"text"}
                                autoComplete="off"
                                value={hike.bikeFriendly}
                                onChange={(e) => onInputChange(e)}
                        /></div>
                        <div className="mb-3">
                        <label>Distance</label>
                            <input 
                                type={"text"}
                                autoComplete="off"
                                value={hike.distance}
                                onChange={(e) => onInputChange(e)}
                        /></div>
                        <div className="mb-3">
                        <label>Date:</label>
                            <input 
                                type={"text"}
                                autoComplete="off"
                                value={hikeDate.toLocaleDateString()}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                                
                    <button type="submit" className="button">Edit</button>
                    <button to='/allhikes'className='btn-button mx2'onClick={()=>deletehike(hike.id)}>Delete</button>

                    <button type="submit" className="button1 mx-2">Cancel</button>
                </form>
            <div>
                <h3 className="headind3">Comments:</h3>
               

            </div>
            </div>
            <div className="split-right" >
                <h1>Save the date!</h1>
                <h9 className='display'>The selected date is- {hikeDate.toLocaleDateString()}</h9>
        
                <Calendar onChange={changeValue} value={hikeDate} />

            </div>
        </div>
        
    </div>
  );
}