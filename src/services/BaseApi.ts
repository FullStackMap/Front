// import { AuthModule } from '@/store/modules/Authentication';
import axios, { AxiosInstance } from 'axios';

export default class BaseApi {
  private static _appAnonymous: AxiosInstance | null;
  static get AppAnonymous() {
    if (!this._appAnonymous) {
      this._appAnonymous = axios.create({
        baseURL: proccess.env.API_URL,
      });
    }
    return this._appAnonymous;
  }

  private static _appLogged: AxiosInstance | null;
  static get AppLogged() {
    if (!this._appLogged) {
      this._appLogged = axios.create({
        baseURL: proccess.env.API_URL,
        headers: { Authorization: `Bearer ${AuthModule.token}` },
      });
    }
    return this._appLogged;
  }

  static reset() {
    this._authentication = null;
    this._appAnonymous = null;
    this._appLogged = null;
    this._appToBotApi = null;
  }
}