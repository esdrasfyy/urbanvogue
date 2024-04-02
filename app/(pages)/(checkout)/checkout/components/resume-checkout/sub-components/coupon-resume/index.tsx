import {
  ApiResponse,
  Inputs,
  schema,
} from "@/(pages)/(checkout)/checkout/components/resume-checkout/sub-components/coupon-resume/types/index";
import { ValidadeCoupon } from "@/services/coupons/validate-coupon";
import { SlArrowRightCircle, SlClose } from "react-icons/sl";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputUi } from "@/components/ui/inputs/default";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { ContextCart } from "@/contexts/ContextCart";
import React, { useContext, useState } from "react";
import { ContextPay } from "@/contexts/ContextPay";

function CouponResume() {
    const [couponData, setCouponData] = useState<ApiResponse | null>(null);
    const contextCart = useContext(ContextCart);
    const contextPay = useContext(ContextPay);
    const [loading, setLoading] = useState();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Inputs>({ resolver: yupResolver(schema) });
    
  if (!contextCart || !contextPay) {
    return;
  }
  const { cartResume } = contextCart;
  const { total, setTotal, setDiscount, setCoupon } = contextPay;


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const code = data.code;
    const ids: number[] = [];
    if (cartResume?.products) {
      for (const products of cartResume?.products) {
        ids.push(products.id);
      }
    }
    try {
      const res: ApiResponse = await ValidadeCoupon(code, ids);
      if (res.status === 200) {
        const percentage = res.data?.percentage || 0;
        const disc = (total * percentage) / 100;
        setDiscount(disc);
        setCoupon(code)
        const value = total - disc;
        setTotal(value);
      }
      setCouponData(res);
    } catch (error) {
      alert("cep nao pesquisado");
    } finally {
    }
  };
  const resetCoupon = () => {
    setCouponData(null);
    setTotal(cartResume?.totalPrice || 0);
    setDiscount(null);
  };
  return (
    <>
      <form className="flex-col mt-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex gap-2 items-center relative">
          <div className="flex w-full flex-col">
            <InputUi
              type="text"
              pleaceholder="SALE20"
              label="PROMOTIONAL CODE"
              name="code"
              value={couponData?.data?.code}
              classname="shadow-snipped"
              register={register}
              error={errors?.code?.message}
              disabled={
                loading ? true : false || couponData?.data?.code ? true : false
              }
            />
          </div>
          {couponData?.status === 200 ? (
            <span
              className="py-3.5 rounded-sm absolute right-4 top-6 z-10 flex items-center justify-center cursor-pointer text-2xl"
              onClick={resetCoupon}
            >
              <SlClose />
            </span>
          ) : (
            <button
              type="submit"
              className="py-3.5 rounded-sm absolute right-4 top-6 z-10 flex items-center justify-center text-2xl"
            >
              <SlArrowRightCircle />
            </button>
          )}
        </div>
      </form>
      {couponData && couponData.status === 200 && (
        <div className="w-full bg-white/5 px-3 py-2 rounded-md shadow-snipped flex flex-col gap-1">
          <h1 className="flex gap-3 text-custom-pink items-center font-semibold">
            {couponData?.data?.msg}{" "}
            <span className="">
              <RiVerifiedBadgeFill />
            </span>
          </h1>
          <p className="text-custom-textColor/35 text-sm">
            {couponData?.data?.description}
          </p>
        </div>
      )}
      {couponData && couponData.status >= 401 && couponData.status <= 501 && (
        <div className="w-full bg-white/5 px-3 py-2 rounded-md shadow-snipped flex flex-col gap-1">
          <h4 className="flex gap-3 text-custom-pink items-center font-semibold">
            {couponData?.error}{" "}
          </h4>
        </div>
      )}
    </>
  );
}

export { CouponResume };
