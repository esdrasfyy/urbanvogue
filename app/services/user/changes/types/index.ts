import { UserI } from "@/interfaces/user";

export interface ChangesApiProps {
  user_id: number;
  change: "email" | "phone" | "password";
  email: string | null;
  password: string | null;
  phone: string | null;
}
export interface ChangesApiReq {
  msg: string | null;
}
export interface ChangesApiResponse {
  data: ChangesApiReq | null;
  error: string | null;
  status: number;
}
