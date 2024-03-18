import { Position } from 'geojson';
import { MapboxClient } from '../BaseApi';
import DirectionMode from './Models/MapBoxDirections/DirectionMode';
import RoadPositionDto from './Models/MapBoxDirections/RoadPositionDto';

const mapBoxToken =
  'pk.eyJ1IjoiZGVyY3Jha2VyIiwiYSI6ImNsdHVnczc4dTB6N2QyanFwZDR1N2c2eHoifQ.arP7tBErlINY3-uiwfb7Ww';

export const calculateRoad = async (
  directionMode: DirectionMode,
  positions: RoadPositionDto[],
) => {
  const positionsString = positions
    .map(({ start, end }) => `${start};${end}`)
    .join(';');

  const response = await MapboxClient.get(
    `/directions/v5/mapbox/${directionMode}/${positionsString}/?geometries=geojson&overview=full&access_token=${mapBoxToken}`,
  );
  const data = response.data.routes[0];
  const coords: Position[] = data.geometry.coordinates;

  return coords;
};
