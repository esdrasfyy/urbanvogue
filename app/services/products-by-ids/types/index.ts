import { ProductI, ProductPageI } from "@/interfaces/product/card";

export interface ProductsByIdsProps {
    ids: string;
  }
  export interface ProductsByIdsApiReq {
    products: ProductI[] | null;
    msg: string | null;
  }
  export interface ProductsByIdsResponse {
    data: ProductsByIdsApiReq | null;
    error: string | null;
    status: number;
  }
  
  
  export interface ProductByIdProps {
    id: string;
  }
  export interface ProductByIdApiReq {
    product: ProductPageI | null;
    msg: string | null;
  }
  export interface ProductByIdResponse {
      data: ProductByIdApiReq | null;
      error: string | null;
      status: number;
    }
  