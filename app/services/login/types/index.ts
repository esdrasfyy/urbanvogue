import { UserI } from "@/interfaces/user";

export interface LoginApiProps {
    credential: string | null;
    password: string | null
  }
export interface LoginApiReq {
    user: UserI | null;
    msg: string | null
  }
  export interface LoginApiResponse {
    data: LoginApiReq | null;
    error: string | null;
    status: number;
  }