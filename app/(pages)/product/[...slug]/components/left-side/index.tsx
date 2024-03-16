import React, { useState } from "react";
import Image from "next/image";
import { RatingView } from "@/components/ui/rating/rating-view";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { ProductPageI } from "@/interfaces/product/card";
interface LeftSideProps {
  data: ProductPageI;
}
function LeftSide({ data }: LeftSideProps) {
  const [selectImage, setSelectImage] = useState(data.images[0].url);

  const handleImageClick = (url: string) => {
    setSelectImage(url);
  };
  return (
    <div className="w-[40%] h-full flex gap-4 max-md:w-full max-md:h-[530px]">
      <div>
        <ul className="flex flex-col gap-[16.5px] min-h-full">
          {data?.images &&
            data.images.slice(0, 5).map((imagem, index) => (
              <li
                className={`w-14 h-[93px]  cursor-pointer ${
                  selectImage === imagem.url
                    ? "border-2 border-solid border-custom-pink"
                    : "border-2 border-solid border-custom-grayThree opacity-40"
                } rounded-md relative`}
                key={index}
              >
                <Image
                  alt={imagem?.url}
                  loading="lazy"
                  blurDataURL={imagem?.url}
                  fill
                  src={imagem?.url}
                  onMouseOver={() => handleImageClick(imagem?.url)}
                  onClick={() => handleImageClick(imagem?.url)}
                  className="rounded-sm shadow-snipped w-full h-full"
                />
              </li>
            ))}
        </ul>
      </div>
      <div className="min-h-[100%] w-[100%] flex relative">
        {data?.images && data.images.length > 0 && (
          <Image
            loading="lazy"
            blurDataURL={selectImage}
            alt={selectImage}
            src={selectImage}
            fill
            className="cursor-zoom-in h-full w-full rounded-md shadow-snipped"
          />
        )}
      </div>
    </div>
  );
}

export { LeftSide };
