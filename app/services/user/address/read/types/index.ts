import { AddressI } from "@/interfaces/address";

export interface AddressReadApi {
  address: AddressI[] | null;
  msg: string | null;
}
export interface AddressReadResponse {
  data: AddressReadApi | null;
  error: string | null;
  status: number;
}
