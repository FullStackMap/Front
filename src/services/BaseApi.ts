import * as client from '@FullStackMap/from-a2b';
import { AuthStore, useAuthStore } from '../store/useAuthStore';

const configAno = new client.Configuration({
  basePath: '/server',
});

export const TripController = () => {
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
  return client.TripApiFactory(configLogged);
};

export const AnoAuthController = client.AuthApiFactory(configAno);
