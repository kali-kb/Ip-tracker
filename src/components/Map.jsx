import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

function LeafletMap(props) {
  const mapRef = useRef(null);
  const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 });

  useEffect(() => {
    setLocation({lat:props.latitude, lng:props.longitude})
    if (mapRef.current && !mapRef.current._leaflet_id) {
      // Create a Leaflet map object centered on a location
      const map = L.map(mapRef.current).setView([location.lat, location.lng], 13);

      // Add a tile layer from OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18
      }).addTo(map);

      // Add a marker to the map
      const marker = L.marker([props.latitude, props.longitude]).addTo(map);

      // Add a popup to the marker
      marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

      // Assign the map instance to the mapRef
      mapRef.current = map;
    } else if (mapRef.current) {
      // If mapRef.current is already assigned with the map instance,
      // update its view using the setView method
      mapRef.current.setView([location.lat, location.lng], 13);
    }
  }, [props.latitude, props.longitude, location.lat, location.lng]);

  return (
    <div ref={mapRef}/>
  );
}

export default LeafletMap;
