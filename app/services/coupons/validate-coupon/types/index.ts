
export interface ValidadeCouponReq {
    status: number;
    msg: string;
    code: string;
    category?: string | null;
    brand?: string | null;
    description?: string;
    percentage?: number;
  }
  export interface ValidadeCouponRes {
    data: ValidadeCouponReq | null;
    error: string | null;
    status: number;
  }