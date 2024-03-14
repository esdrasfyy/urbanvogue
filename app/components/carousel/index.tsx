"use client";
import React, { useState, useEffect } from "react";
import { CardV } from "@/components/card/vertical/index";
import { ProductQueryApi } from "@/services/product-query/index";
import { ProductI } from "@/interfaces/product/card/index";
import Loading from "./sub-components/loading";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";
import "@splidejs/react-splide/css/core";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";

interface CarrosselShopProps {
  query: string;
  category: string;
  classname?: string;
}

function SlideProducts({ query, category, classname }: CarrosselShopProps) {
  const [data, setData] = useState<ProductI[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await ProductQueryApi({ query });
        if (
          result.status === 200 &&
          result?.data?.products &&
          result?.data?.products?.length > 0
        ) {
          return setData(result.data.products);
        }
        setData(null);
        return console.error("failed request in carousel.");
      } catch (error) {
        console.error("failed request in carousel.");
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <section className={`relative w-full ${classname}`}>
      <h3 className="font-extralight text-2xl text-custom-textColor mb-4">
        {category}
      </h3>
      <Splide
        hasTrack={false}
        options={{
          autoplay: true,
          perPage: 3,
          type: "loop",
          pagination: false,
          rewind: true,
          perMove: 1,
          padding: { right: "15rem" },
          width: "70%",
          gap: "15px",
          breakpoints: {
            767: {
              width: "100%",
              perPage: 2,
              padding: { right: "5rem" },
            },
            1000: {
              perPage: 1,
              padding: { right: "4rem" },
            },
            1200: {
              padding: { right: "8rem" },
            },
          },
        }}
        aria-label="My Favorite Images"
        className="w-full relative"
      >
        <SplideTrack>
          {(loading && !data) || data === null
            ? [...Array(10)].map((_, index) => (
                <SplideSlide
                  key={index}
                  className="shadow-snipped custom-slide flex flex-col bg-custom-grayTwo"
                >
                  <Loading />
                </SplideSlide>
              ))
            : data?.map((card: ProductI) => (
                <SplideSlide
                  key={card.id}
                  className="shadow-snipped custom-slide flex flex-col bg-custom-grayTwo"
                >
                  <CardV data={card} />
                </SplideSlide>
              ))}
        </SplideTrack>
        <div className="splide__progress mt-2">
          <div className="splide__progress__bar bg-custom-pink text-custom-pink" />
        </div>
        <div className="splide__arrows max-lg:hidden">
          <button className="splide__arrow splide__arrow--prev ">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z"
                  fill="#ed145b"
                ></path>{" "}
              </g>
            </svg>
          </button>
          <button className="splide__arrow splide__arrow--next">
            {" "}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z"
                  fill="#ed145b"
                ></path>{" "}
              </g>
            </svg>
          </button>
        </div>
      </Splide>
    </section>
  );
}

export { SlideProducts };
