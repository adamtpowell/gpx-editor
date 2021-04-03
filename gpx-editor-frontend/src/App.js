import './App.css';

import { SideBar } from './component/Sidebar';
import { Activities } from './component/Activities';
import { Inspector } from './component/Inspector';
import { Map } from './component/Map';

import { mock_activities} from "./MockData";

// Load leaflet resources
import 'leaflet/dist/leaflet.css';

import React, { useState } from 'react';

function App() {
  let [activeElement, setActiveElement] = useState(0);
  
  return <main>
    <SideBar>
      <Activities activities={mock_activities} activeElement={activeElement} setActiveElement={setActiveElement} />
      <Inspector activities={mock_activities} activeElement={activeElement} />
    </SideBar>
    <Map activities={mock_activities} activeElement={activeElement} />
  </main>
  
}

export default App;
