import axios, { AxiosResponse } from "axios";
import { CardReadApiRes, CardReadApiReq } from "@/services/user/card/read/types/index";

async function CardReadApi(id: number): Promise<CardReadApiRes> {
  console.log("teste");
  
  const api = process.env.API;
  try {
    if (!id) {
      throw new Error("ID parameter is empty or undefined.");
    }
    const response: AxiosResponse<CardReadApiReq | null> = await axios.get(
      `${api}card/${id}`
    );
    console.log(response);
    
    if (response.status === 200) {
      return {
        data: {
          cards: response?.data?.cards || null,
          msg: response?.data?.msg || null,
        },
        error: null,
        status: response.status,
      };
    }
    if (response.status !== 200 && response.status !== 500) {
      return {
        data: {
          cards: null,
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
        cards: null,
        msg: error.response.data.msg || null,
      },
      error: error.response.data.msg || "Unknown error.",
      status: error.response.status,
    };
  }
}

export { CardReadApi };
