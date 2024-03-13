import React, { useContext } from 'react'
import Image from "next/image";
import logo from "@/assets/urban-vogue/bird-logo.png";
import Link from "next/link";
import {SearchInputUi} from "@/components/ui/inputs/search/index";
import ButtonsHeader from "@/components/header/sub-components/index";


async function Header() {
  return (
    <>
      <header className="flex justify-between items-center bg-custom-grayTwo py-4 px-7 beforeEffect afterEffect absolute top-0 left-0 w-full z-50 max-sm:px-3 shadow-snipped">
        <Link className="flex w-fit gap-3 items-center" href={"/"}>
          <Image
            src={logo}
            alt="logo image"
            width={35}
            height={35}
            className=""
          />
          <p className="max-w-[80px] leading-5 text-[15px] tracking-widest text-white max-md:text-base max-sm:text-sm">
            URBAN VOGUE
          </p>
        </Link>
        <SearchInputUi classname="max-md:hidden w-[60%]"/>
        <ul className="flex gap-6 items-center justify-center mt-1">
        <ButtonsHeader/>
         
        </ul>
      </header>
    </>
  );
}

export {Header};