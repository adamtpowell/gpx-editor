function Inspector(props) {
  let activity = props.activities.getActivityById(props.activeElement);
  
  let metadata = [];
  for (let metadata_key in activity.metadata) {
      if (activity.metadata.hasOwnProperty(metadata_key)) {
          metadata.push(
              <p>{metadata_key}: {activity.metadata[metadata_key]}</p>
          )
      }
  }
  return <div className={"inspector"}>
    <h3>Inspector</h3>
    {metadata}
  </div>
}

export { Inspector };