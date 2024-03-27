import * as client from '@FullStackMap/from-a2b';
import axios from 'axios';
import Cookies from 'js-cookie';

const basePath: string = import.meta.env.VITE_API_URL as string;
const token: string | undefined = Cookies.get('Auth-Token');

const configAno = new client.Configuration({
  basePath: basePath,
});

export const AnoAuthController = client.AuthApiFactory(configAno);

const TripControllerFunc = () => {
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
export const TripController = TripControllerFunc();

const StepControllerFunc = () => {
  const configLogged = new client.Configuration({
    basePath: basePath,
    baseOptions: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  return client.StepApiFactory(configLogged);
};
export const StepController = StepControllerFunc();

export const MapboxClient = axios.create({
  baseURL: 'https://api.mapbox.com',
});
