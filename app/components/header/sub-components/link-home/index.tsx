import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "@/assets/urban-vogue/bird-logo.png";

function LinkHome() {
  return (
    <a href={"/"} className='flex gap-3'>
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
  </a>
  )
}

export {LinkHome}