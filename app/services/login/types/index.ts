import { UserI } from "@/interfaces/user";

export interface LoginApiProps {
    credential: string | null;
    password: string | null
  }
export interface LoginApi {
    user: UserI | null;
    msg: string | null
  }
  export interface LoginApiResponse {
    data: LoginApi | null;
    error: string | null;
    status: number;
  }