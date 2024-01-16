import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import moTrailsData from '../data/MO_Trails_geo.json';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Search from '../components/Search'
import NavbarBS from '../layout/NavbarBS';

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
  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (feature && feature.properties) {
      const { TRAIL_NAME, AREA_NAME, WALKING, BIKING, GIS_MILES } = feature.properties;
  
      await axios.post("http://localhost:8080/createhike", {
        trailName: TRAIL_NAME || "",
        areaName: AREA_NAME || "",
        walkable: WALKING || "",
        bikeFriendly: BIKING || "",
        distance: (GIS_MILES || 0).toFixed(2),
        date: hikeDate.toLocaleDateString() || ""
      });
  
      navigate("/userhomepage");
    } else {
      // Handle the case where feature or its properties are undefined/null
      console.error("Cannot submit, feature or its properties are undefined or null");
    }

  }

  const [filteredTrailResults, setFilteredTrailResults] = useState([]);

  const handleSearchResults = (results) => {
    setFilteredTrailResults(results);
  };

  useEffect(() => {
    if (!map.current) {
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
        console.log(map.current.getStyle().layers)
      });


      map.current.on('click', (event) => {
        const features = map.current.queryRenderedFeatures(event.point, {
          layers: ['mo-trails-parsed-filtered']
        });
        if (!features.length) {
          return;
        }
        const feature = features[0];
        //setSelectedCoordinates(feature.geometry.coordinates)
        setFeature(feature);

        const popup = new mapboxgl.Popup({ offset: [0, -15] })
          .setLngLat(feature.geometry.coordinates)
          .setHTML(
            `<h6>${feature.properties.TRAIL_NAME}</h6>
          <p style="margin-bottom: 0" >${feature.properties.AREA_NAME}</p>
          <p style="margin-bottom: 0" >${feature.properties.WALKING}</p>
          <p style="margin-bottom: 0" >${feature.properties.BIKING}</p>
          <p style="margin-bottom: 0" >${Math.round(feature.properties.GIS_MILES * 100) / 100} miles</p> `
          )
          .addTo(map.current);
        <h1>Trail Details</h1>
      });
    }
  }, [filteredTrailResults] );


  // Calender code
  function changeValue(val) {
    changeHikeDate(val);
  }

  return (
    
    <div className='section'>
    <NavbarBS/>
    <div className='hero-container'>
    <div className='homepagebutton'>
    <Search />  
    <Link className="btn btn-primary" to="/userhomepage">Home page</Link>
    </div>
    {/* <div className="sidebar">
      Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
    </div> */}
    
    <div ref={mapContainer} className="map-container" />
    <div className='split middle'>
     
      {Object.keys(feature).length || (filteredTrailResults.length > 0) ? (
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='hike-details-table'>
          <h1>Trail Details</h1>
            <h6 value={trailName} onChange={(e) => onInputChange(e)}>{feature.properties?.TRAIL_NAME || filteredTrailResults[0]?.properties?.TRAIL_NAME}</h6>
            <p value={areaName} onChange={(e) => onInputChange(e)}>{feature.properties?.AREA_NAME || filteredTrailResults[0]?.properties?.AREA_NAME}</p>
            <p value={walkable} onChange={(e) => onInputChange(e)}>{feature.properties?.WALKING || filteredTrailResults[0]?.properties?.WALKING}</p>
            <p value={bikeFriendly} onChange={(e) => onInputChange(e)}>{feature.properties?.BIKING || filteredTrailResults[0]?.properties?.BIKING}</p>
            <p value={distance} onChange={(e) => onInputChange(e)}>{(feature.properties?.GIS_MILES || filteredTrailResults[0]?.properties?.GIS_MILES)?.toFixed(2)} miles</p>
            <p value={date} onChange={(e) => onInputChange(e)}>{hikeDate.toLocaleDateString()}</p>
          </div>
          <button className="btn btn-primary" type='submit' value={"createHike"}>Create Hike</button>
        </form>
        //<LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <div> </div>
      )}
      {/* <button type='submit' value={"createHike"}>Create Hike</button> */}

    </div>

    <div className='calendar'>
      <Calendar onChange={changeValue} value={hikeDate} />
      <p>The selected date is - {hikeDate.toLocaleDateString()}</p>
    </div>
  </div>
  </div>
);
}