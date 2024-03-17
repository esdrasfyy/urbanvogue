import { AddressI } from "../../../../../interfaces/address";

export interface AddressReadApiReq {
  address: AddressI[] | null;
  msg: string | null;
}
export interface AddressReadResponse {
  data: AddressReadApiReq | null;
  error: string | null;
  status: number;
}
