import { useDocumentTitle } from '@mantine/hooks';
import { IconPinnedFilled } from '@tabler/icons-react';
import React, { useMemo } from 'react';
import { GeolocateControl, Map, Marker, ScaleControl } from 'react-map-gl';
const TestPage = () => {
  useDocumentTitle('From A2B - Test');

  const [viewState, setViewState] = React.useState({
    latitude: 45.73050608112574,
    longitude: 4.860200783597507,
    zoom: 22,
    // zoom: 2,
    pitch: 0,
    // pitch: 30,
    bearing: 0,
  });

  const steps = useMemo(
    () => [
      {
        latitude: 45.73050608112574,
        longitude: 4.860200783597507,
      },
      {
        latitude: 51.5073219,
        longitude: -0.1276474,
      },
      {
        latitude: 40.712776,
        longitude: -74.005974,
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
        <GeolocateControl />
        <ScaleControl />
        {pins}
      </Map>
    </>
  );
};

export default TestPage;
