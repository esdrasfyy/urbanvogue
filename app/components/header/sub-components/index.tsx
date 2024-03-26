"use client"
import { PiShoppingCartSimple, PiUserCirclePlus } from "react-icons/pi";
import { ContextCart } from "../../../contexts/ContextCart/index";
import { ContextUser } from '../../../contexts/ContextUser';
import { IoIosHeartEmpty } from 'react-icons/io';
import { LiaUserCircle } from 'react-icons/lia';
import React, { useContext } from 'react'
import Link from "next/link";


function ButtonsHeader() {
    const cart = useContext(ContextCart);
    const contextUser = useContext(ContextUser);
    
    if (!cart || !contextUser) {
      return;
    }
    
    const { disclosure: { onOpen: onOpenCart }, cartResume  } = cart;
    const { user } = contextUser;

  return (
    <ul className="flex gap-6 items-center justify-center mt-1">
          <li className=" text-3xl text-white duration-200 transition-all ease-linear hover:-translate-y-1.5 hover:text-custom-pink cursor-pointer max-md:text-[28px]">
            <button>
            <IoIosHeartEmpty />
            </button>
          </li>
          <li className="relative text-3xl text-white duration-200 transition-all ease-linear hover:-translate-y-1.5 group cursor-pointer max-md:text-[28px]" onClick={onOpenCart}>
            <button  className="group-hover:text-custom-pink">
            <PiShoppingCartSimple />
            </button>
          {cartResume?.totalQuantity && cartResume?.totalQuantity > 0 ? ( <span className='w-6 h-6 flex items-center justify-center absolute -top-2 -right-2 border-solid border-4  border-custom-grayTwo bg-red-600 rounded-full text-[10px] font-bold'>{cartResume?.totalQuantity}</span> ): ""}
          </li>
          <li className=" text-[30px] text-white duration-200 transition-all  -translate-y-1 ease-linear hover:-translate-y-2.5 hover:text-custom-pink cursor-pointer max-md:text-[28px]">
            <Link href={user ? "/account" : "/login"}>
              {user ? <LiaUserCircle /> :  <PiUserCirclePlus />}
            </Link>
          </li>
        </ul>
  )
}

export default ButtonsHeader