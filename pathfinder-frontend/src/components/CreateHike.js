import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import moTrailsData from '../data/MO_Trails_geo.json';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import NavbarBS from '../layout/NavbarBS';
import Search from '../components/Search'

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpdHRpYWthc2F0dGkiLCJhIjoiY2xwenY1cmVtMTBzZDJrcW5yb2Y5cjRzNSJ9.SYzooukcLn0gjeS-VTjdgw';

export default function CreateHike() {
  let navigate = useNavigate()
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-90.2);
  const [lat, setLat] = useState(38.6);
  const [selectedCoordinates, setSelectedCoordinates] = useState([0, 0]);
  const [zoom, setZoom] = useState(9);
  const [hikeDate, changeHikeDate] = useState(new Date());
  const [feature, setFeature] = useState({});
  const [comment, setComment] = useState();
  const [userId, setUserId] = useState();
  const [allComments, setAllComments] = useState();


  const onChangeComment = (e) => {
    setComment(e.target.value);
  }

  const onInputChange = (e) => {

  }
  const onSubmit = async (e) => {
    e.preventDefault();
    // await setHike({
    //   trailName: feature.properties.TRAIL_NAME,
    //   areaName: feature.properties.AREA_NAME,
    //   walkable: feature.properties.WALKING,
    //   bikable: feature.properties.BIKING,
    //   distance: feature.properties.GIS_MILES,
    //   date: hikeDate.toLocaleDateString()g
    // })
    // console.log(hike);
    console.log(hikeDate)
    await axios.post("http://localhost:8080/createhike", {
      trailName: feature.properties.TRAIL_NAME,
      areaName: feature.properties.AREA_NAME,
      walkable: feature.properties.WALKING,
      bikeFriendly: feature.properties.BIKING,
      distance: feature.properties.GIS_MILES.toFixed(2),
      date: hikeDate,
      user: userId
    })
    navigate("/userhomepage")
  }
  //Added for Search functionality
  const handleSearchResults = (results) => {
    if (results.length > 0) {
      setFeature(results[0]);
      if (results[0].properties) {
        axios.get("http://localhost:8080/comments/" + results[0].properties.TRAIL_NAME)
          .then((response) => {
            setAllComments(response.data);
          })
          .catch(error => console.log(error));
      }
    }
  };

  const submitComment = async function (e) {
    e.preventDefault();

    await axios.post("http://localhost:8080/comments", {
      trailName: feature.properties.TRAIL_NAME,
      text: comment,
      createdBy: userId,
      createdDate: new Date().toLocaleDateString()
    })

    axios.get("http://localhost:8080/comments/" + feature.properties.TRAIL_NAME)
      .then((response) => {
        setAllComments(response.data);
      })
      .catch(error => console.log(error))
  }


  useEffect(() => {
    if (map.current === null) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/chittiakasatti/clq45nc7s01a701p79yzjbjre',
        center: [lng, lat],
        zoom: zoom,
      });

      const username = localStorage.getItem("user");
      axios.get("http://localhost:8080/user/" + username).then(res => {
        setUserId(res.data.id);
      })


      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });


      map.current.on('click', (event) => {
        const features = map.current.queryRenderedFeatures(event.point, {
          layers: ['mo-trails-parsed-filtered']
        });
        if (features.length > 0) { //Added for Search functionality
          const feature = features[0];
          //setSelectedCoordinates(feature.geometry.coordinates)
          setFeature(feature);
          axios.get("http://localhost:8080/comments/" + feature.properties.TRAIL_NAME)
            .then((response) => {
              setAllComments(response.data);
            })
            .catch(error => console.log(error));



          const popup = new mapboxgl.Popup({ offset: [0, -15] })
            .setLngLat(feature.geometry.coordinates)
            .setHTML(
              `<h6>${feature.properties.TRAIL_NAME}</h6>
              <p style="margin-bottom: 0" >${feature.properties.AREA_NAME}</p>
              <p style="margin-bottom: 0" >${feature.properties.WALKING}</p>
              <p style="margin-bottom: 0" >${feature.properties.BIKING}</p>
              <p style="margin-bottom: 0" >${Math.round(feature.properties.GIS_MILES * 100) / 100} miles</p>
          `
            )
            .addTo(map.current);
        }
      });
    }
  });


  // Calender code
  function changeValue(e) {
    e.preventDefault();
    changeHikeDate(e.target.value);
  }

  return (<div>

    <div className="container">
      <Search onSearchResults={handleSearchResults} />

      <div className="row">
        <div className='homepagebutton col'>
          <Link className="btn btn-primary" to="/userhomepage">Home page</Link>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <div className="card" style={{ height: 350 + "px" }}>
                <div className="card-body">
                  {feature && feature.properties ? (
                    <form onSubmit={(e) => onSubmit(e)}>
                      <div className='hike-details-table'>
                        <h5 className="card-title">{feature.properties.TRAIL_NAME}</h5>
                        <p className="card-text">{feature.properties.AREA_NAME}</p>
                        <p className="card-text">{feature.properties.WALKING}</p>
                        <p className="card-text">{feature.properties.BIKING}</p>
                        <p className="card-text">{Math.round(feature.properties.GIS_MILES * 100) / 100} miles</p>
                        <input type='date' onChange={changeValue} value={hikeDate} className='form-control mb-6' />
                      </div>
                      <button className="btn btn-primary mt-3" type='submit' value={"createHike"}>Create Hike</button>
                    </form>
                  ) : (
                    <div>
                      <h5 className="card-title">Please select a hike marker in map</h5>
                    </div>
                  )}
                  {/* <div className='calendar'>
                <Calendar onChange={changeValue} value={hikeDate} />
                <p>The selected date is - {hikeDate.toLocaleDateString()}</p>
              </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={(e) => submitComment(e)}>
                    <div className='comments'>

                      <div className="mb-3">
                        <label for="commentArea" className="form-label">Trail comments</label>
                        <textarea className="form-control" id="commentArea" rows="3" onChange={(e) => onChangeComment(e)}></textarea>
                      </div>
                      <button className="btn btn-primary" type='submit'>Comment</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div ref={mapContainer} className="map-container" />
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
  );
}







