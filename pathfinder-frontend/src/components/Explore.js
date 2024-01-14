import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "react-calendar/dist/Calendar.css";
import { Link, useNavigate } from 'react-router-dom';
import './Explore.css';
import NavbarForHome from '../HomePage/NavbarForHome';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpdHRpYWthc2F0dGkiLCJhIjoiY2xwenY1cmVtMTBzZDJrcW5yb2Y5cjRzNSJ9.SYzooukcLn0gjeS-VTjdgw';

export default function Explore() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-90.2);
  const [lat, setLat] = useState(38.6);
  
  const [zoom, setZoom] = useState(9);
  
  const [feature, setFeature] = useState({});

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

      })
    }
    });
  return(
    <div className='section'>
      <NavbarForHome/>
      
      <div ref={mapContainer} className="map-explore" />
     
      <br/>
      <span>Click on the link to <Link to="/login">Create Hike</Link></span>
       
    </div>

  );
}