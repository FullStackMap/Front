import { MapboxClient } from '../BaseApi';
import { RoadPositionDto } from './Models/MapBoxDirections/RoadPositionDto';

const mapBoxToken =
  'pk.eyJ1IjoiZGVyY3Jha2VyIiwiYSI6ImNsdHVnczc4dTB6N2QyanFwZDR1N2c2eHoifQ.arP7tBErlINY3-uiwfb7Ww';

export type DirectionMode = 'driving' | 'walking' | 'cycling';

export const calculateRoad = async (
  directionMode: DirectionMode,
  positions: RoadPositionDto[],
) => {
  const positionsString = positions
    .map(position => `${position.start};${position.end}`)
    .join(';');

  const response = await MapboxClient.get(
    `/directions/v5/mapbox/${directionMode}/${positionsString}/?geometries=geojson&overview=full&access_token=${mapBoxToken}`,
  );
  const json = response.data.json();
  const data = json.routes[0];
  const coords = data.geometry.coordinates;
};
