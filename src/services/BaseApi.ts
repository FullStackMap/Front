import * as client from '@FullStackMap/from-a2b';
import axios from 'axios';
import Cookies from 'js-cookie';

const basePath: string = import.meta.env.VITE_API_URL as string;
const token: string | undefined = Cookies.get('Auth-Token');

const configAno = new client.Configuration({
  basePath: basePath,
});

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

export const AnoAxiosClient = axios.create({
  baseURL: basePath,
});

export const AxiosClient = axios.create({
  baseURL: basePath,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const MapboxClient = axios.create({
  baseURL: 'https://api.mapbox.com',
});

export const TripController = TripControllerFunc();

export const AnoAuthController = client.AuthApiFactory(configAno);
