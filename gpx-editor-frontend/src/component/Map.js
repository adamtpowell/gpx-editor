import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

const center = [51.505, -0.09]

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

function Map(props) {
   let mapitems = renderMapItems(props.activities, props.activeElement);

   return <MapContainer style={{height: "100vh"}} center={center} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mapitems}
    </MapContainer>
}

export { Map };