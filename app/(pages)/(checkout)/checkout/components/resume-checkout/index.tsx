"use client";
import React, { useContext, useEffect } from "react";
import { TbShoppingCartDollar } from "react-icons/tb";
import { ContextCart } from "@/contexts/ContextCart";
import { ContextPay } from "@/contexts/ContextPay";
import { CouponResume } from "@/(pages)/(checkout)/checkout/components/resume-checkout/sub-components/coupon-resume/index";
import { FreightageResume } from "@/(pages)/(checkout)/checkout/components/resume-checkout/sub-components/freightage-resume/index";
import { RedirectApprove } from "./sub-components/redirect-approve";
function ResumeCheckout() {
  const contextCart = useContext(ContextCart);
  const contextPay = useContext(ContextPay);

  useEffect(() => {
    if (!contextCart || !contextPay) {
      return;
    }

    const { cartResume } = contextCart;
    const { setTotal } = contextPay;

    if (cartResume?.totalPrice) {
      setTotal(cartResume?.totalPrice);
    }
  }, [contextCart, contextPay]);

  if (!contextCart || !contextPay) {
    return;
  }
  const { cartResume } = contextCart;
  const { discount, total } = contextPay;

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
              $ {cartResume?.totalPrice?.toFixed(2)}
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
                + ${cartResume?.totalPrice?.toFixed(2)}
              </p>
              {discount && (
                <p className="text-red-600">- ${discount.toFixed(2)}</p>
              )}
            </div>
          </div>
        </div>
      </div>
     <RedirectApprove/>
    </div>
  );
}

export { ResumeCheckout };
