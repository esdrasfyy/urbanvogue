export interface ForgotPassResetReq {
    msg: string | null;
  }
  export interface ForgotPassResetResponse {
    data: ForgotPassResetReq | null;
    error: string | null;
    status: number;
  }
  