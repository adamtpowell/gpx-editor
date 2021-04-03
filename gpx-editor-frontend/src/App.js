import './App.css';

import { SideBar } from './component/Sidebar';
import { Activities } from './component/Activities';
import { Inspector } from './component/Inspector';
import { Map } from './component/Map';

import { ActivityTree } from './ActivityTree';

// Load leaflet resources
import 'leaflet/dist/leaflet.css';

import React, { useState } from 'react';

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

function App() {
  let [activeElement, setActiveElement] = useState(0);
  
  return <main>
    <SideBar>
      <Activities activities={activity_tree} activeElement={activeElement} setActiveElement={setActiveElement} />
      <Inspector activities={activity_tree} activeElement={activeElement} />
    </SideBar>
    <Map activities={activity_tree} activeElement={activeElement} />
  </main>
  
}

export default App;
