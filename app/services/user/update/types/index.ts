import { UserI } from "@/interfaces/user";

export interface UpdateUserApiProps {
  userId: number;
  gender: string;
  profile: string | null;
  fullname: string;
  username: string;
  email: string;
  phone: string;
  birthdate: Date;
  cpf: string;
}
export interface UpdateUSerApiReq {
  user: UserI | null;
  msg: string | null;
}
export interface UpdateUserApiResponse {
  data: UpdateUSerApiReq | null;
  error: string | null;
  status: number;
}
