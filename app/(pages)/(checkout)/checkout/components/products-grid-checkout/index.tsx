"use client"
import { CardH } from "@/components/card/horizontal";
import { ContextCart } from "@/contexts/ContextCart";
import { ContextPay } from "@/contexts/ContextPay";
import { ProductI } from "@/interfaces/product/card";
import React, { useContext } from "react";

function ProductsGridCheckout() {
  const contextCart = useContext(ContextCart);
  const contextPay = useContext(ContextPay);

  if (!contextCart || !contextPay) {
    return;
  }
  const { cartResume } = contextCart;
  const { dataProducts } = contextPay;

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
