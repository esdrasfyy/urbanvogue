export interface ChangesApiProps {
  user_id: number;
  change: "email" | "phone" | "password";
  data: string;
  transport: "wpp" | "sms" | "email" | null;
}
export interface ChangesApiReq {
  msg: string | null;
}
export interface ChangesApiResponse {
  data: ChangesApiReq | null;
  error: string | null;
  status: number;
}
