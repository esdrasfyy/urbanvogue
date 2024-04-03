import Image from "next/image";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { ProductI } from "../../../interfaces/product/card/index";
import { PiShoppingCartSimple } from "react-icons/pi";
import { IoIosHeartEmpty } from "react-icons/io";
import { ContextCart } from "../../../contexts/ContextCart";
import { ProductCartI } from "@/contexts/ContextCart/types";
interface CardProps {
  data: ProductI;
}

function CardV({ data }: CardProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const context = useContext(ContextCart);

  if (!context) {
    return null;
  }
  const { addItemToCart } = context;

  const handleAddItem = () => {
    const add: ProductCartI = {
      id: data?.id || 0,
      quantity: 1,
      price: data.price,
      size: data && data.sizes && data.sizes.length > 0 ? data.sizes[0].size : "",
      color: data && data.colors && data.colors.length > 0 ? data.colors[0].name_color : "",
      image: data?.images[0]?.url,
      title: data?.title,
      colors: data?.colors,
      sizes: data?.sizes
    };

    if (add.id) {
      addItemToCart(add);
    }
  };

  const generateTitle = data.title.split(" ").join("&").toLowerCase();

  const parcelas = parseFloat(data.price) / 6;
  return (
    <div
      className="shadow-snipped rounded-md relative max-w-[164px] w-full group transition-transform ease-in-out duration-200 transform"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/product/${data.id}/${data.category}/${generateTitle}`}
        className="object-cover flex justify-center items-center overflow-hidden min-h-[227px]"
      >
        <Image
          width={300}
          height={200}
          loading="lazy"
          blurDataURL={isHovered ? data?.images[1]?.url : data?.images[0]?.url}
          src={isHovered ? data?.images[1]?.url : data?.images[0]?.url}
          alt="a"
          className="rounded-md shadow-snipped border-image h-auto bg-center max-h-[235px]"
        />
      </Link>
      <div className="py-2 px-1 flex-col flex justify-between min-h-[112px]">
        {" "}
        <Link href={`/product/${data.id}/${data.category}/${generateTitle}`}>
          <div>
            <h5 className="text-sm tracking-tight text-custom-textColor line-clamp-2 h-10">
              {data.title}
            </h5>
          </div>
          <div className="flex flex-col w-full justify-between">
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xl text-custom-pink">$ {data.price} </span>
              <span className="text-custom-grayThree text-xs">in cash</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-custom-textColor/40">
                {" "}
                6x of ${parcelas.toFixed(2)}
              </span>
            </div>
          </div>
        </Link>
      </div>
      <div className="soft-entry2 absolute z-40 top-2 gap-2 right-1.5  hidden group-hover:flex flex-col text-2xl max-sm:flex">
        <button
          className="w-10 h-10 rounded-full shadow-snipped bg-custom-pink/60 flex items-center justify-center text-custom-textColor font-medium  duration-200 transition-all ease-linear hover:bg-custom-pink cursor-pointer"
          onClick={handleAddItem}
        >
          <PiShoppingCartSimple />
        </button>
        <button className="w-10 h-10 rounded-full shadow-snipped bg-custom-grayTwo/60 flex items-center justify-center text-custom-textColor font-medium  duration-200 transition-all ease-linear hover:bg-custom-grayTwo cursor-pointer">
          <IoIosHeartEmpty />
        </button>
      </div>
    </div>
  );
}

export { CardV };
