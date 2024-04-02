import { AddressI } from "../../../interfaces/address";
import { ProductI } from "../../../interfaces/product/card";

export interface Product {
  id: number;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}
export interface CartSummary {
  totalPrice: number;
  totalQuantity: number;
  products: Product[];
}
interface ProductResponse {
  products: ProductI[];
  notFoundIds: number[];
}

export interface ApiResponse {
  data: ProductResponse | any[];
  status: number;
}

export interface ContextPayProps {
  address: number | null;
  setAddress: React.Dispatch<React.SetStateAction<number | null>>;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  discount: number | null;
  setDiscount: React.Dispatch<React.SetStateAction<number |  null>>;
  cardId: string;
  setCardId: React.Dispatch<React.SetStateAction<string>>;
  method: string;
  setMethod: React.Dispatch<React.SetStateAction<string>>;
  dataAddress:  AddressI[];
  setDataAddress: React.Dispatch<React.SetStateAction< AddressI[]>>;
  dataProducts:  ProductI[] | null;
  setDataProducts: React.Dispatch<React.SetStateAction< ProductI[] | null>>;
  handleAddressDefalt: Function;
  handleDeleteAddress: Function;
  handleDataAddress: Function;
}
