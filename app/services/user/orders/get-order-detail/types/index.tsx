import { OrderDetailsI } from "@/interfaces/user/order";

export interface getOrderDetailsProps {
  user_id: number;
  order_id: number;
}
export interface getOrderDetailsApiReq {
  order: OrderDetailsI | null;
  msg: string | null;
}
export interface getOrderDetailsApiResponse {
  data: getOrderDetailsApiReq | null;
  error: string | null;
  status: number;
}
