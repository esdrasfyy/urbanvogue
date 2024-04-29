export interface DataPixI {
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
  coupon: string | null;
  discount: number | null;
  freight_type: string | null;
  freight_amount: number | null;
  date_of_expiration: Date;
  date_created?: Date;
}
export interface DataCardI {
  payment_id: number;
  issuer_id: string;
  transaction_amount: number;
  installments: number;
  installment_amount: number | null;
  cpf_holder: string;
  name_holder: string;
  last_digits: string;
  expiration_month: number;
  expiration_year: number;
  status: string;
  status_detail: string;
  date_approved: Date | null;
  currency: string;
  coupon: string | null;
  discount: number | null;
  freight_type: string | null;
  freight_amount: number | null;
  date_created: Date | null;
  date_of_expiration: Date | null;
}
