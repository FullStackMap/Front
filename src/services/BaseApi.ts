import * as client from '@FullStackMap/from-a2b';
import { AuthStore, useAuthStore } from '../store/useAuthStore';

// eslint-disable-next-line react-hooks/rules-of-hooks
const token: string | undefined = useAuthStore(
  (state: AuthStore) => state.token,
);

const configLogged = new client.Configuration({
  basePath: '/server',
  baseOptions: {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
});

const configAno = new client.Configuration({
  basePath: '/server',
});

export const TripController = client.TripApiFactory(configLogged);

export const AnoAuthController = client.AuthApiFactory(configAno);
export const AnoTripController = client.TripApiFactory(configAno);
