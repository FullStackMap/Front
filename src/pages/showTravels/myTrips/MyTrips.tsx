// import {useQuery} from '@tanstack/react-query'

import { TripDto } from '@FullStackMap/from-a2b';
import { useQuery } from '@tanstack/react-query';
import { TripController } from '../../../services/BaseApi';
import { AuthStore, useAuthStore } from '../../../store/useAuthStore';

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

  return (
    <>
      {(query as TripDto[]).map(trip => (
        <div key={trip.tripId}>
          <h1>{trip.name}</h1>
          <p>{trip.description}</p>
        </div>
      ))}
    </>
  );
};

export default MyTrips;
