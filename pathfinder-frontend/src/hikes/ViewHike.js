import axios from "axios";
import React, { useEffect,useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import './ViewHike.css'
import NavbarBS from "../layout/NavbarBS";
import Calendar from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import {FacebookShareButton,FacebookIcon,TwitterShareButton, TwitterIcon,PinterestShareButton,
    PinterestIcon,InstapaperIcon,InstapaperShareButton,EmailShareButton,EmailIcon} from "react-share";


export default function ViewHike() {
    
    const [hikeDate, changeHikeDate] = useState(new Date());
    const [feature, setFeature] = useState({});
    let navigate = useNavigate();
    const [allhikes, setAllHikes] = useState({
        trailName: "",
        areaName: "",
        walkable: "",
        bikeFriendly: "",
        distance: "",
        date: ""
      })
      const { trailName, areaName, walkable, bikeFriendly, distance, date } = allhikes
      
     
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
        const result=await axios.get(`http://localhost:8080/viewhike/${id}`);
        setAllHikes(result.data);
    }
    const deletehike=async (id)=>{
        const result=await axios.delete(`http://localhost:8080/deletehike/${id}`)
        setAllHikes(result.data);
        navigate("/userhomepage")
        }
        

    const {id}=useParams();

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.get(`http://localhost:8080/allhikes`);
        navigate("/userhomepage")
      };
      
  return(

    <div >
        <NavbarBS/>
        <div className="section">
            <div className="split-left">
            <h1>View Hike Details</h1>
                    
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
                        <div className="mb-3">
                        <label>Date:</label>
                        <Calendar onChange={changeValue} value={hikeDate} disabled={true}/>
                            
                        </div>
                                
                        <Link className="btn btn-primary mx-2" to={`/edithike/${id}`}>Edit</Link>
                   
                    <button className='btn btn-primary mx-3'onClick={()=>deletehike(allhikes.id)}>Delete</button>

                    <Link className="btn btn-primary mx-2" to="/userhomepage">Cancel</Link>
        
              
                
                <div class="box-share">
                <h3 className="headind3">Share:</h3>
                    <FacebookShareButton
                        url="https://www.facebook.com/groups/hikingforadventure">
                            <FacebookIcon size ={40} round={true} color="#4968ad"/>
                    </FacebookShareButton>&nbsp;
                    <TwitterShareButton url="https://twitter.com/TheHikingGuide">
                        <TwitterIcon size={40} round={true} />
                    </TwitterShareButton>&nbsp;
                    {/*<PinterestShareButton url="">
                    <PinterestIcon size={40} round={true} />
  </PinterestShareButton>&nbsp;*/}
                    <InstapaperShareButton url="https://www.instagram.com/hiking.guide/">
                    <InstapaperIcon size={40} round={true} />
                    </InstapaperShareButton>&nbsp;
                    <EmailShareButton url ="">
                    <EmailIcon size={40} round={true} />
                    </EmailShareButton>
                </div><br/>
                <div className="split-right">
                    <div class="box-share">
                        <h3 className="headind3">Reviews:</h3>
                

                    </div>
                </div>
            </div>
        
        </div>
        
    </div>
  );
}