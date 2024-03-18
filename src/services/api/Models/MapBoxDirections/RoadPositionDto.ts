import { Position } from 'geojson';

type RoadPositionDto = {
  //The start position of the road
  start: Position;
  //The end position of the road
  end: Position;
};

export default RoadPositionDto;
