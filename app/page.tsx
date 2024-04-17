import { SearchInputUi } from "./components/ui/inputs/search/index";
import React from "react";
import { GridHome } from "./components/home/grid/index";
import { SlideProducts } from "./components/carousel/index";
import { CarrouselBrands } from "./components/home/carrousel-brands";
import Image from "next/image";
import adOne from "@/assets/home/propaganda1.webp"
import adTwo from "@/assets/home/propaganda2.webp"

export default function Home() {
  return (
    <main className="flex min-h-screen max-w-[1050px] w-full  flex-col items-center mt-24 px-4">
      <aside className="flex w-full justify-center mt-4 md:hidden">
        <SearchInputUi classname="min-md:hidden w-full" />
      </aside>
      <span className="my-5"></span>
      <GridHome />
      <span className="my-5"></span>
      <SlideProducts query="order_by=created_at:desc" category="NEWS" />

      <span className="my-5"></span>
      <SlideProducts
        query="categoria=moda-feminina"
        category="FITNESS FASHION"
      />
      <span className="my-5"></span>
      <SlideProducts query="order_by=created_at:desc" category="NEWS" />
      <section className="w-full mt-14 flex gap-5 flex-col-reverse">
        <div className="flex gap-5 mt-8 max-md:flex-wrap">
          <Image src={adOne} alt="ad" className="w-full grayscale rounded-md shadow-snipped"/>
          <Image src={adTwo} alt="ad" className="w-full grayscale rounded-md shadow-snipped" />
        </div>
        <CarrouselBrands />
        <div>
          <h3 className="font-extralight text-2xl text-custom-textColor mb-4 uppercase">
            venture into fashion
          </h3>

         <video src="https://firebasestorage.googleapis.com/v0/b/urban-vogue-br.appspot.com/o/images%2Fslogan.mp4?alt=media&token=f806cf48-9b51-4266-bfaf-ca36ff514ce8" muted controls={false} loop autoPlay></video>
        </div>
      </section>
      <span className="my-5"></span>
      <SlideProducts query="order_by=created_at:desc" category="NEWS" />
      <span className="my-5"></span>
      <SlideProducts query="order_by=created_at:desc" category="NEWS" />
    </main>
  );
}
