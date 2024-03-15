"use client";
import { Select } from "@chakra-ui/react";
import { TbArrowBadgeDown, TbArrowBadgeUp } from "react-icons/tb";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";
import { ContextCart } from "@/contexts/ContextCart/index";
import Link from "next/link";
import { CartItemProps } from "@/components/card/horizontal/types/index";
import { LoadingSpinner } from "@/components/ui/loading";
import { ImSpinner9 } from "react-icons/im";

function CardH({
  dataId,
  id,
  index,
  quantity,
  color,
  isLastItem,
  size,
}: CartItemProps) {
  const [arrow1, setArrow1] = useState<boolean>(false);
  const [arrow2, setArrow2] = useState<boolean>(false);
  const [qtd, setQtd] = useState<number>(quantity || 1);
  const [selectSize, setSelectSize] = useState<string>(size);
  const [selectColor, setSelectColor] = useState<string>(color);
  const [loadingRemove, setLoadingRemove] = useState<boolean>(false);
  const price = parseFloat(dataId?.price || "0.00");

  const installment = price / 6;

  const context = useContext(ContextCart);

  useEffect(() => {
    if (context) {
      const { updateItemQuantity } = context;

      const updatedColor = selectColor !== undefined ? selectColor : "default";
      const updatedSize = selectSize !== undefined ? selectSize : "default";
      if (updateItemQuantity) {
        updateItemQuantity(id, index, qtd, updatedSize, updatedColor);
      }
    }
  }, [id, index, context, qtd, selectColor, selectSize]);

  if (!context) {
    return null;
  }
  const { removeItemFromCart } = context;

  const generateTitle = dataId?.title?.split(" ").join("&").toLowerCase();
  const removeItem = async () => {
    try {
      setLoadingRemove(true);
      removeItemFromCart(id, index);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingRemove(false);
    }
  };
  const handleQtd = (signal: "-" | "+") => {
    if (signal === "-" && qtd > 1) {
      return setQtd(qtd - 1);
    }
    if (signal === "+") {
      return setQtd(qtd + 1);
    }
  };
  return (
    <li
      className={`${
        isLastItem
          ? ""
          : "border-solid border-b-[1px] pb-6 border-custom-grayThree"
      } mt-4 flex flex-col items-start gap-2  w-full`}
    >
      <div className="w-full flex gap-3">
        <div className="flex gap-2 max-w-[70px] min-w-[70px] h-[110px] max-sm:h-[100px]">
          <Link
            href={`/shop/product/${dataId?.id}/${generateTitle}`}
            className="shadow-snipped object-contain"
          >
            <Image
              src={dataId?.images[0].url || ""}
              alt={dataId?.images[0].url || ""}
              loading="lazy"
              blurDataURL={dataId?.images[0].url || ""}
              width={100}
              height={100}
              className="h-full rounded-md"
            />
          </Link>
        </div>
        <div className="flex w-full flex-col justify-between h-[110px]">
          <div className="w-full flex max-sm:flex-col justify-between h-full">
            <div className="flex justify-start mr-5 flex-col max-sm:mr-0 w-full">
              <Link href={`/product/${dataId?.id}/${generateTitle}`}>
                <h3 className="line-clamp-1 duration-300 ease-linear hover:underline cursor-pointer w-full">
                  {dataId?.title}
                </h3>
              </Link>
              <div>
                <p className="text-custom-pink text-xl">
                  $ {price}{" "}
                  <span className="text-sm text-custom-grayThree">
                    {" "}
                    or in 6x of {installment.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex w-[70%] justify-end items-start gap-[10%] max-sm:justify-between max-sm:items-end max-sm:mb-1 max-sm:w-full">
              <div className="flex items-center">
                <div className="relative flex items-center">
                  <button
                    type="button"
                    onClick={() => handleQtd("-")}
                    id="decrement-button"
                    data-input-counter-decrement="counter-input"
                    className="flex-shrink-0 shadow-snipped bg-custom-grayTwo hover:bg-custom-grayOne duration-300 ease-linear inline-flex items-center justify-center border border-custom-pink h-7 w-7 focus:ring-custom-pink dark:focus:ring-gray-700 focus:ring-1 focus:outline-none rounded-full"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-custom-pink dark:text-white"
                      aria-hidden="true"
                      xmlns="http:
                    //www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <input
                    type="number"
                    className="flex-shrink-0 text-custom-pink font-extrabold dark:text-white border-0 bg-transparent text-lg focus:outline-none focus:ring-0 max-w-[3rem] text-center"
                    value={qtd}
                  />
                  <button
                    type="button"
                    id="increment-button"
                    data-input-counter-increment="counter-input"
                    className="flex-shrink-0 bg-custom-grayTwo shadow-snipped hover:bg-custom-grayOne duration-300 ease-linear inline-flex items-center justify-center border border-custom-pink h-7 w-7 focus:ring-custom-pink dark:focus:ring-gray-700 focus:ring-1 focus:outline-none rounded-full"
                    onClick={() => handleQtd("+")}
                  >
                    <svg
                      className="w-3.5 h-3.5 text-custom-pink dark:text-white"
                      aria-hidden="true"
                      xmlns="http:
                    //www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="h-[42px] flex items-center max-sm:h-full">
                <button
                  className="flex items-center text-2xl hover:text-custom-pink duration-200 ease-linear hover:scale-110"
                  onClick={removeItem}
                >
                  <RiDeleteBinLine />
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-2 max-sm:hidden">
            {dataId && dataId.sizes.length !== 0 && (
              <Select
                iconColor="#ed145b"
                icon={arrow1 ? <TbArrowBadgeUp /> : <TbArrowBadgeDown />}
                onBlur={() => setArrow1(false)}
                defaultValue={selectSize}
                onClick={() => setArrow1(!arrow1)}
                onChange={(e) => setSelectSize(e.target.value)}
                _focus={{
                  borderColor: "#ed145b",
                  boxShadow: "0 0 0 1px #ed145b",
                }}
                className="p-0 shadow-snipped border-[10px] border-solid rounded-md outline-none focus:ring-custom-pink cursor-pointer focus:border-custom-pink"
              >
                {dataId?.sizes.map((size) => (
                  <option defaultValue={size.size} key={size.size}>
                    {size.size}
                  </option>
                ))}
              </Select>
            )}
            {dataId && dataId.colors.length !== 0 && (
              <Select
                iconColor="#ed145b"
                icon={arrow2 ? <TbArrowBadgeUp /> : <TbArrowBadgeDown />}
                onBlur={() => setArrow2(false)}
                onClick={() => setArrow2(!arrow2)}
                defaultValue={selectColor}
                onChange={(e) => setSelectColor(e.target.value)}
                _focus={{
                  borderColor: "#ed145b",
                  boxShadow: "0 0 0 1px #ed145b",
                }}
                className="p-0 shadow-snipped border-[10px] border-solid rounded-md outline-none focus:ring-custom-pink cursor-pointer focus:border-custom-pink"
              >
                {dataId.colors.map((color) => (
                  <option key={color.name_color} defaultValue={color.name_color}>
                    {color.name_color}
                  </option>
                ))}
              </Select>
            )}
          </div>
        </div>
      </div>
      <div className="hidden gap-2 max-sm:flex w-full">
        {dataId && dataId.sizes.length !== 0 && (
          <Select
            iconColor="#ed145b"
            icon={arrow1 ? <TbArrowBadgeUp /> : <TbArrowBadgeDown />}
            onBlur={() => setArrow1(false)}
            defaultValue={selectSize}
            onClick={() => setArrow1(!arrow1)}
            onChange={(e) => setSelectSize(e.target.value)}
            _focus={{
              borderColor: "#ed145b",
              boxShadow: "0 0 0 1px #ed145b",
            }}
            className="w-full p-0 shadow-snipped border-[10px] border-solid rounded-md outline-none focus:ring-custom-pink cursor-pointer focus:border-custom-pink"
          >
            {dataId?.sizes.map((size) => (
              <option defaultValue={size.size} key={size.size}>
                {size.size}
              </option>
            ))}
          </Select>
        )}
        {dataId && dataId.colors.length !== 0 && (
          <Select
            iconColor="#ed145b"
            icon={arrow2 ? <TbArrowBadgeUp /> : <TbArrowBadgeDown />}
            onBlur={() => setArrow2(false)}
            onClick={() => setArrow2(!arrow2)}
            defaultValue={selectColor}
            onChange={(e) => setSelectColor(e.target.value)}
            _focus={{
              borderColor: "#ed145b",
              boxShadow: "0 0 0 1px #ed145b",
            }}
            className=" w-full p-0 shadow-snipped border-[10px] border-solid rounded-md outline-none focus:ring-custom-pink cursor-pointer focus:border-custom-pink"
          >
            {dataId.colors.map((color) => (
              <option key={color.name_color} defaultValue={color.name_color}>
                {color.name_color}
              </option>
            ))}
          </Select>
        )}
      </div>
    </li>
  );
}
export { CardH };
