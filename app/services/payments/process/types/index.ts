import { ProductCartI } from "@/contexts/ContextCart/types";

export interface PaymentProcessApiReq {
  msg: string;
  status: number;
  order_id?: number;
  payment_id?: number;
}
export interface PaymentProcessApiResponse {
  data: PaymentProcessApiReq | null;
  error: string | null;
  status: number;
}

export interface PaymentProcessApiProps {
  user_id: number;
  address_id: number;
  payment_method: string;
  card_id: number | null;
  coupon: string | null;
  products: ProductCartI[];
}