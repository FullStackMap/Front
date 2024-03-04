import * as client from '@FullStackMap/from-a2b';
import { AuthStore, useAuthStore } from '../store/useAuthStore';

const basePath :string = "http://localhost:32771"

const configAno = new client.Configuration({
  basePath: basePath,
});

export const TripController = () => {
  const token: string | undefined = useAuthStore(
    (state: AuthStore) => state.token,
  );

  const configLogged = new client.Configuration({
    basePath: basePath,
    baseOptions: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  return client.TripApiFactory(configLogged);
};

export const AnoAuthController = client.AuthApiFactory(configAno);
