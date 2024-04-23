"use client";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Accordions } from "./components/accordions/index";
import { RightSide } from "./components/right-side";
import Comments from "./components/comments/index";
import { LeftSide } from "./components/left-side";
import Loading from "./loading";
import { Suspense, useContext, useEffect, useState } from "react";
import { ProductPageI } from "@/interfaces/product/card";
import { ProductByIdApi } from "@/services/products-by-ids";
import { RatingView } from "@/components/ui/rating/rating-view";
import { SlideProducts } from "@/components/carousel";
import { ContextLoading } from "@/contexts/ContextLoading";
import { NextPage } from "next";

const Page: NextPage = ({ params }: any) => {
  const [dataCard, setDataCard] = useState<ProductPageI | null>(null);
  const contextLoading = useContext(ContextLoading)!;
  const { setLoading } = contextLoading;
  useEffect(() => {
    if (params.slug[1]) {
      document.title = `${params.slug[1]} - Urban Vogue`;
      const metaDescription = document.querySelector(
        `meta[name="description"]`
      );
      if (metaDescription) {
        metaDescription.setAttribute(
          `content`,
          `You are on the product page: ${params.slug[1]} , enjoy our offer`
        );
      }
      const ogTitle = document.querySelector(`meta[property="og:title"]`);
      if (ogTitle) {
        ogTitle.setAttribute(`content`, `${params.slug[1]} - Urban Vogue`);
      }
      const ogDescription = document.querySelector(
        `meta[property="og:description"]`
      );
      if (ogDescription) {
        ogDescription.setAttribute(
          `content`,
          `You are on the product page: ${params.slug[1]} , enjoy our offer`
        );
      }
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const id = params.slug[0];

        await ProductByIdApi({ id }).then((response) => {
          if (response.status === 200) {
            if (response?.data?.product) {
              setDataCard(response.data.product);
            }
          }
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.slug]);

  return (
    <>
      <main className="h-full w-full max-w-[1050px] flex flex-col items-center justify-center overflow-hidden px-4">
        {dataCard && (
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
                      {dataCard?.title.split("-")[1]}
                    </span>
                  </div>
                  <div className="flex justify-between font-normal gap-12">
                    <div className="flex items-center gap-3">
                      <span>{dataCard?.rating.toFixed(1)}</span>
                      <span className="flex text-custom-pink">
                        <RatingView rating={dataCard?.rating || 3.0} />
                      </span>
                      <span className="flex gap-1">
                        {" "}
                        |{" "}
                        <span className="text-custom-pink">
                          {dataCard?.quantityRatings}
                        </span>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span>{dataCard?.sold}</span>
                      <span>sold</span>
                    </div>
                  </div>
                </div>
                <div className="flex w-full gap-3 h-full max-md:flex-col">
                  <LeftSide data={dataCard} />
                  <RightSide dataProduct={dataCard} />
                </div>
              </div>
              {dataCard && dataCard.details.length > 0 && (
                <Accordions
                  details={dataCard?.details}
                  summary={dataCard?.summary}
                />
              )}
            </section>
            <section className="mt-2 border-solid border-4 border-custom-grayTwo h-full bg-custom-grayOne max-w-[1050px] w-full mx-12 pb-12 max-md:mx-2 p-4 shadow-snipped text-custom-textColor flex flex-col gap-12 pt-12 rounded-md">
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
              title={dataCard?.title || " "}
              img={dataCard?.images[0].url || " "}
              id={params.slug[0]}
              percentage={dataCard?.percentage || 100}
              rating={dataCard?.rating || 3.0}
              quantityRatings={dataCard?.quantityRatings || 0}
            />
          </Suspense>
        )}
      </main>
    </>
  );
};

export default Page;
