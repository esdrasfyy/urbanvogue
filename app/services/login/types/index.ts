import { UserI } from "../../../interfaces/user";

export interface LoginApiProps {
  credential?: string;
  password?: string;
}
export interface LoginApiReq {
  user: UserI | null;
  msg: string | null;
}
export interface LoginApiResponse {
  data: LoginApiReq | null;
  error: string | null;
  status: number;
}
