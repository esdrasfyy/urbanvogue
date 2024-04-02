"use client";
import { CardH } from "@/components/card/horizontal";
import { ContextCart } from "@/contexts/ContextCart";
import React, { useContext } from "react";

function ProductsGridCheckout() {
  const contextCart = useContext(ContextCart);

  if (!contextCart) {
    return;
  }
  const { cartResume } = contextCart;

  return (
    <ul>
      {cartResume?.products?.map((product: any, index, array) => {
        const isLastItem = index === array.length - 1;
        return (
          <CardH
            key={index}
            index={index}
            dataId={product}
            isLastItem={isLastItem}
          />
        );
      })}
    </ul>
  );
}

export { ProductsGridCheckout };
