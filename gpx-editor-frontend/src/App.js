import './App.css';

import { SideBar } from './component/Sidebar';
import { Activities } from './component/Activities';
import { Inspector } from './component/Inspector';
import { Map } from './component/Map';

import { mock_activities} from "./MockData";

// Load leaflet resources
import 'leaflet/dist/leaflet.css';

import React, { useState } from 'react';

// Run speculative reducer on the given state and action.
// then, run the concrete getter to asynchrounusly get the real value from the database / api / other source.
// then, use that concrete value to run concrete reducer, which will return the new state.
//
// Usage: pass in initialState, speculativeReducer(state, action), async concreteGetter(state, action), concreteReducer(state, action, concreteValue)
function useSpeculativeReducer(initialState, speculativeReducer, concreteGetter, concreteReducer) {
  let [state, setState] = useState(initialState);

  const reducer = function(state, action) {
    let speculativeReducerValue;
    if (speculativeReducer !== undefined) {
      speculativeReducerValue = speculativeReducer(state, action);
    }

    if (speculativeReducerValue !== undefined) {
      setState(Object.freeze(speculativeReducerValue));
    }

    if (concreteGetter !== undefined) {
      concreteGetter(state, action).then((concreteGetterValue)=>{
        const concreteReducerValue = concreteReducer(state, action, concreteGetterValue);

        setState(Object.freeze(concreteReducerValue));
      })
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
