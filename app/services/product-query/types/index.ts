import { ProductI } from "@/interfaces/product/card";

export interface ProductQueryApiProps {
    query: string;
  }
  export interface ProductQueryApiApiReq {
    products: ProductI[] | null;
    msg: string | null;
  }
  export interface ProductQueryApiResponse {
    data: ProductQueryApiApiReq | null;
    error: string | null;
    status: number;
  }
  