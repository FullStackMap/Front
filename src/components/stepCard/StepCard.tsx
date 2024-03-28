import { StepDto, TravelDtoList } from '@FullStackMap/from-a2b';
import { Paper, Text } from '@mantine/core';
import useDistance from '../../hooks/useDistance';
import useTime from '../../hooks/useTime';
import DirectionMode from '../../services/api/Models/MapBoxDirections/DirectionMode';
import { TransportModeIcon } from '../transportModeIcon/TransportModeIcon';
import { StepCardMenu } from './Menu/StepCardMenu';
import './StepCard.scss';

interface StepCardProps {
  step: StepDto;
  travel: TravelDtoList;
}

export const StepCard = (props: StepCardProps) => {
  const { MetreToDistance } = useDistance();
  const { SecondeToTime } = useTime();

  return (
    <Paper className="card">
      <Text>StepName : {props.step.name}</Text>
      <Text>StepOrder : {props.step.order}</Text>
      {props.step.order !== 1 && (
        <>
          <Text>
            TravelDistance :{' '}
            {MetreToDistance(Number((props.travel.distance || 0).toFixed(0)))}
          </Text>
          <Text>
            TravelDuration : {SecondeToTime(props.travel.duration ?? 0)}
          </Text>
          <Text>TravelTransportMode : {props.travel.transportMode}</Text>
          <TransportModeIcon
            transportMode={props.travel.transportMode as DirectionMode}
          />
        </>
      )}
      <StepCardMenu />
    </Paper>
  );
};
