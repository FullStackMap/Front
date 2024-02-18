import { AuthUser } from "../Models/Auth/AuthUser";
import { TokenDto } from "../Models/Auth/TokenDto";
import { jwtDecode } from "jwt-decode";
import { JsonConvert } from 'json2typescript';
import useCookie from "./useCookie";
import api from '../services/BaseApi'
import { LoginDto } from "../Models/Auth/LoginDto";

export interface IAuthState {
  Token: string | null
  Expire: string | null
  User: AuthUser | null
  IsLogged: boolean
}


export const useAuth = () => {

  const { GetCookie, SaveCookie, DeleteCookie } = useCookie()

  let _token: string | null = GetCookie("Auth-Token");

  const SaveToken = (token: string) => SaveCookie("Auth-Token", token)

  const GetToken = (): TokenDto => GetCookie("Auth-Token") as unknown as TokenDto;

  const SaveExpiration = (expire: number) => SaveCookie("Auth-Token-Expire", expire.toString())

  const IsTokenExpired = (encodedToken: TokenDto): boolean => {
    const token: TokenDto = jwtDecode(encodedToken as unknown as string);

    if (!token || !token.Exp) {
      return false;
    }

    const date = new Date(0);
    date.setUTCSeconds(token.Exp);
    // eslint-disable-next-line
    return date! > new Date();
  }

  const SaveUser = (user: AuthUser): void => {
    _user = user
  }

  const ResetToken = (): void => {
    DeleteCookie("Auth-Token");
    DeleteCookie("Auth-Token-Expire");
    _user = null;
    _exipre = null
    _token = null;
  }

  const GetUserInfo = (): any => {
    if (IsLoggedIn()) {
      // eslint-disable-next-line
      return jwtDecode(GetToken()! as unknown as string);
    }
  }

  const Login = (userInfo: LoginDto): Promise<any> => {
    return new Promise((resolve, reject) => {
      api.AppAnonymous.post('/api/v1/Auth/Login', userInfo)
        .then((resp) => {
          const token: string = resp.data.token;

          SaveToken(token);
          const tokenDecode = jwtDecode(token);
          // const jsonConvert: JsonConvert = new JsonConvert();
          // const user = jsonConvert.deserializeObject(tokenDecode, AuthUser);
          const user = tokenDecode as AuthUser;

          SaveExpiration(user.Exp);
          SaveUser(user);
          resolve(resp);
        })
        .catch((err) => {
          ResetToken();
          let errorMessage = "Impossible de se connecter au serveur d'authentification";
          if (err.response && err.response.status === 400) {
            errorMessage = err.response.data.Message;
          }
          reject(errorMessage);
        });
    });
  }

  const LoadUser = (): void => {
    try {
      const tokenDecode = jwtDecode(_token as unknown as string);
      // const jsonConvert: JsonConvert = new JsonConvert();
      // SaveUser(jsonConvert.deserializeObject(tokenDecode, AuthUser));
      SaveUser(tokenDecode as AuthUser);
    } catch (err) {
      ResetToken();
    }
  }

  const IsLoggedIn = (): boolean => {
    const token = GetToken();

    return !!token && !IsTokenExpired(token)
  }

  const Logout = () => {
    ResetToken();
    api.reset();
  }
  return {
    ResetToken,
    GetUserInfo,
    Login,
    LoadUser,
    IsLoggedIn,
    Logout
  };
};
