import React from "react";
import { SearchInputUi } from "../ui/inputs/search/index";
import ButtonsHeader from "./sub-components/index";
import {LinkHome} from "./sub-components/link-home";

async function Header() {
  return (
    <>
      <header
        id="header"
        className="flex justify-between items-center bg-custom-grayTwo py-4 px-7 beforeEffect afterEffect absolute top-0 left-0 w-full z-50 max-sm:px-3 shadow-snipped"
      >
        <LinkHome />
        <SearchInputUi classname="max-md:hidden w-[60%]" />
        <ul className="flex gap-6 items-center justify-center mt-1">
          <ButtonsHeader />
        </ul>
      </header>
    </>
  );
}

export { Header };
