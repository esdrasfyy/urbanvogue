import { UseDisclosureReturn } from "@chakra-ui/react";
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

export interface ContextCartProps {
  cartSummary: CartSummary | undefined;
  setCartSummary: React.Dispatch<React.SetStateAction<CartSummary | undefined>>;
  addItemToCart: (data: Product) => void;
  updateItemQuantity: (
    id: number,
    index: number,
    quantity: number,
    size: string,
    color: string
  ) => void;
  removeItemFromCart: (id: number, index: number) => void;
  productsCart: Product[];
  calcCartSum: (cartItems: Product[]) => CartSummary;
  disclosure: UseDisclosureReturn;
}