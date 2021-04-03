import { ActivityTree } from './ActivityTree';

const polyline = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.12],
]

let mock_activities = new ActivityTree([
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

export { mock_activities };