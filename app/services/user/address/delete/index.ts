import axios, { AxiosResponse } from "axios";
import { AddressDeleteApiProps, AddressDeleteApiReq, AddressDeleteApiResponse } from "@/services/user/address/delete/types/index";

async function AddressDeleteApi({user_id, address_id}:AddressDeleteApiProps): Promise<AddressDeleteApiResponse> {
  const api = process.env.API;
  try {
    if (!user_id || !address_id) {
      throw new Error("ID parameter is empty or undefined.");
    }
    const response: AxiosResponse<AddressDeleteApiReq | null> = await axios.delete(
      `${api}address/delete?user=${user_id}&address=${address_id}`
    );
    if (response.status === 204) {
      return {
        data: {
          msg:  null,
        },
        error: null,
        status: response.status || 204,
      };
    }
    if (response.status !== 204 && response.status !== 500) {
      return {
        data: {
          msg: response?.data?.msg || null,
        },
        error: response?.data?.msg || "Unknown error.",
        status: response.status,
      };
    }
    throw new Error(response?.data?.msg || "Unknown error.");
  } catch (error: any) {
    return {
      data: {
        msg: error.response.data.msg || null,
      },
      error: error.response.data.msg || "Unknown error.",
      status: error.response.status,
    };
  }
}

export { AddressDeleteApi };
