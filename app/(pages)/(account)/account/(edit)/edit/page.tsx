import {FormEdit} from "./sub-components/form";
import React from "react";

function Edit() {
  return (
    <>
      <section className="min-h-screen w-full flex items-start justify-center bg-custom-grayOne px-4">
        <main className="max-w-[1050px] w-full bg-custom-grayTwo flex  shadow-snipped relative h-fit  flex-col mt-28 mb-36 rounded-md">
          <span
            className="absolute left-0 w-full h-24
         bg-custom-grayThree shadow-snipped dark:bg-custom-grayThree z-0 rounded-md"
          ></span>
          <FormEdit />
        </main>
      </section>
    </>
  );
}
export default Edit;
