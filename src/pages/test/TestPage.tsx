import { useDocumentTitle } from '@mantine/hooks';
import React, { useMemo } from 'react';
import { Map, Marker } from 'react-map-gl';
import Pin from '../../components/mapPin/Pin';
const TestPage = () => {
  useDocumentTitle('From A2B - Test');

  const [viewState, setViewState] = React.useState({
    latitude: 48.8588443,
    longitude: 2.2943506,
    zoom: 2,
    pitch: 30,
    bearing: 0,
  });

  const steps = useMemo(
    () => [
      {
        latitude: 48.8588443,
        longitude: 2.2943506,
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

  const pins = useMemo(
    () =>
      steps.map((step, index) => (
        <Marker
          key={`stepMarker-${index}`}
          draggable={false}
          latitude={step.latitude ?? 0}
          longitude={step.longitude ?? 0}
          // The offset in pixels as a PointLike object to apply relative to the element's center. Negatives indicate left and up (on the x and y axes, respectively). cf :https://visgl.github.io/react-map-gl/docs/api-reference/marker#offset
          // offset={[12, -10]}
          // popup={<Text>I'm popup</Text>}
          rotationAlignment="viewport">
          <Pin />
        </Marker>
      )),
    [steps],
  );

  return (
    <>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        minZoom={2}
        dragRotate={true}
        mapStyle="mapbox://styles/dercraker/cltuclkfe00fg01p75s7xcndk"
        mapboxAccessToken="pk.eyJ1IjoiZGVyY3Jha2VyIiwiYSI6ImNscnVlNzdpbjAzNDkyam14c2ptN2dwcHMifQ.dT47tVLMu2pu117-dyNXSQ"
        attributionControl={true}
        style={{
          height: '100vh',
          width: '100vw',
        }}>
        {/* {pins} */}
      </Map>
    </>
  );
};

export default TestPage;
