import { OrderI } from "@/interfaces/user/order";

export interface getOrdersProps {
  user_id: number;
}
export interface getOrdersApiReq {
  orders: OrderI[] | null;
  msg: string | null;
}
export interface getOrdersApiResponse {
  data: getOrdersApiReq | null;
  error: string | null;
  status: number;
}
