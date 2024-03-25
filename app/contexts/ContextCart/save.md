"use client";
import React, { createContext, useEffect, useState, ReactNode } from "react";
import { useDisclosure } from "@chakra-ui/react";

import {
  CartSummary,
  ContextCartProps,
  Product,
} from "@/contexts/ContextCart/types/index";

const ContextCart = createContext<ContextCartProps | undefined>(undefined);

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [productsCart, setProductsCart] = useState<Product[]>([]);
  const [cartSummary, setCartSummary] = useState<CartSummary>();

  useEffect(() => {
    const storedCart = localStorage.getItem("MyCart");
    if (storedCart) {
      const cartItems = Array.isArray(JSON.parse(storedCart))
        ? (JSON.parse(storedCart) as Product[])
        : [];

      setProductsCart(cartItems);
      setCartSummary(calcCartSum(cartItems));
    } else {
      setProductsCart([]);
      setCartSummary({ totalPrice: 0, totalQuantity: 0, products: [] });
    }
  }, []);

  const calcCartSum = (
    cartItems: Product[] | null | undefined
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
          totalPrice: price * quantity + acc.totalPrice,
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

  const addItemToCart = (data: Product) => {
    const { id, quantity, size, color } = data;
    const existingProduct = productsCart.find(
      (product) =>
        product.id === id && product.size === size && product.color === color
    );

    let updatedCart: Product[];

    if (!existingProduct) {
      updatedCart = Array.from(productsCart).concat({ ...data, quantity });
    } else {
      updatedCart = productsCart.map((product) =>
        product.id === id && product.size === size && product.color === color
          ? { ...product, quantity: product.quantity + quantity }
          : product
      );
    }

    setProductsCart((prevProductsCart) => updatedCart);
    
    localStorage.setItem("MyCart", JSON.stringify(updatedCart));
    setCartSummary(calcCartSum(updatedCart));
  };

  const removeItemFromCart = async (id: number, index: number) => {
    const updatedCart = await  productsCart.filter(
      (item, indexItem) => item.id !== id || indexItem !== index
    );
    setProductsCart((prevProductsCart) => updatedCart);
    localStorage.setItem("MyCart", JSON.stringify(updatedCart));
    setCartSummary(calcCartSum(updatedCart));
    return;
  };

  const updateItemQuantity = (
    id: number,
    index: number,
    quantity: number,
    size: string,
    color: string = "default"
  ) => {
    const updatedCart = productsCart.map((product, i) =>
      i === index && product.id === id
        ? { ...product, quantity, size, color }
        : product
    );

    setProductsCart((prevProductsCart) => updatedCart);
    localStorage.setItem("MyCart", JSON.stringify(updatedCart));
    setCartSummary(calcCartSum(updatedCart));
  };

  const disclosure = useDisclosure();

  const contextValue: ContextCartProps = {
    cartSummary,
    setCartSummary,
    productsCart,
    removeItemFromCart,
    updateItemQuantity,
    calcCartSum,
    addItemToCart,
    disclosure,
  };

  return (
    <ContextCart.Provider value={contextValue}>{children}</ContextCart.Provider>
  );
};

export { ContextCart, CartProvider };