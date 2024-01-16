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


export default function EditHike() {
    
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
        await axios.post(`http://localhost:8080/allhikes`);
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
                                
                        <button type="submit" className="btn btn-primary  mx-3">Edit</button>
                   
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
            <div class="box-share">
                <h3 className="headind3">Reviews:</h3>
                

            </div>
            </div>
            <div className="split-right" >
                <h2>Edit Suggestions</h2>
               <div className="box-share">
                    <h3 className="headind3">Route type: </h3>
                    <input type ="radio" name="topping" value="loop" id="loop"/>
                    <label htmlFor="loop"  className="mx-2">loop</label>
                    <input type ="radio" name="topping" value="out&back" id="out&back" />
                    <label htmlFor="out&back"  className="mx-2">out&back</label>
                    <input type ="radio" name="topping" value="point-to-point" id="point-to-point" />
                    <label htmlFor="point-to-point"  className="mx-2">point-to-point</label>
                </div>    <br/>
                <div className="box-share">
                    <h3 className="headind3">Level:</h3>
                    <input type ="radio" name="topping" value="easy" id="easy"/>
                    <label htmlFor="easy"  className="mx-2">easy</label>
                    <input type ="radio" name="topping" value="moderate" id="moderate" />
                    <label htmlFor="moderate"  className="mx-2">moderate</label>
                    <input type ="radio" name="topping" value="difficulty" id="difficulty" />
                    <label htmlFor="difficulty"  className="mx-2">difficulty</label>
                </div><br/>
                <div className="box-share">
                    <h3 className="headind3">Usage:</h3>
                    <input type ="radio" name="topping" value="light" id="light"/>
                    <label htmlFor="easy"  className="mx-2">light</label>
                    <input type ="radio" name="topping" value="moderate" id="moderate" />
                    <label htmlFor="moderate"  className="mx-2">moderate</label>
                    <input type ="radio" name="topping" value="heavy" id="heavy" />
                    <label htmlFor="heavy"  className="mx-2">heavy</label>
                </div>            
            </div>
        </div>
        
    </div>
  );
}