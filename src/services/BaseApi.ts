import * as client from '@FullStackMap/from-a2b';
import Cookies from 'js-cookie';

const basePath: string = 'http://localhost:32769';
const token: string | undefined = Cookies.get('Auth-Token');

const configAno = new client.Configuration({
  basePath: basePath,
});

export const TripControllerFunc = () => {
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

export const UserUpdateControllerFunc = () => {
  const configLogged = new client.Configuration({
    basePath: basePath,
    baseOptions: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return client.UserApiFactory(configLogged);
};

export const TripController = TripControllerFunc();

export const AnoAuthController = client.AuthApiFactory(configAno);

export const UserUpdateController = UserUpdateControllerFunc();
