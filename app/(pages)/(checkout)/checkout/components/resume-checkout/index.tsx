"use client";
import React, { useContext, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { TbShoppingCartDollar } from "react-icons/tb";
import { ContextCart } from "@/contexts/ContextCart";
import { ContextPay } from "@/contexts/ContextPay";
import { CouponResume } from "@/(pages)/(checkout)/checkout/components/resume-checkout/sub-components/coupon-resume/index";
import { FreightageResume } from "@/(pages)/(checkout)/checkout/components/resume-checkout/sub-components/freightage-resume/index";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
function ResumeCheckout() {
  const router = useRouter();
  const toast = useToast();
  const contextCart = useContext(ContextCart);
  const contextPay = useContext(ContextPay);

  useEffect(() => {
    if (!contextCart || !contextPay) {
      return;
    }

    const { cartSummary } = contextCart;
    const { setTotal } = contextPay;

    if (cartSummary?.totalPrice) {
      setTotal(cartSummary?.totalPrice);
    }
  }, [contextCart, contextPay]);

  if (!contextCart || !contextPay) {
    return;
  }
  const { cartSummary } = contextCart;
  const { address, method, cardId, dataProducts, discount, total } = contextPay;

  const verifyData = () => {
    const errorMessages = [];

    if (!address) errorMessages.push("Please add a delivery address.");
    if (!method) errorMessages.push("Please add a payment method.");
    if (!dataProducts) errorMessages.push("Your shopping cart is empty.");
    if (!total) errorMessages.push("Interna Error.");
    if ((method === "credit_card" || method === "debit_card") && !cardId) {
      errorMessages.push("Please select a card to continue.");
    }

    if (errorMessages.length > 0) {
      errorMessages.forEach((message) => {
        toast({
          title: "Error in one of the fields!",
          description: message,
          status: "error",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
          position: "top-right",
        });
      });
      return;
    }

    router.push("/checkout/approve");
  };

  return (
    <div>
      <div className="text-xl flex gap-3 items-center">
        <span className="text-2xl text-custom-pink">
          <TbShoppingCartDollar />
        </span>
        <h2>RESUME</h2>
      </div>
      <div className="flex gap-2 items-center w-full mt-6">
        <div className="flex w-full justify-between">
          <div className="w-fit">
            <h4 className="border-b-2 border-custom-pink h-fit px-1 pb-1">
              SUBTOTAL
            </h4>
          </div>
          <div className="w-fit">
            <p className="font-semibold">
              $ {cartSummary?.totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <CouponResume />
      <FreightageResume />
      <div className="flex gap-2 items-center w-full  mt-4">
        <div className="flex w-full justify-between">
          <div className="flex gap-2">
            <h4 className="border-b-2 border-custom-pink h-fit px-1 pb-1">
              TOTAL
            </h4>
          </div>
          <div className="w-fit flex flex-col items-end justify-end">
            <p className="font-semibold mb-2">$ {total.toFixed(2)}</p>
            <div className="text-xs flex flex-col text-end">
              <p className="text-green-400">
                + ${cartSummary?.totalPrice.toFixed(2)}
              </p>
              {discount && (
                <p className="text-red-600">- ${discount.toFixed(2)}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={verifyData}
        className={`group bg-none border-2 border-custom-pink flex gap-12 items-center pl-2 justify-center max-sm:py-2 w-full mt-5 text-custom-textColor py-1 rounded text-lg duration-300 hover:bg-custom-pink`}
      >
        <span>CONTINUE</span>
        <FaArrowRight className="transition-all ease-in-out -translate-x-7 group-hover:translate-x-0 duration-1000" />
      </button>
    </div>
  );
}

export { ResumeCheckout };
