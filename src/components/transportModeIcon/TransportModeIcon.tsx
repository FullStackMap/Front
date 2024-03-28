import { IconBike, IconCar, IconPlane, IconWalk } from '@tabler/icons-react';
import DirectionMode from '../../services/api/Models/MapBoxDirections/DirectionMode';

export type TransportModeIconProps = {
  transportMode: DirectionMode;
};

export const TransportModeIcon = (props: TransportModeIconProps) => {
  if (!props.transportMode) return;

  switch (props.transportMode) {
    case DirectionMode.DRIVING:
      return <IconCar />;

    case DirectionMode.CYCLING:
      return <IconBike />;

    case DirectionMode.WALKING:
      return <IconWalk />;

    case DirectionMode.PLANE:
      return <IconPlane />;
  }
};
