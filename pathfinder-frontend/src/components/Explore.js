import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import "react-calendar/dist/Calendar.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Explore.css';

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
 
  const onSubmit = async (e) => {
    e.preventDefault();
    
    await axios.post("http://localhost:8080/createhike", {
      trailName: feature.properties.TRAIL_NAME,
      areaName: feature.properties.AREA_NAME,
      walkable: feature.properties.WALKING,
      bikeFriendly: feature.properties.BIKING,
      distance: feature.properties.GIS_MILES.toFixed(2),
      date: hikeDate.toLocaleDateString()
    })
    navigate("/allhikes")

  }

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
          layers: ['mo-trails-parsed']
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
          <p style="margin-bottom: 0" >${Math.round(feature.properties.GIS_MILES * 100) / 100} miles</p>
          
          
          `

          )
        
      });
    }
  });


  

  return (
    
    <div>
     
      <div id='map'ref={mapContainer} className="map-containers" />
      <br></br><form onSubmit={(e) => onSubmit(e)}>
<div> <button to='/viewhike' type='submit' value={"createHike"}>Create Hike</button>
</div>
</form>



      
    </div>
  );
}