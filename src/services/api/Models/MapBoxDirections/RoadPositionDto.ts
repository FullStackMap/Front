import { Position } from 'geojson';

export type RoadPositionDto = {
  //The start position of the road
  start: Position;
  //The end position of the road
  end: Position;
};
