function Activity(props) {
  return <div className={ "activity" + (props.active ? " active" : "") }>
    <span onClick={()=>props.setActiveElement(props.id)}> {props.activityName} </span>
    {props.children}
  </div>
}

export { Activity };