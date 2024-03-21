import { AddressI } from "@/interfaces/address";

export interface CreateAddressProps {
  user_id: number;
  type: string;
  cep: string;
  street: string;
  number: number;
  state: string;
  city: string;
  ref: string | undefined | null;
}

export interface CreateAddressReq {
  msg?: string | null;
  address: AddressI | null;
}
export interface CreateAddressRes {
  data: CreateAddressReq;
  status: number;
  error?: string | null;
}
