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
  const [trailName, setTrailName] = useState();
  const [allComments, setAllComments] = useState();
  const [filteredTrailResults, setFilteredTrailResults] = useState([]); //TH
  let newDate = new Date()

  const handleSearchResults = (results) => {
    setFilteredTrailResults(results); // Filtered trail results
    // You may want to update the map results as well if needed
    // setFilteredMapResults(results);
  };

  const onChangeComment = (e) => {
    setComment(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (feature && feature.properties) {
      await axios.post("http://localhost:8080/createhike", {
        trailName: feature.properties.TRAIL_NAME,
        areaName: feature.properties.AREA_NAME,
        walkable: feature.properties.WALKING,
        bikeFriendly: feature.properties.BIKING,
        distance: feature.properties.GIS_MILES.toFixed(2),
        date: hikeDate.toLocaleDateString()
    })
    navigate("/userhomepage")
  } else {
    console.error("Feature or its properties are undefined");
  }
  };
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
          const clickedFeature = features[0];
          const isFilteredTrail = filteredTrailResults.some(
            (result) => result.properties.TRAIL_NAME === clickedFeature.properties.TRAIL_NAME
          );

          if (isFilteredTrail) {
            setFeature(clickedFeature);
            axios.get("http://localhost:8080/comments/" + clickedFeature.properties.TRAIL_NAME)
              .then((response) => {
                setAllComments(response.data);
              })
              .catch(error => console.log(error))

            const popup = new mapboxgl.Popup({ offset: [0, -15] })
              .setLngLat(clickedFeature.geometry.coordinates)
              .setHTML(
                `<h6>${clickedFeature.properties.TRAIL_NAME}</h6>
                <p style="margin-bottom: 0" >${clickedFeature.properties.AREA_NAME}</p>
                <p style="margin-bottom: 0" >${clickedFeature.properties.WALKING}</p>
                <p style="margin-bottom: 0" >${clickedFeature.properties.BIKING}</p>
                <p style="margin-bottom: 0" >${Math.round(feature.properties.GIS_MILES * 100) / 100} miles</p>
              `
              )
              .addTo(map.current);
          }
        }
      });
    }
  }, [lng, lat, zoom, map, mapContainer, filteredTrailResults, setFeature, setAllComments]);

  // Calendar code
  function changeValue(val) {
    changeHikeDate(val);
  }

  return (
    <div>
      <Search onSearchResults={handleSearchResults} />
      <div className='homepagebutton'>
        <Link className="btn btn-primary" to="/userhomepage">Home page</Link>
      </div>

      <div ref={mapContainer} className="map-container" />
      <div className='split middle'>
        <h1>Trail Details</h1>
        {Object.keys(feature).length || (filteredTrailResults.length > 0) ? (
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='hike-details-table'>
              <h6>{feature.properties?.TRAIL_NAME || filteredTrailResults[0]?.properties?.TRAIL_NAME}</h6>
              <p>{feature.properties?.AREA_NAME || filteredTrailResults[0]?.properties?.AREA_NAME}</p>
              <p>{feature.properties?.WALKING || filteredTrailResults[0]?.properties?.WALKING}</p>
              <p>{feature.properties?.BIKING || filteredTrailResults[0]?.properties?.BIKING}</p>
              <p>{feature.properties?.GIS_MILES ? Math.round(feature.properties.GIS_MILES * 100) / 100 + ' miles' : 'N/A'}</p>
              <p>{hikeDate.toLocaleDateString()}</p>
            </div>
            <button className="btn btn-primary" type='submit' value={"createHike"}>Create Hike</button>
          </form>
        ) : (
          <div> </div>
        )}
      </div>

      <div className='calendar'>
        <Calendar onChange={changeValue} value={hikeDate} />
        <p>The selected date is - {hikeDate.toLocaleDateString()}</p>
      </div>

      <form onSubmit={(e) => submitComment(e)}>
        <div className='comments'>
          <textarea style={{ width: '30%', borderRadius: '0.25em' }} onChange={(e) => onChangeComment(e)}></textarea>
          <button type='submit'>Comment</button>
        </div>
      </form>

      <div className='comments'>
        <h6>Comments:</h6>
        {allComments?.map((comment, index) => (
          <div key={index}>
            <h6>{comment.createdBy.firstName} {comment.createdBy.lastName} - {comment.createdDate}</h6>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
