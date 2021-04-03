import './App.css';

import { SideBar } from './component/Sidebar';
import { Activities } from './component/Activities';
import { Inspector } from './component/Inspector';
import { Map } from './component/Map';

import { mock_activities} from "./MockData";

// Load leaflet resources
import 'leaflet/dist/leaflet.css';

import React, { useState, useReducer } from 'react';

function App() {
  let [activeElement, setActiveElement] = useState(0);

  function activitiesReducer(activities, action) {
    let cloned_metadata = activities.clone(); // Clone the activities data structure.
    
    cloned_metadata.getActivityById(action.activity_id).metadata[action.field] = action.value;
    Object.freeze(cloned_metadata); // Prevent further changes.
    
    return cloned_metadata;
  }

  let [activities, dispatchActivitiesAction] = useReducer(activitiesReducer, mock_activities);
  
  function update_metadata(activity_id, field, value) {
    let action = {
      type: "set",
      activity_id,
      field,
      value
    }
    
    dispatchActivitiesAction(action);
  }
  
  return <main>
    <SideBar>
      <Activities activities={activities} activeElement={activeElement} setActiveElement={setActiveElement} />
      <Inspector activities={activities} activeElement={activeElement} updateMetadata={update_metadata} />
    </SideBar>
    <Map activities={activities} activeElement={activeElement} />
  </main>
  
}

export default App;
