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

  login: (userInfo: LoginDto) => void;
  loadUser: () => void;
  logOut: () => void;
  isLogged: () => boolean;
  isAdmin: () => boolean;
};

export const useAuthStore: UseBoundStore<StoreApi<AuthStore>> =
  create<AuthStore>(set => ({
    token: '',
    expire: -1,
    user: undefined,

    login: async (userInfo: LoginDto) => {
      await AnoAuthController.loginPOST(userInfo)
        .then(resp => {
          const token: string | null | undefined = resp.data?.token;
          if (token) {
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

            set({
              token: token,
              expire: decodeToken.exp,
              user: user,
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

        set({
          token: token,
          expire: decodeToken.exp,
          user: user,
        });
      }
    },
    logOut: () => {
      Cookies.remove('Auth-Token');
      set({
        token: '',
        expire: -1,
        user: undefined,
      });
    },
    isLogged: () => {
      const token: string | undefined = Cookies.get('Auth-Token');

      if (token) {
        const decodeToken: TokenDecoded = jwtDecode(token);
        const isLogged: boolean =
          new Date(0).setUTCSeconds(decodeToken.exp) > new Date().getTime();

        return isLogged;
      }
      return false;
    },

    isAdmin: () => {
      const token: string | undefined = Cookies.get('Auth-Token');

      if (token) {
        const decodeToken: TokenDecoded = jwtDecode(token);
        const isAdmin: boolean = decodeToken.Roles.includes('Admin');

        return isAdmin;
      }
      return false;
    },
  }));
