import { ProductCartI } from "@/contexts/ContextCart/types";

export interface PaymentPixApiReq {
  msg: string;
  status: number;
  order_id?: number;
  payment_id?: number;
}
export interface PaymentPixResponse {
  data: PaymentPixApiReq | null;
  error: string | null;
  status: number;
}

export interface PaymentPixApiProps {
  user_id: number;
  address_id: number;
  payment_method: string;
  coupon: string | null;
  products: ProductCartI[];
}
