export interface FindPaymentCardApiReq {
  msg?: string | null;
  response: PaymentFindCardI | null;
}
export interface FindPaymentCardResponse {
  data: FindPaymentCardApiReq | null;
  error: string | null;
  status: number;
}

export interface FindPaymentCardApiProps {
  order_id: string;
  payment_id: string;
}

export interface PaymentFindCardI {
    order_id: number;
    user_id?: number;
    payment_method: string;
    street: string;
    number: number;
    cep: string;
    city: string;
    state: string;
    created_at?: Date;
    payment_card: PaymentCardI[];
  }
  
  
  interface PaymentCardI {
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
    date_created: Date | null;
    date_of_expiration: Date | null;
  }
  