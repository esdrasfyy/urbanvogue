import { NextPage } from "next";
import { FormEdit } from "./sub-components/form";
import React from "react";

const Edit: NextPage = () => {
  return (
    <>
      <section className=" w-full flex items-start justify-center bg-custom-grayOne px-4">
        <main className="max-w-[850px] w-full bg-custom-grayTwo flex  shadow-snipped relative h-fit  flex-col mt-28  rounded-md px-20 max-sm:px-4">
          <span
            className="absolute left-0 w-full h-24
         bg-custom-grayThree shadow-snipped dark:bg-custom-grayThree z-0 rounded-md"
          ></span>
          <FormEdit />
        </main>
      </section>
    </>
  );
};
export default Edit;
