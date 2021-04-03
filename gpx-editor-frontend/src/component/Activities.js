import { Activity } from "./Activity"

function Activities(props) {
  let create_elements = activity => 
  <Activity 
    key={activity.id}
    id={activity.id}
    setActiveElement={props.setActiveElement}
    activityName={activity.metadata.name}
    active={props.activeElement===activity.id}
  >
    {activity.getChildren().map(create_elements)}
  </Activity>
  
  const activity_elements = create_elements(props.activities.getRoot());

  return <div className={"activities"}>
    <h3>Activities</h3>
    {activity_elements}
  </div>
}

export { Activities };