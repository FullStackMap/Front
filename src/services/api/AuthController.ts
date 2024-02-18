import BaseApi from '../BaseApi';
import { ErrorDto } from '../../Models/ErrorDto';
import { LoginDto } from '../../Models/Auth/LoginDto';

export class AuthController {
  static async LoginAsync(loginDto: LoginDto) {
    try {
      const res = await BaseApi.AppAnonymous.post(`/api/v1/Auth/Login`, loginDto)
      return res.data
    } catch (error: any) {
      return { Code: error.response.status.toString(), Message: error.response.statusText } as ErrorDto
    }
  }
}