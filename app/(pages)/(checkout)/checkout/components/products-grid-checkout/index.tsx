"use client"
import { CardH } from "@/components/card/horizontal";
import { ContextCart } from "@/contexts/ContextCart";
import { ContextPay } from "@/contexts/ContextPay";
import { ProductI } from "@/interfaces/product/card";
import React, { useContext } from "react";

function ProductsGridPay() {
  const contextCart = useContext(ContextCart);
  const contextPay = useContext(ContextPay);

  if (!contextCart || !contextPay) {
    return;
  }
  const { cartSummary } = contextCart;
  const { dataProducts } = contextPay;

  return (
    <ul>
      {cartSummary?.products.map((product: any, index, array) => {
        const matchingProduct =
          dataProducts &&
          (dataProducts.find(
            (dataProduct) => dataProduct.id === product.id
          ) as ProductI | null);

        const isLastItem = index === array.length - 1;
        return (
          <CardH
            key={index}
            dataCart={product}
            quantity={product.quantity}
            id={product.id}
            index={index}
            size={product.size || "default"}
            color={product.color || "default"}
            dataId={matchingProduct}
            isLastItem={isLastItem}
          />
        );
      })}
    </ul>
  );
}

export { ProductsGridPay };
