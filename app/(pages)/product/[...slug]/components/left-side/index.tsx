import { ProductPageI } from "../../../../../interfaces/product/card";
import { ThumbnailCarousel } from "../thumbnail";
import React, { useState } from "react";

interface LeftSideProps {
  data: ProductPageI;
}
function LeftSide({ data }: LeftSideProps) {
  const [selectImage, setSelectImage] = useState(data.images[0].url);

  const handleImageClick = (url: string) => {
    setSelectImage(url);
  };
  return (
    <div className="w-[40%] h-full flex gap-4 max-md:w-full max-md:h-[530px] flex-col">
     <ThumbnailCarousel handhleImageClick={handleImageClick} selectImage={selectImage} images={data?.images}/>
    </div>
  );
}

export { LeftSide };
