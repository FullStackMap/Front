// import { AuthModule } from '@/store/modules/Authentication';
import axios, { AxiosInstance } from 'axios';
import { useAuth, AuthProvider, LocalStorageProvider } from "@reactivers/hooks";

export default class BaseApi {
  private static baseApi = "http://localhost:32769"

  private static _appAnonymous: AxiosInstance | null;
  static get AppAnonymous() {
    if (!this._appAnonymous) {
      this._appAnonymous = axios.create({
        baseURL: this.baseApi,
      });
    }
    return this._appAnonymous;
  }

  private static _appLogged: AxiosInstance | null;
  static get AppLogged() {
    const { token } = useAuth();
    if (!this._appLogged) {
      this._appLogged = axios.create({
        baseURL: this.baseApi,
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    return this._appLogged;
  }

  static reset() {
    this._appAnonymous = null;
    this._appLogged = null;
  }
}