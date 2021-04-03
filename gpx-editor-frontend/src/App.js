import './App.css';

import { SideBar } from './component/Sidebar';
import { Activities } from './component/Activities';
import { Inspector } from './component/Inspector';

import { ActivityTree } from './ActivityTree';

import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

// Load leaflet resources
import 'leaflet/dist/leaflet.css';

import React, { useState } from 'react';

const center = [51.505, -0.09]

const polyline = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.12],
]

let activity_tree = new ActivityTree([
  {
    id: 0,
    type: "activity",
    metadata: {
      name: "Root"
    },
    children: [ 1, 3 ]
  },
  {
    id: 1,
    type: "activity",
    metadata: {
      name: "NH Trip",
      date: "2021-03-03"
    },
    children: [ 2 ]
  },
  {
    id: 3,
    type: "activity",
    metadata: {
      name: "East Coast Greenway",
    },
    children: []
  },
  {
    id: 2,
    type: "path",
    data: {
      path: polyline
    },
    metadata: {
      name: "Sugarloaf hike",
    },
    children: []
  }
]);

const purpleOptions = { color: 'purple' }

function renderMapItems(activity_tree, activeElement) {
  // belowActive is set once activeElement is reached, everything below activeElement is drawn.
  let renderSubtree = (node, activeElement, belowActive) => {
    let mapitems = [];
    if (node.id === activeElement) {
      belowActive = true;
    }

    if (belowActive) {
      switch (node.type) {
        case "path":
          mapitems.push(<Polyline key={node.id} pathOptions={purpleOptions} positions={node.data.path} />)
          break;
        default:
          break;
      }
    }
    
    for (let child of node.getChildren()) {
      mapitems = mapitems.concat(renderSubtree(child, activeElement, belowActive));
    }
    
    return mapitems;
  }
  
  return renderSubtree(activity_tree.getRoot(), activeElement, false);
}

function App() {
  let [activeElement, setActiveElement] = useState(0);
  
  let mapitems = renderMapItems(activity_tree, activeElement);

  return <main>
    <SideBar>
      <Activities activities={activity_tree} activeElement={activeElement} setActiveElement={setActiveElement} />
      <Inspector activities={activity_tree} activeElement={activeElement}/>
    </SideBar>
    <MapContainer style={{height: "100vh"}} center={center} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mapitems}
    </MapContainer>
  </main>
  
}

export default App;
