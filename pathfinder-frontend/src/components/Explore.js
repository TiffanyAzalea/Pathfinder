import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "react-calendar/dist/Calendar.css";
import { Link, useNavigate } from 'react-router-dom';
import './Explore.css';
import NavbarForHome from '../HomePage/NavbarForHome';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpdHRpYWthc2F0dGkiLCJhIjoiY2xwenY1cmVtMTBzZDJrcW5yb2Y5cjRzNSJ9.SYzooukcLn0gjeS-VTjdgw';

export default function Explore() {
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
  const [trailName, setTrailName] = useState();
  const [allComments, setAllComments] = useState();
  let newDate = new Date()


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
    //   date: hikeDate.toLocaleDateString()
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
    })
    navigate("/userhomepage")
  }

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


  useEffect(() => {
    if (map.current === null) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/chittiakasatti/clq45nc7s01a701p79yzjbjre',
        center: [lng, lat],
        zoom: zoom,
      });


      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });


      map.current.on('click', (event) => {
        const features = map.current.queryRenderedFeatures(event.point, {
          layers: ['mo-trails-parsed-filtered']
        });
        if (features.length > 0) {
          const feature = features[0];
          //setSelectedCoordinates(feature.geometry.coordinates)
          setFeature(feature);
          axios.get("http://localhost:8080/comments/" + feature.properties.TRAIL_NAME)
            .then((response) => {
              setAllComments(response.data);
            })
            .catch(error => console.log(error))
          }
          })
        }
  });
  return(
    <div className='section'>
      <NavbarForHome/>
      
      <div ref={mapContainer} className="map-containers" />
     
      <br/>
      <span>Click on the link to <Link to="/login">Create Hike</Link></span>
       
    </div>

  );
}