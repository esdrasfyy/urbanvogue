import {SearchInputUi} from "@/components/ui/inputs/search/index";
import React from "react";
import {GridHome} from "@/components/home/grid/index";
import {SlideProducts } from "@/components/carousel/index";

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
        query="categoria=moda-fitness"
        category="FITNESS FASHION"
      />
    </main>
  );
}
