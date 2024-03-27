import { StepDto } from '@FullStackMap/from-a2b';
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

export const MapStepEditor = () => {
  useDocumentTitle('From A2B - Map');

  //#region States
  //Point de vu de l'utilisateur sur la carte, les valeurs renseignées seront l'endroit où la carte se positionnera au chargement de la page
  const [viewState, setViewState] = React.useState({
    longitude: 4.860200783597507,
    latitude: 45.73050608112574,
    zoom: 2,
    pitch: 30,
    bearing: 0,
  });

  //Ensemble des points de passage du voyage
  const [steps, setSteps] = useState<StepDto[]>([
    {
      stepId: '1',
      tripId: '1',
      latitude: 45.73050608112574,
      longitude: 4.860200783597507,
    },
    {
      stepId: '2',
      tripId: '1',
      latitude: 46.123456,
      longitude: 4.56789,
    },
    {
      stepId: '3',
      tripId: '1',
      latitude: 47.234567,
      longitude: 3.456789,
    },
    {
      stepId: '4',
      tripId: '1',
      latitude: 48.345678,
      longitude: 2.345678,
    },
    {
      stepId: '5',
      tripId: '1',
      latitude: 49.456789,
      longitude: 1.234567,
    },
    {
      stepId: '6',
      tripId: '1',
      latitude: 50.56789,
      longitude: 0.123456,
    },
    {
      stepId: '7',
      tripId: '1',
      latitude: 51.678901,
      longitude: -0.987654,
    },
    {
      stepId: '8',
      tripId: '1',
      latitude: 52.789012,
      longitude: -1.876543,
    },
    {
      stepId: '9',
      tripId: '1',
      latitude: 53.890123,
      longitude: -2.765432,
    },
    {
      stepId: '10',
      tripId: '1',
      latitude: 54.901234,
      longitude: -3.654321,
    },
    {
      stepId: '11',
      tripId: '1',
      latitude: 55.912345,
      longitude: -4.54321,
    },
    {
      stepId: '12',
      tripId: '1',
      latitude: 56.923456,
      longitude: -5.432109,
    },
    {
      stepId: '13',
      tripId: '1',
      latitude: 57.934567,
      longitude: -6.321098,
    },
  ]);

  const [dto, setDto] = useState([
    // {
    //   start: [4.860200783597507, 45.73050608112574],
    //   end: [5.079252160492843, 45.71892384847893],
    // },
    // Ajoutez d'autres coordonnées initiales ici si nécessaire
  ]);

  const [roads, setRoads] = useState<Position[]>([]);
  //#endregion

  //#region Effects
  useEffect(() => {
    (async () => {
      //Calcul de l'itinéraire entre les points de passage
      //Doit être utilisé que si nécessaire, car il y a un quota de requêtes
      //l'ensemble des itinéraires sont stockés dans la base de données
      console.log('les dto pour le road', dto[dto.length - 1]);
      if (dto.length > 0) {
        const lastDto = [dto[dto.length - 1]];
        const road: Position[] = await calculateRoad('driving', lastDto);
        console.log('road', road);
        setRoads(prevRoads => prevRoads.concat(road));
        console.log('roads', roads);
      }
      // const road: Position[] = await calculateRoad('driving', dto);
      // setRoads(road);
      // console.log("roads", roads)
    })();
  }, [dto]);
  //#endregion

  //#region Memos

  let removePoint = (index: number) => {
    console.log('remove', index);
  };

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
          <IconPinnedFilled
            color="teal"
            size={32}
            stroke={2}
            onClick={() => removePoint(index)}
          />
        </Marker>
      );
    });
  }, [steps]);

  //#endregion

  //#region Variables

  const geojson: FeatureCollection = {
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

  let addPoint = (evt: any) => {
    console.log('hello', evt.lngLat);
    // @ts-ignore
    setSteps([
      ...steps,
      { latitude: evt.lngLat.lat, longitude: evt.lngLat.lng },
    ]);
    console.log('steps', steps);
    // @ts-ignore
    if (steps.length > 0) {
      // @ts-ignore
      setDto([
        ...dto,
        {
          start: [
            steps[steps.length - 1].longitude,
            steps[steps.length - 1].latitude,
          ],
          end: [evt.lngLat.lng, evt.lngLat.lat],
        },
      ]);
      console.log('ddto', dto);
    }
  };

  //#endregion
  return (
    <>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        onClick={addPoint}
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
