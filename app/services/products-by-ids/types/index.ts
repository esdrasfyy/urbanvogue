import { ProductI, ProductPageI } from "@/interfaces/product/card";

export interface ProductsByIdsProps {
    ids: string;
  }
  export interface ProductsByIdsApi {
    products: ProductI | null;
    msg: string | null;
  }
  export interface ProductsByIdsResponse {
    data: ProductsByIdsApi | null;
    error: string | null;
    status: number;
  }
  
  
  export interface ProductByIdProps {
    id: string;
  }
  export interface ProductByIdApi {
    product: ProductPageI | null;
    msg: string | null;
  }
  export interface ProductByIdResponse {
      data: ProductsByIdsApi | null;
      error: string | null;
      status: number;
    }
  