import React from "react";

function GridHome() {
  return (
    <section className="gridHome">
      {" "}
      <div className="grid-item-1 group duration-300 transition-all ease-linear overflow-hidden shadow-snipped rounded-md cursor-pointer">
        <span className="absolute w-9 group-hover:-translate-x-8 writing uppercase flex items-center text-custom-textColor justify-center bg-custom-grayThree h-full group-hover:w-0 duration-300 transition-all ease-linear max-sm:hidden">
          Woman
        </span>
        <div className="model1 group-hover:w-full duration-300 transition-all ease-linear overflow-hidden"></div>
        <span className="absolute bottom-0 h-9 hidden items-center justify-center text-xl uppercase tracking-[0.2em] text-custom-textColor w-full group-hover:h-0 group-hover:translate-y-4 bg-custom-grayThree duration-300 transition-all ease-linear max-sm:flex">
        Woman
        </span>
      </div>
      <div className="grid-item-2 group duration-300 transition-all ease-linear overflow-y-hidden shadow-snipped rounded-md cursor-pointer">
        <span className="absolute left-0 w-9 group-hover:-translate-x-8 writing uppercase items-center text-custom-textColor justify-center bg-custom-grayThree h-full group-hover:w-0 duration-300 transition-all ease-linear hidden max-md:flex max-md:text-[1.4em] max-sm:hidden">
          children
        </span>
        <div className="model2 group-hover:h-full duration-300 transition-all ease-linear overflow-hidden"></div>
        <span className="absolute bottom-0 h-9 flex items-center justify-center text-xl uppercase tracking-[0.2em] text-custom-textColor w-full group-hover:h-0 group-hover:translate-y-4 bg-custom-grayThree duration-300 transition-all ease-linear max-md:hidden max-sm:flex">
          children
        </span>
      </div>
      <div className="grid-item-3 group duration-300 transition-all ease-linear overflow-y-hidden shadow-snipped rounded-md cursor-pointer">
        <span className="absolute left-0 w-9 group-hover:-translate-x-8 writing uppercase items-center text-custom-textColor justify-center bg-custom-grayThree h-full group-hover:w-0 duration-300 transition-all ease-linear hidden max-md:flex max-md:text-[1.4em] max-sm:hidden">
          accessories
        </span>
        <div className="model3 group-hover:h-full duration-300 transition-all ease-linear overflow-hidden"></div>
        <span className="absolute bottom-0 h-9 flex items-center justify-center text-xl uppercase tracking-[0.2em] text-custom-textColor w-full group-hover:h-0 group-hover:translate-y-4 bg-custom-grayThree duration-300 transition-all ease-linear max-md:hidden max-sm:flex">
          accessories
        </span>
      </div>
      <div className="grid-item-4 group duration-300 transition-all ease-linear overflow-hidden shadow-snipped rounded-md cursor-pointer">
        <span className="absolute left-0 w-9 group-hover:-translate-x-8 writing uppercase flex items-center text-custom-textColor justify-center bg-custom-grayThree h-full group-hover:w-0 duration-300 transition-all ease-linear max-sm:hidden">
          Man
        </span>
        <div className="model4 group-hover:w-full duration-300 transition-all ease-linear overflow-hidden"></div>
        <span className="absolute bottom-0 h-9 hidden items-center justify-center text-xl uppercase tracking-[0.2em] text-custom-textColor w-full group-hover:h-0 group-hover:translate-y-4 bg-custom-grayThree duration-300 transition-all ease-linear max-sm:flex">
        Man
        </span>
      </div>
    </section>
  );
}

export {GridHome};
