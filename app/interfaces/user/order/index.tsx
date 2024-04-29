import { DataCardI, DataPixI } from "@/interfaces/payment/payment.interface";

export interface OrderI {
  order_id: number;
  user_id: number;
  payment_method: string;
  street: string;
  number: number;
  status: string;
  cep: string;
  city: string;
  state: string;
  created_at: Date;
}

export interface ProductOrderI {
  product_order: number;
  order_id: number;
  product_id: number;
  user_id: number;
  color: string;
  title: string;
  price: string;
  image: string;
  size: string;
  quantity: number;
}

export interface OrderDetailsI extends OrderI {
  payment_card: DataCardI[] | [];
  payment_pix: DataPixI[] | [];
  product_orders: ProductOrderI[];
}
