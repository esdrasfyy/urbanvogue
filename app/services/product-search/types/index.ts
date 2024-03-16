import { ProductI } from "@/interfaces/product/card";

export interface ProductSearchApiProps {
    search: string;
  }
  interface FilterData {
    sizes: { [size: string]: number };
    colors: { [color: string]: number };
    categories: { [category: string]: number };
    brands: { [brand: string]: number };
  }
  export interface ProductSearchApiApiReq {
    filters: FilterData | null;
    products: ProductI[] | null;
    msg: string | null;
  }
  export interface ProductSearchApiResponse {
    data: ProductSearchApiApiReq | null;
    error: string | null;
    status: number;
  }
  