import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Input } from 'semantic-ui-react';

export default function Posts() {
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    // Assuming MO_Trails_geo.json is in the 'public/data' directory
    axios.get(`${process.env.PUBLIC_URL}/data/MO_Trails_geo.json`)
      .then((response) => {
        setAPIData(response.data.features);
        setFilteredResults(response.data.features);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== '') {
      const filteredData = APIData.filter((item) => {
        return Object.values(item.properties).join('').toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Input
        icon='search'
        placeholder='Search...'
        onChange={(e) => searchItems(e.target.value)}
      />
      <Card.Group itemsPerRow={3} style={{ marginTop: 20 }}>
        {filteredResults.map((item, index) => (
          <Card key={index}>
            <Card.Content>
              <Card.Header>{item.properties.TRAIL_NAME}</Card.Header>
              <Card.Description>
                {item.properties.AREA_NAME}
              </Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>


        </div>
    
    )
}