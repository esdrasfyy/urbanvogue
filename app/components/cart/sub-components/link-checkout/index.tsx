import React from "react";
import { FaArrowRight } from "react-icons/fa";

function LinkCheckout() {
  return (
    <a
      href={"/checkout"}
      className={`group bg-none border-2 w-56 border-custom-pink flex gap-12 items-center pl-2 justify-center text-custom-textColor py-1 rounded text-lg duration-300 hover:bg-custom-pink max-sm:text-sm max-sm:w-48 `}
    >
      <span>Close order</span>
      <FaArrowRight className="transition-all ease-in-out -translate-x-7 group-hover:translate-x-0 duration-1000" />
    </a>
  );
}

export { LinkCheckout };
