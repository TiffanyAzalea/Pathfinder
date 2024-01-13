import React, { useState, useEffect } from 'react';
import axios from 'axios';

import JSONDATA from '../data/MO_Trails_geo.json'

export default function Search() {
  const [trailDataArray, setTrailDataArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    const dataArray = Array.isArray(JSONDATA.features) ? JSONDATA.features : [];
    setTrailDataArray(dataArray);
  }, [JSONDATA.features]); 


  return (
    <div className='Search'>
      <input type='text' placeholder= 'Search...' onChange={(event) => {
        setSearchTerm(event.target.value);
        }}
      />
        {trailDataArray
        .filter((val) => {
          if (!searchTerm) {
            return true;
          } else if (
            val.properties.TRAIL_NAME &&
            val.properties.TRAIL_NAME.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return true;
          }
          return false;
        }).map((val, key) => {
          return (
            <div key={key} className= 'trail'>
              <p>{val.properties.TRAIL_NAME}</p>
            </div>
          );  
      })}


    </div>
    
    )
}