import { useDocumentTitle } from '@mantine/hooks';
import { IconPinnedFilled } from '@tabler/icons-react';
import { FeatureCollection, Position } from 'geojson';
import React, { useEffect, useMemo, useState } from 'react';
import {
  GeolocateControl,
  Layer,
  LayerProps,
  Map,
  Marker,
  ScaleControl,
  Source,
} from 'react-map-gl';
import { calculateRoad } from '../../services/api/MapboxController';
import { RoadPositionDto } from '../../services/api/Models/MapBoxDirections/RoadPositionDto';

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

  const [coords, setCoords] = useState<Position[]>([]);

  useEffect(() => {
    const dto: RoadPositionDto[] = [
      {
        start: [4.860200783597507, 45.73050608112574],
        end: [5.023607756386476, 45.68705246320726],
      },
      {
        start: [4.860200783597507, 45.73050608112574],
        end: [5.023607756386476, 45.68705246320726],
      },
    ];
    calculateRoad('driving', dto);
  }, []);

  // const calculateRoad = async () => {
  //   const query = await fetch(
  //     `https://api.mapbox.com/directions/v5/mapbox/driving/4.860200783597507,45.73050608112574;5.023607756386476,45.68705246320726/?geometries=geojson&overview=full&access_token=pk.eyJ1IjoiZGVyY3Jha2VyIiwiYSI6ImNsdHVnczc4dTB6N2QyanFwZDR1N2c2eHoifQ.arP7tBErlINY3-uiwfb7Ww`,
  //     { method: 'GET' },
  //   );
  //   const json = await query.json();
  //   console.log('🚀 ~ getRoute ~ json:', json);
  //   const data = json.routes[0];
  //   const coords = data.geometry.coordinates;
  //   setCoords(coords);
  // };

  const geojson: FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: coords,
        },
        properties: {},
      },
    ],
  };

  const routeLineStyle: LayerProps = {
    id: 'roadLayer',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': '#3887be',
      'line-width': 5,
      'line-opacity': 0.75,
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
        }}>
        {pins}
        <Source id="routeSource" type="geojson" data={geojson}>
          <Layer {...routeLineStyle} />
        </Source>

        <GeolocateControl />
        <ScaleControl />
      </Map>
    </>
  );
};

export default TestPage;
