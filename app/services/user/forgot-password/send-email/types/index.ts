export interface ForgotPassSendEmailReq {
  msg: string | null;
}
export interface ForgotPassSendEmailResponse {
  data: ForgotPassSendEmailReq | null;
  error: string | null;
  status: number;
}
