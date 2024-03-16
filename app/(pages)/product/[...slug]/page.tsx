"use client";
import React, { Suspense, useEffect, useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

import { Divider, useDisclosure } from "@chakra-ui/react";
import { Accordions } from "@/(pages)/product/[...slug]/components/accordions/index";
import { ProductPageI } from "@/interfaces/product/card/index";
import { ProductByIdApi } from "@/services/products-by-ids";
import Comments from "@/(pages)/product/[...slug]/components/comments/index";
import { RatingView } from "@/components/ui/rating/rating-view/index";
import { SlideProducts } from "@/components/carousel/index";
import Loading from "./loading";
import { ModalImage } from "./components/modal-image";
import { LeftSide } from "./components/left-side";
import { RightSide } from "./components/right-side";

interface ApiResponse {
  data: ProductResponse | any[];
  status: number;
}

interface ProductResponse {
  products: ProductPageI[];
  notFoundIds: number[];
}

function Page({ params }: any) {
  const [dataProduct, setDataProduct] = useState<ProductPageI | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const id = params.slug[0];

      await ProductByIdApi({ id }).then((response) => {
        if (response.status === 200) {
          if (response?.data?.product) {
            setDataProduct(response.data.product);
          }
        }
      });
    };
    if (params.slug[0] && parseInt(params.slug[0])) {
      fetchData();
    }
  }, [params.slug]);


  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <main className="h-full w-full max-w-[1050px] flex flex-col items-center justify-center">
        {dataProduct && (
          <Suspense fallback={<Loading />}>
            <section className="h-full mt-28 bg-custom-grayTwo max-w-[1050px] w-full mx-12 max-md:mx-2 p-4 shadow-snipped text-custom-textColor rounded-md">
              <div className="flex w-full h-[573px] gap-4 flex-col max-md:h-auto">
                <div className="flex w-full justify-between max-md:flex-col max-md:gap-3">
                  <div className="flex text-base items-center text-custom-textColor max-md:text-xs">
                    <span>SHOP</span>
                    <span className="text-2xl">
                      <MdKeyboardDoubleArrowRight className="" />
                    </span>
                    <span className="line-clamp-1 text-custom-pink underline uppercase">
                      {dataProduct?.title.split("-")[1]}
                    </span>
                  </div>
                  <div className="flex justify-between font-normal gap-12">
                    <div className="flex items-center gap-3">
                      <span>{dataProduct?.rating.toFixed(1)}</span>
                      <span className="flex text-custom-pink">
                        <RatingView rating={dataProduct?.rating || 3.0} />
                      </span>
                      <span className="flex gap-1">
                        {" "}
                        |{" "}
                        <span className="text-custom-pink">
                          {dataProduct?.quantityRatings}
                        </span>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span>{dataProduct?.sold}</span>
                      <span>sold</span>
                    </div>
                  </div>
                </div>
                <div className="flex w-full gap-3 h-full max-md:flex-col">
                  <LeftSide data={dataProduct}/>
                  <RightSide dataProduct={dataProduct}/>
                </div>
              </div>
              <Divider orientation="horizontal" className="mt-12" />
              {dataProduct && dataProduct.details.length > 0 && (
                <Accordions
                  details={dataProduct?.details}
                  summary={dataProduct?.summary}
                />
              )}
            </section>
            <section className=" mt-2 border-solid border-4 border-custom-grayTwo h-full bg-custom-grayOne max-w-[1050px] w-full mx-12 pb-12 max-md:mx-2 p-4 shadow-snipped text-custom-textColor flex flex-col gap-12 pt-12">
              <SlideProducts
                query="order_by=created_at:desc"
                category="NEWS"
                notArrow={true}
              />
              <SlideProducts
                query="order_by=created_at:desc"
                category="NEWS"
                notArrow={true}
              />
            </section>
            <Comments
              title={dataProduct?.title || " "}
              img={dataProduct?.images[0].url || " "}
              id={params.slug[0]}
              percentage={dataProduct?.percentage || 100}
              rating={dataProduct?.rating || 3.0}
              quantityRatings={dataProduct?.quantityRatings || 0}
            />
          </Suspense>
        )}
      </main>
    </>
  );
}

export default Page;
