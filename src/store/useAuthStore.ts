/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginDto } from '@FullStackMap/from-a2b';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { StoreApi, UseBoundStore, create } from 'zustand';
import { AnoAuthController } from '../services/BaseApi';
import { AuthUser } from '../services/api/Models/Auth/AuthUser';
import { TokenDecoded } from '../services/api/Models/Auth/TokenDto';

export type AuthStore = {
  token: string | undefined;
  expire: number;
  user: AuthUser | undefined;
  isLogged: boolean;
  isAdmin: boolean;

  login: (userInfo: LoginDto) => void;
  loadUser: () => void;
  logOut: () => void;
};

export const useAuthStore: UseBoundStore<StoreApi<AuthStore>> =
  create<AuthStore>(set => ({
    token: '',
    expire: -1,
    user: undefined,
    isLogged: false,
    isAdmin: false,

    login: async (userInfo: LoginDto) => {
      await AnoAuthController.loginPOST(userInfo)
        .then(resp => {
          const token: string | null | undefined = resp.data?.token;
          if (token) {
            console.log('🚀 ~ login: ~ token:', token);
            const decodeToken = jwtDecode(token) as TokenDecoded;
            Cookies.set('Auth-Token', token, {
              secure: false,
            });
            const user: AuthUser = {
              Id: decodeToken.Id,
              User: decodeToken.User,
              Email: decodeToken.Email,
              Roles: decodeToken.Roles,
            };

            const isLogged: boolean =
              new Date(0).setUTCSeconds(decodeToken.exp) > new Date().getTime();
            const isAdmin: boolean = decodeToken.Roles.includes('Admin');

            set({
              token: token,
              expire: decodeToken.exp,
              user: user,
              isLogged: isLogged,
              isAdmin: isAdmin,
            });
          }
        })
        .catch(err => {
          Cookies.remove('Auth-Token');
          Cookies.remove('Auth-Token-Expire');
          set({
            token: '',
            expire: -1,
            user: undefined,
            isLogged: false,
            isAdmin: false,
          });

          let errorMessage =
            "Impossible de se connecter au serveur d'authentification";
          if (err.response && err.response.status === 400)
            errorMessage = err.response.data.Message;
          console.error(errorMessage);
        });
    },
    loadUser: () => {
      const token: string | undefined = Cookies.get('Auth-Token');

      if (token) {
        const decodeToken: TokenDecoded = jwtDecode(token);

        const user: AuthUser = {
          Id: decodeToken.Id,
          User: decodeToken.User,
          Email: decodeToken.Email,
          Roles: decodeToken.Roles,
        };

        const isLogged: boolean =
          new Date(0).setUTCSeconds(decodeToken.exp) > new Date().getTime();
        const isAdmin: boolean = decodeToken.Roles.includes('Admin');

        set({
          token: token,
          expire: decodeToken.exp,
          user: user,
          isLogged: isLogged,
          isAdmin: isAdmin,
        });
      }
    },
    logOut: () => {
      Cookies.remove('Auth-Token');
      set({
        token: '',
        expire: -1,
        user: undefined,
        isLogged: false,
        isAdmin: false,
      });
    },
  }));
