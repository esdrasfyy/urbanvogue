import axios, { AxiosResponse } from "axios";
import {
  CreateAddressProps,
  CreateAddressReq,
  CreateAddressRes,
} from "./types";

async function AddressCreateApi({
  cep,
  city,
  number,
  ref,
  state,
  street,
  type,
  user_id,
}: CreateAddressProps): Promise<CreateAddressRes> {
  const api = process.env.API;
  try {
    const response: AxiosResponse<CreateAddressReq | null> = await axios.post(
      `${api}address/new`,
      {
        user_id,
        street,
        number,
        city,
        cep: String(cep),
        references: ref || " ",
        state,
        type_address: type,
      }
    );

    if (response.status === 201 && response.data && response.data) {
      return {
        data: {
          address: response.data.address,
          msg: response.data.msg,
        },
        error: null,
        status: response.status,
      };
    } else {
      return {
        data: {
          address: null,
          msg: response?.data?.msg || "Unknown error.",
        },
        error: response.data
          ? response.data.msg || "Unknown error."
          : "Unknown error.",
        status: response.status,
      };
    }
  } catch (error: any) {
    return {
      data: {
        address: null,
        msg: error.response?.data?.msg || null,
      },
      error: error.response?.data?.msg || "Unknown error.",
      status: error.response?.status || 500,
    };
  }
}
export { AddressCreateApi };
