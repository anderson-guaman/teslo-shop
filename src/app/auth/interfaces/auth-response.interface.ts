import { IUser } from "./user.interface";

export interface AuthResponse {
  user: IUser;
  token: string;
}

export interface Session {
  access_token: string,
  refresh_token: string // Si no tienes refresh, puedes dejarlo vacío
}



