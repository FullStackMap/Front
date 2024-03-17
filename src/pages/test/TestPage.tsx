import { useDocumentTitle } from '@mantine/hooks';
import { IconPinnedFilled } from '@tabler/icons-react';
import type { FeatureCollection } from 'geojson';
import React, { useMemo } from 'react';
import type { CircleLayer } from 'react-map-gl';
import {
  GeolocateControl,
  Layer,
  Map,
  Marker,
  ScaleControl,
  Source,
} from 'react-map-gl';

const TestPage = () => {
  useDocumentTitle('From A2B - Test');

  const [viewState, setViewState] = React.useState({
    longitude: 4.860200783597507,
    latitude: 45.73050608112574,
    zoom: 8,
    // zoom: 2,
    pitch: 0,
    // pitch: 30,
    bearing: 0,
  });

  const steps = useMemo(
    () => [
      {
        longitude: 4.860200783597507,
        latitude: 45.73050608112574,
      },
      {
        longitude: 5.023607756386476,
        latitude: 45.68705246320726,
      },
      {
        longitude: -0.1276474,
        latitude: 51.5073219,
      },
      {
        longitude: -74.005974,
        latitude: 40.712776,
      },
    ],
    [],
  );

  const pins = useMemo(() => {
    return steps.map((step, index) => {
      return (
        <Marker
          key={`stepMarker-${index}`}
          draggable={false}
          latitude={step.latitude ?? 0}
          longitude={step.longitude ?? 0}
          pitchAlignment="viewport"
          rotationAlignment="viewport">
          <IconPinnedFilled color="teal" size={32} stroke={2} />
        </Marker>
      );
    });
  }, [steps]);

  // const [geo, setGeo] = React.useState({});

  // async function getRoute() {
  //   const query = await fetch(
  //     `https://api.mapbox.com/directions/v5/mapbox/driving/4.860200783597507,45.73050608112574;5.023607756386476,45.68705246320726/?access_token=pk.eyJ1IjoiZGVyY3Jha2VyIiwiYSI6ImNsdHVnczc4dTB6N2QyanFwZDR1N2c2eHoifQ.arP7tBErlINY3-uiwfb7Ww`,
  //     { method: 'GET' },
  //   );
  //   const json = await query.json();
  //   const data = json.routes[0];
  //   const route = data.geometry.coordinates;
  //   const geojson = {
  //     type: 'Feature',
  //     properties: {},
  //     geometry: {
  //       type: 'LineString',
  //       coordinates: route,
  //     },
  //   };
  //   setGeo(geojson);
  // }

  const geojson: FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [-122.4, 37.8] },
      },
    ],
  };

  const layerStyle: CircleLayer = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#007cbf',
    },
  };

  return (
    <>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        minZoom={2}
        dragRotate={true}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken="pk.eyJ1IjoiZGVyY3Jha2VyIiwiYSI6ImNsdHVnczc4dTB6N2QyanFwZDR1N2c2eHoifQ.arP7tBErlINY3-uiwfb7Ww"
        attributionControl={true}
        style={{
          height: '80vh',
          width: '100vw',
        }}
        // onLoad={() => getRoute}
      >
        <GeolocateControl />
        <ScaleControl />
        {pins}
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
        {/* <Source id="route" type="geojson" data={geo}>
          <Layer
            id="route"
            type="line"
            source={{
              type: 'geojson',
              data: geo,
            }}
            layout={{
              'line-join': 'round',
              'line-cap': 'round',
            }}
            paint={{
              'line-color': '#3887be',
              'line-width': 5,
              'line-opacity': 0.75,
            }}
          />
        </Source> */}
      </Map>
    </>
  );
};

export default TestPage;
