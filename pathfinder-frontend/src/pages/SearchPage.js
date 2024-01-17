import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarForHome from '../HomePage/NavbarForHome';
import { useNavigate } from 'react-router-dom';
import JSONDATA from '../data/MO_Trails_geo.json'

export default function Search() {
  const [trailDataArray, setTrailDataArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const dataArray = Array.isArray(JSONDATA.features) ? JSONDATA.features : [];
    setTrailDataArray(dataArray);
  }, [JSONDATA.features]); 

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setIsTyping(newSearchTerm.length > 0);
  };

  const handleTrailClick = () => {
    // Add logic to handle trail click, e.g., navigate to the Login page
    navigate('/login');
  };

  return (
    <div className='Search'>
    <NavbarForHome />
      <h2 className='featured-header'>Featured Trails</h2>

      <input type='text' placeholder= 'Search...' onChange={handleInputChange} className='search-input'/>
        {isTyping && trailDataArray.filter((val) => {
          const trailNameMatch =
            val.properties.TRAIL_NAME &&
            val.properties.TRAIL_NAME.toLowerCase().includes(searchTerm.toLowerCase())

            // const walkingMatch =
            // val.properties.WALKING &&
            // val.properties.WALKING.toLowerCase().includes(searchTerm.toLowerCase());

          const bikingMatch =
            val.properties.BIKING &&
            val.properties.BIKING.toLowerCase().includes(searchTerm.toLowerCase());

          return trailNameMatch || bikingMatch;
        }) 
        .map((val, key) => (
            <div key={key} className='trail' onClick={handleTrailClick}>
              <div className='trail-content'>
                <h3>{val.properties.TRAIL_NAME}</h3>
                <p className='biking-info'>Biking: {val.properties.BIKING}</p>
              </div>
            </div>
          ))}
    </div>
  );
}