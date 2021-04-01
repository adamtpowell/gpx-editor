import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, Circle, CircleMarker, Rectangle, Polygon } from 'react-leaflet'

// Load leaflet resources
import { Icon } from 'leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import 'leaflet/dist/leaflet.css';

import React, { useState } from 'react';

function CustomMarker(props) {
  return <Marker position={props.position} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
    <Popup>{props.popupContent}</Popup>
  </Marker>
}

const center = [51.505, -0.09]

const polyline = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.12],
]

const purpleOptions = { color: 'purple' }

function App() {
  return <MapContainer style={{height: "100vh"}}center={center} zoom={13} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Polyline pathOptions={purpleOptions} positions={polyline} />
  </MapContainer>
}

export default App;
