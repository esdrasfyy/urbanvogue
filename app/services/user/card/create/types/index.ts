export interface CreateCardApiProps {
  type: string;
  user_id: number;
  card_number: string;
  name_holder: string;
  cpf_holder: string;
  card_nickname: string;
  card_network: string;
  expiration_date: string;
  cvv: string;
}
export interface CreateCardApiReq {
  msg?: string | null;
}
export interface CreateCardApiRes {
  data: CreateCardApiReq | null;
  status: number;
  error: string | null;
}
