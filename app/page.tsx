import { SearchInputUi } from "./components/ui/inputs/search/index";
import React from "react";
import { GridHome } from "./components/home/grid/index";
import { SlideProducts } from "./components/carousel/index";
import { SiNike } from "react-icons/si";

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
      <section className="w-full mt-14 flex gap-5 flex-col">
        <div className="w-full">
          <ul className="flex gap-4 w-full">
            <li className="gradient-gray text-5xl text-custom-textColor py-6 px-12 rounded-md shadpw-snipped">
              <SiNike />
            </li>
            <li className="gradient-gray text-5xl text-custom-textColor py-6 px-12 rounded-md shadpw-snipped">
              <SiNike />
            </li>
            <li className="gradient-gray text-5xl text-custom-textColor py-6 px-12 rounded-md shadpw-snipped">
              <SiNike />
            </li>
            <li className="gradient-gray text-5xl text-custom-textColor py-6 px-12 rounded-md shadpw-snipped">
              <SiNike />
            </li>
       
          </ul>
        </div>
        <div>
          <h3 className="font-extralight text-2xl text-custom-textColor mb-4 uppercase">
          venture into fashion
          </h3>

          <video  autoPlay loop muted src="https://firebasestorage.googleapis.com/v0/b/urban-vogue-br.appspot.com/o/images%2Fslogan.mp4?alt=media&token=ccd60a51-ec55-4358-9c52-a77b92f37105"></video>
        </div>
      </section>
    </main>
  );
}
