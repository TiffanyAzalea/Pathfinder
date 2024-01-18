import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import './ViewHike.css'
import NavbarBS from "../layout/NavbarBS";
import Calendar from "react-multi-date-picker";
import {
    FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, PinterestShareButton,
    PinterestIcon, InstapaperIcon, InstapaperShareButton, EmailShareButton, EmailIcon
} from "react-share";


export default function ViewHike() {

    const [hikeDate, changeHikeDate] = useState(new Date());
    const [feature, setFeature] = useState({});
    let navigate = useNavigate();
    const [comment, setComment] = useState();
  const [allComments, setAllComments] = useState();
  let newDate = new Date()

    const [allhikes, setAllHikes] = useState({
        trailName: "",
        areaName: "",
        walkable: "",
        bikeFriendly: "",
        distance: "",
        date: ""
    })
    const { trailName, areaName, walkable, bikeFriendly, distance, date } = allhikes

    const submitComment = async function (e) {
        e.preventDefault();
    
        await axios.post("http://localhost:8080/comments", {
          trailName: feature.properties.TRAIL_NAME,
          text: comment,
          createdBy: 102,
          createdDate: new Date().toLocaleDateString()
        })
    
        axios.get("http://localhost:8080/comments/" + feature.properties.TRAIL_NAME)
          .then((response) => {
            setAllComments(response.data);
          })
          .catch(error => console.log(error))
      }
      const onChangeComment = (e) => {
        setComment(e.target.value);
      }
    
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
    const deletehike = async (id) => {
        const result = await axios.delete(`http://localhost:8080/deletehike/${id}`)
        setAllHikes(result.data);
        navigate("/userhomepage")
    }


    const { id } = useParams();

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.get(`http://localhost:8080/allhikes`);
        navigate("/userhomepage")
    };

    return (

        <div >
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
                        <Calendar onChange={changeValue} value={hikeDate} disabled={true} />

                    </div>

                    <Link className="btn btn-primary mx-2" to={`/edithike/${id}`}>Edit</Link>

                    <button className='btn btn-primary mx-3' onClick={() => deletehike(allhikes.id)}>Delete</button>

                    <Link className="btn btn-primary mx-2" to="/userhomepage">Cancel</Link>



                    <div className="box-share">
                        <h3 className="headind3">Share:</h3>
                        <FacebookShareButton
                            url="https://www.facebook.com/groups/hikingforadventure">
                            <FacebookIcon size={40} round={true} color="#4968ad" />
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
                        <EmailShareButton url="">
                            <EmailIcon size={40} round={true} />
                        </EmailShareButton>
                    </div><br />
                    <div className="split-right">
                    <div className="row">
            <div className="col">
              <div class="card">
                <div class="card-body">
                    <div className='comments'>
                        <h3 className="headind3">Photos:</h3>
                      </div>
                      </div>
                      </div></div></div>
            <div className="row">
            <div className="col">
              <div class="card">
                <div class="card-body">
                  <form onSubmit={(e) => submitComment(e)}>
                    <div className='comments'>

                      <div class="mb-3">
                        <label for="commentArea" class="form-label">Trail comments</label>
                        <textarea class="form-control" id="commentArea" rows="3" onChange={(e) => onChangeComment(e)}></textarea>
                      </div>
                      <button className="btn btn-primary" type='submit'>Comment</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="row">
        <div className='col comments'>
          <h6>Comments:</h6>
          {allComments?.map((comment, index) => (
            <div key={index}>
              <h6>{comment.createdBy.firstName} {comment.createdBy.lastName} - {comment.createdDate}</h6>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
          </div>
        </div>
        
      </div>
      

    </div>


                        </div>
                 
               
    );
}