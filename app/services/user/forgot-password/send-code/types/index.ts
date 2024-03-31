export interface ForgotPassSendCodeReq {
  msg: string | null;
}
export interface ForgotPassSendCodeResponse {
  data: ForgotPassSendCodeReq | null;
  error: string | null;
  status: number;
}
