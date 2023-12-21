import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import moTrailsData from '../data/MO_Trails_geo.json'

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpdHRpYWthc2F0dGkiLCJhIjoiY2xwenY1cmVtMTBzZDJrcW5yb2Y5cjRzNSJ9.SYzooukcLn0gjeS-VTjdgw';

export default function CreateHike() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-90.2);
  const [lat, setLat] = useState(38.6);
  const [selectedCoordinates, setSelectedCoordinates] = useState([0, 0]);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    else {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/chittiakasatti/clq45nc7s01a701p79yzjbjre',
        center: [lng, lat],
        zoom: zoom,
      });
    }

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on('click', (event) => {
      const features = map.current.queryRenderedFeatures(event.point, {
        layers: ['mo-trails-parsed']
      });
      if (!features.length) {
        return;
      }
      const feature = features[0];
      setSelectedCoordinates(feature.geometry.coordinates)

      const popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(
          `<h6>${feature.properties.TRAIL_NAME}</h6><p>${feature.properties.WALKING}</p>`
        )
        .addTo(map.current);
    });
  });

  return (
    <div>
      {/* <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div> */}
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}


