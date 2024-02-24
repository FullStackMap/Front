import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { StoreApi, UseBoundStore, create } from 'zustand';
import { AuthUser } from '../Models/Auth/AuthUser';
import { LoginDto } from '../Models/Auth/LoginDto';
import { TokenDto } from '../Models/Auth/TokenDto';
import BaseApi from '../services/BaseApi';

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
			await BaseApi.AppAnonymous.post('/api/v1/Auth/Login', userInfo)
				.then(resp => {
					const token: string = resp.data.token;
					if (token) {
						const decodeToken = jwtDecode(token) as TokenDto;
						Cookies.set('Auth-Token', token, {
							secure: false,
							expires: decodeToken.exp,
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
				const decodeToken: TokenDto = jwtDecode(token);

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
