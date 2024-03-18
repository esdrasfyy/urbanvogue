import { UserI } from "../../../interfaces/user";

export interface RegisterApiResponse {
  data: RegisterApiReq | null;
  error: string | null;
  status: number;
}

export interface RegisterApiProps{
    email: string,
    username: string,
    fullname: string,
    password: string,
}
export interface RegisterApiReq {
    user?: UserI | null;
    msg?: string | null;
  }