import { PaymentFindI } from "@/(pages)/(checkout)/checkout/approve/[...slug]/components/payment-pix/types";

export interface FindPaymentApiReq {
  msg?: string | null;
  response: PaymentFindI | null;
}
export interface FindPaymentResponse {
  data: FindPaymentApiReq | null;
  error: string | null;
  status: number;
}

export interface FindPaymentApiProps {
  method: "pix" | "credit" | "debit" | "bank";
  order_id: string;
  payment_id: string;
}
