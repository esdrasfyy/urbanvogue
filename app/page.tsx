import { SearchInputUi } from "./components/ui/inputs/search/index";
import React from "react";
import { GridHome } from "./components/home/grid/index";
import { SlideProducts } from "./components/carousel/index";
import { CarrouselBrands } from "./components/home/carrousel-brands";
import Image from "next/image";

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
        <CarrouselBrands />
        <div>
          <h3 className="font-extralight text-2xl text-custom-textColor mb-4 uppercase">
            venture into fashion
          </h3>

          <figure className="w-full h-[600px] relative rounded-md shadow-snipped max-lg:h-[530px] max-md:h-[470px] max-sm:h-[300px]">
            <Image
              alt="moda"
              fill
              src="https://firebasestorage.googleapis.com/v0/b/urban-vogue-br.appspot.com/o/images%2Fslogan(1).gif?alt=media&token=86f3fb3c-87fe-4ef6-b7d3-f65ac1e472a1"
            />
          </figure>
        </div>
      </section>
      <span className="my-5"></span>
      <SlideProducts query="order_by=created_at:desc" category="NEWS" />
      <span className="my-5"></span>
      <SlideProducts query="order_by=created_at:desc" category="NEWS" />
    </main>
  );
}
