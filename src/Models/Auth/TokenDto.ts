export type TokenDto = {
	User: string;
	Email: string;
	Id: string;
	jti: string;
	Roles: string[];
	nbf: number;
	exp: number;
	iat: number;
};
