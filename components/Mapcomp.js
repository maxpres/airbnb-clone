import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import 'mapbox-gl/dist/mapbox-gl.css';

function Mapcomp({ searchResult }) {
  //transform searchResult object into the {latitude:52.234424, longitude:13.32424}
  const coordinates = searchResult.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: '100px',
    height: '100px',
    longitude: center.longitude,
    latitude: center.latitude - 0.15,
    zoom: 11,
  });
  // console.log(center);
  //{longitude: -0.08452479386870405, latitude: 51.50996326851979}

  // console.log(center.longitude);
  //-0.08452479386870405

  const [selectedLocation, setSelectedLocation] = useState({});
  console.log(selectedLocation);
  //{img: 'https://links.papareact.com/xqj', location: 'Private room in center of London', title: 'Stay at this spacious Edwardian House', description: '1 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen · Free parking · Washing Machine', star: 4.73, …}
  return (
    <ReactMapGL
      mapStyle='mapbox://styles/maxpres/cl45e1y91009h14p7ax0alwew'
      mapboxAccessToken={process.env.mapbox_key}
      {...viewport}
      onMove={(evt) => setViewport(evt.viewport)}
    >
      {searchResult.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offSetTop={-10}
          >
            <p
              className='cursor-pointer animate-bounce'
              onClick={() => setSelectedLocation(result)}
            >
              📍
            </p>
          </Marker>
          {/* Popup to show if we click on the marker */}
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Mapcomp;
