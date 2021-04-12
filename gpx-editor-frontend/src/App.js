import './App.css';

import { SideBar } from './component/Sidebar';
import { Activities } from './component/Activities';
import { Inspector } from './component/Inspector';
import { Map } from './component/Map';

import { mock_activities} from "./MockData";

// Load leaflet resources
import 'leaflet/dist/leaflet.css';

import React, { useState } from 'react';

// Like use reducer, but with speculative and concrete stages.
function useSpeculativeReducer(initialState, speculativeReducer, concreteGetter, concreteReducer) {
  let [state, setState] = useState(initialState);

 const reducer = function(state, action) {
  if (concreteReducer !== undefined) {
    concreteReducer = concreteReducer.bind(this, state, action);
  }
  if (concreteReducer !== undefined && concreteGetter !== undefined) {
    concreteGetter = concreteGetter.bind(this, state, action, concreteReducer);
  }

  const speculativeReducerValue = speculativeReducer(state, action);
  if (speculativeReducerValue !== undefined) {
    Object.freeze(speculativeReducerValue);
    setState(speculativeReducerValue);
  }
 }

 const boundReducer = reducer.bind(this, state); // Bind state to reducer so you only need to call with action.

  return [state, boundReducer];
}

function App() {
  let [activeElement, setActiveElement] = useState(0);

  let [activities, dispatchActivitiesAction] = useSpeculativeReducer(mock_activities, 
    function(activities, action) {
      let cloned_metadata = activities.clone(); // Clone the activities data structure.
      
      cloned_metadata.getActivityById(action.activity_id).metadata[action.field] = action.value;
      
      return cloned_metadata;
  });
  
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
