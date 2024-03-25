import React, { createContext, ReactNode, useState, useEffect } from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";

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
}

const ContextCart = createContext<ContextCartProps | undefined>(undefined);

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [productsInCart, setProductsInCart] = useState<ProductCartI[]>([]);
  const [cartResume, setCartResume] = useState<CartSummary | null>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem("MyCart");
    if (storedCart) {
      const cartItems = Array.isArray(JSON.parse(storedCart))
        ? (JSON.parse(storedCart) as ProductCartI[])
        : [];

      setProductsInCart(cartItems);
      setCartResume(calcCartSum(cartItems));
    } else {
      setProductsInCart([]);
      setCartResume({ totalPrice: 0, totalQuantity: 0, products: [] });
    }
  }, []);

  useEffect(() => {
    console.log(cartResume);
  }, [cartResume]);

  const addItemToCart = (data: ProductCartI) => {
    let updatedCart: ProductCartI[];
    let existingProductIndex: number;

    if (!productsInCart || !Array.isArray(productsInCart)) {
      updatedCart = [{ ...data, quantity: data.quantity }];
    } else {
      existingProductIndex = productsInCart.findIndex(
        (product) =>
          product.id === data.id &&
          product.color === data.color &&
          product.size === data.size
      );

      if (existingProductIndex !== -1) {
        updatedCart = [...productsInCart];
        updatedCart[existingProductIndex].quantity += data.quantity;
      } else {
        updatedCart = [...productsInCart, { ...data, quantity: data.quantity }];
      }
    }

    localStorage.setItem("MyCart", JSON.stringify(updatedCart));
    setProductsInCart(updatedCart);
    setCartResume(calcCartSum(updatedCart));
  };

  const calcCartSum = (
    cartItems: ProductCartI[] | null | undefined
  ): CartSummary => {
    const defaultSummary: CartSummary = {
      totalPrice: 0,
      totalQuantity: 0,
      products: [],
    };

    if (!cartItems || !Array.isArray(cartItems)) {
      console.error("cartItems must be a non-null array", cartItems);
      return defaultSummary;
    }

    const { totalPrice, totalQuantity } = cartItems.reduce(
      (acc, { price, quantity }) => {
        return {
          totalPrice: +price * quantity + acc.totalPrice,
          totalQuantity: quantity + acc.totalQuantity,
        };
      },
      { totalPrice: 0, totalQuantity: 0 }
    );

    return {
      totalPrice,
      totalQuantity,
      products: cartItems,
    };
  };

  const disclosure = useDisclosure();
  const contextValue: ContextCartProps = {
    disclosure,
    cartResume,
    setCartResume,
    productsInCart,
    setProductsInCart,
    addItemToCart,
  };

  return (
    <ContextCart.Provider value={contextValue}>{children}</ContextCart.Provider>
  );
};

export { ContextCart, CartProvider };
