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

  //Point de vu de l'utilisateur sur la carte, les valeurs renseignées seront l'endroit où la carte se positionnera au chargement de la page
  const [viewState, setViewState] = React.useState({
    longitude: 4.860200783597507,
    latitude: 45.73050608112574,
    zoom: 2,
    pitch: 30,
    bearing: 0,
  });

  //Ensemble des points de passage du voyage
  const steps = useMemo(
    () => [
      {
        longitude: 4.860200783597507,
        latitude: 45.73050608112574,
      },
      {
        longitude: 5.079252160492843,
        latitude: 45.71892384847893,
      },
    ],
    [],
  );

  //Création des pins sur la carte pour chaque étape du voyage
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

  const [roads, setRoads] = useState<Position[]>([]);

  useEffect(() => {
    (async () => {
      const dto: RoadPositionDto[] = [
        {
          start: [4.860200783597507, 45.73050608112574],
          end: [5.079252160492843, 45.71892384847893],
        },
      ];
      //Calcul de l'itinéraire entre les points de passage
      //Doit être utilisé que si nécessaire, car il y a un quota de requêtes
      //l'ensemble des itinéraires sont stockés dans la base de données
      const roads = await calculateRoad('driving', dto);
      setRoads(roads);
      setGeojson({
        ...geojson,
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: roads,
            },
            properties: {},
          },
        ],
      });
    })();
  }, []);

  const [geojson, setGeojson] = useState<FeatureCollection>({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: roads,
        },
        properties: {},
      },
    ],
  });

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
          width: '80vw',
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
