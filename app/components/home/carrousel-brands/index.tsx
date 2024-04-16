"use client";
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { SiNike } from "react-icons/si";

function CarrouselBrands() {
  return (
    <div className="mt-8">
      <h3 className="font-extralight text-2xl text-custom-textColor mb-4 uppercase">
        Successful brands
      </h3>
      <Splide
        className="flex gap-4 p-2 overflow-x-hidden"
        options={{
          arrows: false,
          autoplay: true,
          perPage: 6,
          type: "loop",
          pagination: false,
          rewind: true,
          perMove: 5,
          width: "100%",
          gap: "15px",
          focus: "center",
          breakpoints: {
            479: {
              perPage: 2,
            },
            767: {
              perPage: 3,
            },
          },
        }}
        aria-label="My Favorite Images"
      >
        <SplideSlide className="ml-4">
          <div className="gradient-gray text-5xl text-custom-textColor w-36 flex justify-center items-center rounded-md shadow-snipped">
            <SiNike />
          </div>
        </SplideSlide>
        <SplideSlide className="ml-4">
          <div className="gradient-gray text-5xl text-custom-textColor w-36 flex justify-center items-center rounded-md shadow-snipped">
            <SiNike />
          </div>
        </SplideSlide>
        <SplideSlide className="ml-4">
          <div className="gradient-gray text-5xl text-custom-textColor w-36 flex justify-center items-center rounded-md shadow-snipped">
            <SiNike />
          </div>
        </SplideSlide>
        <SplideSlide className="ml-4">
          <div className="gradient-gray text-5xl text-custom-textColor w-36 flex justify-center items-center rounded-md shadow-snipped">
            <SiNike />
          </div>
        </SplideSlide>
        <SplideSlide className="ml-4">
          <div className="gradient-gray text-5xl text-custom-textColor w-36 flex justify-center items-center rounded-md shadow-snipped">
            <SiNike />
          </div>
        </SplideSlide>
        <SplideSlide className="ml-4">
          <div className="gradient-gray text-5xl text-custom-textColor w-36 flex justify-center items-center rounded-md shadow-snipped">
            <SiNike />
          </div>
        </SplideSlide>
        <SplideSlide className="ml-4">
          <div className="gradient-gray text-5xl text-custom-textColor w-36 flex justify-center items-center rounded-md shadow-snipped">
            <SiNike />
          </div>
        </SplideSlide>
        <SplideSlide className="ml-4">
          <div className="gradient-gray text-5xl text-custom-textColor w-36 flex justify-center items-center rounded-md shadow-snipped">
            <SiNike />
          </div>
        </SplideSlide>
      </Splide>
    </div>
  );
}

export { CarrouselBrands };
