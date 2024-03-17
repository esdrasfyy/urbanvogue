import { ProductI } from "../../../../interfaces/product/card/index"
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
    products: Product;
  }
  
  export interface CartItemProps {
    key: number;
    dataCart: CartSummary;
    dataId: ProductI | null;
    quantity: number;
    size: string;
    id: number;
    index: number;
    color: string;
    isLastItem: boolean;
  }