export interface FindPaymentPixApiReq {
  msg?: string | null;
  response: PaymentFindPixI | null;
}
export interface FindPaymentPixResponse {
  data: FindPaymentPixApiReq | null;
  error: string | null;
  status: number;
}

export interface FindPaymentPixApiProps {
  order_id: string;
  payment_id: string;
}

export interface PaymentFindPixI {
  order_id: number;
  user_id?: number;
  payment_method: string;
  street: string;
  number: number;
  cep: string;
  city: string;
  state: string;
  created_at?: Date;
  payment_pix: PaymentPix[];
}
interface PaymentPix {
  id: number;
  order_id: number;
  payment_id: number;
  issuer_id: string;
  notification_url: string;
  qr_code: string;
  ticket_url?: string;
  transaction_amount: number;
  status: string;
  status_detail: string;
  date_approved?: Date;
  currency: string;
  date_of_expiration: Date;
  date_created?: Date;
}
