import { useQuery } from '@tanstack/react-query';
import { TripController } from '../../../services/BaseApi';
import { AuthStore, useAuthStore } from '../../../store/useAuthStore';

import NoFoundTravels from "../../../components/cardCustom/noFoundTravels/NoFoundTravels.tsx";
import {CurrentTravelCard} from "../../../components/cardCustom/currentTravelCard/CurrentTravelCard.tsx";

import moment from 'moment';


const MyTrips = () => {
  const userId = useAuthStore((s: AuthStore) => s.user?.Id);
  const {
    data: query,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['trips', userId],
    queryFn: () =>
      TripController.getAllTripByUserIdAsyncGET(userId as string).then(
        res => res.data,
      ),
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  if (!Array.isArray(query)) return <NoFoundTravels />;

  const currentDate = moment();

  const trips = query.filter(trip => {
    const tripStartDate = moment(trip.endDate);
    return tripStartDate.isSameOrAfter(currentDate, 'day');
  });

  return (
    <>
      {trips.map(trip => (
          <CurrentTravelCard
              description={trip.description}
              key={trip.tripId}
              title={trip.name}
              img={"https://media.admagazine.fr/photos/632449f714420dbf05ebc6f9/16:9/w_2560%2Cc_limit/GettyImages-627393180.jpg"}
              startDate={trip.startDate}
              id={trip.tripId}
          />

      ))}
    </>
  );
};

export default MyTrips;
