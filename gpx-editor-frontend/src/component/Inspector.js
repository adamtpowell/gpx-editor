function Inspector(props) {
  let activity = props.activities.getActivityById(props.activeElement);
  
  let changeHandler = function(event) {
    props.updateMetadata(props.activeElement, event.target.name, event.target.value);
  }
  
  let metadata_elements = [];
  for (let metadata_key in activity.metadata) {
    if (activity.metadata.hasOwnProperty(metadata_key)) {
      metadata_elements = metadata_elements.concat([
        <label key={metadata_key + " label"} htmlFor={metadata_key}>{metadata_key}</label>,
        <input key={metadata_key} name={metadata_key} value={activity.metadata[metadata_key]} onChange={changeHandler}/>
      ])
    }
  }
  return <div className={"inspector"}>
    <h3>Inspector</h3>
    {metadata_elements}
  </div>
}

export { Inspector };