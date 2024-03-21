import axios, { AxiosResponse } from "axios";
import {
  CreateCardApiProps,
  CreateCardApiReq,
  CreateCardApiRes,
} from "@/services/user/card/create/types/index";

async function CardCreateApi({
  type,
  user_id,
  card_number,
  name_holder,
  cpf_holder,
  card_network,
  expiration_date,
  cvv,
  card_nickname,
}: CreateCardApiProps): Promise<CreateCardApiRes> {
  const api = process.env.API;
  try {
    const response: AxiosResponse<CreateCardApiReq> = await axios.post(
      `${api}card/create`,
      {
        type,
        user_id,
        card_number,
        name_holder,
        cpf_holder,
        card_network,
        expiration_date,
        cvv,
        card_nickname,
      }
    );

    if (response.status === 201 && response.data && response.data.msg) {
      return {
        data: {
          msg: response?.data?.msg,
        },
        error: null,
        status: response.status,
      };
    } else {
      return {
        data: {
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
        msg: error.response?.data?.msg || null,
      },
      error: error.response?.data?.msg || "Unknown error.",
      status: error.response?.status || 500,
    };
  }
}
export { CardCreateApi };
