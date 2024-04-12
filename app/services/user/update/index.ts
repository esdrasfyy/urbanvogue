import axios, { AxiosResponse } from "axios";
import {
  UpdateUSerApiReq,
  UpdateUserApiResponse,
  UpdateUserApiProps,
} from "./types/index";

async function UpdateUserApi({
  birthdate,
  cpf,
  email,
  fullname,
  gender,
  phone,
  profile,
  userId,
  username,
}: UpdateUserApiProps): Promise<UpdateUserApiResponse> {
  const api = process.env.API;
  try {
    if (!userId) {
      throw new Error("userId parameter is empty or undefined.");
    }
    const response: AxiosResponse<UpdateUSerApiReq | null> = await axios.put(
      `${api}user/update`,{
        birthdate,
        cpf,
        email,
        fullname,
        gender,
        phone,
        profile_img: profile || null,
        user_id: userId,
        username,
      }
    );
 
    if (response.status === 200) {
      return {
        data: {
          user: response?.data?.user || null,
          msg: response?.data?.msg || null,
        },
        error: null,
        status: response.status,
      };
    }
    if (response.status !== 200 && response.status !== 500) {
      return {
        data: {
          user: null,
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
        user: null,
        msg: error.response.data.msg || null,
      },
      error: error.response.data.msg || "Unknown error.",
      status: error.response.status,
    };
  }
}

export { UpdateUserApi };
