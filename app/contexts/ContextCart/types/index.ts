import { UseDisclosureReturn } from "@chakra-ui/react";

interface Size {
    size: string;
  }
  
  interface Color {
    name_color: string;
  }
  
  export interface ProductCartI {
    id: number;
    quantity: number;
    price: string;
    title: string;
    image: string;
    size?: string;
    color?: string;
    colors?: Color[];
    sizes?: Size[];
  }
  
  export interface CartSummary {
    totalPrice: number | null;
    totalQuantity: number | null;
    products: ProductCartI[] | null;
  }
  
  export interface ContextCartProps {
    disclosure: UseDisclosureReturn;
    cartResume: CartSummary | null;
    setCartResume: React.Dispatch<React.SetStateAction<CartSummary | null>>;
    productsInCart: ProductCartI[];
    setProductsInCart: React.Dispatch<React.SetStateAction<ProductCartI[]>>;
    addItemToCart: (data: ProductCartI) => void;
    removeItemFromCart: (id: number, index: number) => void;
    updateItemQuantity: (
      id: number,
      index: number,
      quantity: number,
      size: string,
      color: string
    ) => void;
  }