"use client";
import { CardH } from "@/components/card/horizontal";
import { ContextCart } from "@/contexts/ContextCart";
import { ContextPay } from "@/contexts/ContextPay";
import React, { useContext } from "react";
import { HiClipboardList } from "react-icons/hi";
import { ImSpinner9 } from "react-icons/im";

function ProductsGridCheckout() {
  const contextCart = useContext(ContextCart);
  const contextPay = useContext(ContextPay);
  if (!contextCart || !contextPay) {
    return;
  }
  const { cartResume } = contextCart;
  const {loading} = contextPay
  return (
    <>
      {loading && (
        <div className="text-custom-pink flex justify-center items-center w-full h-full absolute bg-custom-grayTwo/60 z-20 left-0 top-0">
          <ImSpinner9 className="animate-spin text-8xl" />
        </div>
      )}
       <h3 className="flex gap-3 items-center text-xl">
              <span className="text-custom-pink text-2xl">
                <HiClipboardList />
              </span>
              PRODUCTS
            </h3>
          <ul className="relative">
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
      </>
  );
}

export { ProductsGridCheckout };
