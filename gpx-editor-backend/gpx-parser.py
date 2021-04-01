from typing import List

import xml.etree.ElementTree as ElementTree

gpx_namespace = {
    'gpx': 'http://www.topografix.com/GPX/1/1'
}

with open('../../data/2020-06-14_19-23_Sun.gpx', 'r') as file:
    gpx_text = "\n".join(file.readlines())

def parse_gpx(gpx: str) -> List[List[float]]:
    root = ElementTree.fromstring(gpx)
    track_segment = root.find("gpx:trk", gpx_namespace).find("gpx:trkseg", gpx_namespace)
    
    track_points = track_segment.findall("gpx:trkpt", gpx_namespace)
    
    return [[float(point.attrib['lat']), float(point.attrib['lon'])] for point in track_points]
    
points = parse_gpx(gpx_text)