import { LoginDto } from '../../Models/Auth/LoginDto';
import { ErrorDto } from '../../Models/ErrorDto';
import BaseApi from '../BaseApi';

export class AuthController {
  static async LoginAsync(loginDto: LoginDto) {
    try {
      const res = await BaseApi.AppAnonymous.post(
        `/api/v1/Auth/Login`,
        loginDto,
      );
      return res.data;
    } catch (error: any) {
      return {
        Code: error.response.status.toString(),
        Message: error.response.statusText,
      } as ErrorDto;
    }
  }
}
