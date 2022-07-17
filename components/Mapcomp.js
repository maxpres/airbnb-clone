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

  const [selectedLocation, setSelectedLocation] = useState({});

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
              className='cursor-pointer animate-bounce text-2xl'
              onClick={() => setSelectedLocation(result)}
            >
              📌
            </p>
          </Marker>

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
