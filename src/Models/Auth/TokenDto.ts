export type TokenDto = {
  //UserName of the user
  User: string;
  //Email of the user
  Email: string;
  //GUID Id of the user
  Id: string;
  //JWT ID (unique identifier for the token)
  jti: string;
  //Roles of the user
  Roles: string[];
  //Not Valid Before (Seconds since Unix Epoch)
  nbf: number;
  //Expiration Time (Seconds since Unix Epoch)
  exp: number;
  //Issued At (Seconds since Unix Epoch)
  iat: number;
};
