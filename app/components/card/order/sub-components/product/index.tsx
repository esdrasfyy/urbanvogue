import { ProductOrderI } from "@/interfaces/user/order";
import Image from "next/image";
import React from "react";
import { PiWarningOctagonBold } from "react-icons/pi";

function OrderProductCard({
  product,
  isLastItem,
}: {
  product: ProductOrderI;
  isLastItem: boolean;
}) {
  return (
    <li
      className={`flex flex-col gap-4 $ border-b-[1px] pb-6 border-custom-grayThree/50`}
    >
      <div className="flex gap-4 max-sm:gap-2">
        <div>
          <Image
            src={product.image}
            alt={product.image}
            width={110}
            height={110}
            className="w-16 max-md:w-24 rounded-md"
          />
        </div>
        <div className="w-full min-h-full flex flex-col justify-between">
          <div className="flex w-full justify-between gap-3 items-center">
            <div>
              <p className="line-clamp-1 max-sm:text-xs">{product.title}</p>
            </div>
            <div>
              <p className="font-semibold min-w-fit whitespace-nowrap max-sm:text-xs">
                <span className="text-custom-pink">$</span> {product.price}
              </p>
            </div>
          </div>
          <div className="flex w-full justify-between items-center">
            <div className="w-full flex gap-3 max-md:flex-col max-sm:gap-2">
              <button className="border-[1px] border-custom-pink border-solid h-fit py-1.5 max-sm:py-0.5 px-3 rounded-md text-sm max-sm:text-xs duration-300 ease-linear hover:bg-custom-pink ">
                Guarantee
              </button>
              <div className="flex gap-3 items-center max-sm:gap-1">
                <span className="text-custom-pink text-2xl">
                  <PiWarningOctagonBold />
                </span>
                <div className="text-[10px]">
                  <p className="line-clamp-1">The warranty period expires on: 12/05/2024</p>
                  <p className="line-clamp-1">The repentance period expired on: 12/13/2023</p>
                </div>
              </div>
            </div>
            <div className="relative w-full max-md:hidden">
              <div className="flex w-full gap-[10%] max-md:flex-col">
                <p className="uppercase text-xs text-custom-pink">
                  Quantity:
                  <span className="text-custom-textColor/50 ml-1 font-normal">
                    {" "}
                    {product.quantity}
                  </span>
                </p>
                {product.size && (
                  <p className="uppercase text-xs text-custom-pink">
                    Size:{" "}
                    <span className="text-custom-textColor/50 ml-1 font-normal">
                      {product.size}
                    </span>
                  </p>
                )}
                {product.color && (
                  <p className="uppercase text-xs text-custom-pink">
                    Variation:{" "}
                    <span className="text-custom-textColor/50 ml-1 font-normal">
                      {product.color}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full hidden max-md:flex">
        <div className="flex w-full gap-[10%] max-md:flex-col">
          <p className="uppercase text-xs text-custom-pink">
            Quantity:
            <span className="text-custom-textColor/50 ml-1 font-normal">
              {" "}
              {product.quantity}
            </span>
          </p>
          {product.size && (
            <p className="uppercase text-xs text-custom-pink">
              Size:{" "}
              <span className="text-custom-textColor/50 ml-1 font-normal">
                {product.size}
              </span>
            </p>
          )}
          {product.color && (
            <p className="uppercase text-xs text-custom-pink">
              Variation:{" "}
              <span className="text-custom-textColor/50 ml-1 font-normal">
                {product.color}
              </span>
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

export default OrderProductCard;
