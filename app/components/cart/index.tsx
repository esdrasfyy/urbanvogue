"use client";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Divider,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { ContextCart } from "../../contexts/ContextCart/index";
import { CardH } from "../card/horizontal/index";
import { Loading } from "./sub-components";
import { ProductCartI } from "@/contexts/ContextCart/types";


function Cart() {
  const context = useContext(ContextCart)!;
  const btnRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Drawer
        size={"lg"}
        isOpen={context.disclosure.isOpen}
        placement="right"
        onClose={context.disclosure.onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay
          bg="none"
          backdropFilter="saturate(150%) blur(4px)"
          backdropInvert="50%"
          backdropBlur="3px"
        />
        <DrawerContent backgroundColor={"#  "} textColor={"#d9d9d9"}>
          <DrawerCloseButton className="hover:text-custom-pink" />
          <DrawerHeader className="shadow-snipped bg-custom-grayTwo">
            SHOPPING CART
          </DrawerHeader>
          <Divider />
          <DrawerBody backgroundColor={"#171a1b"}>
            <ul className="flex flex-col gap-2">
              {context.cartResume?.products?.map(
                (product: ProductCartI, index, array) => {
                  const isLastItem = index === array.length - 1;
                  return (
                    <CardH
                      key={index}
                      index={index}
                      dataId={product}
                      isLastItem={isLastItem}
                    />
                  );
                }
              )}
            </ul>
          </DrawerBody>
          <Divider className="shadow-snipped" />
          <DrawerFooter
            backgroundColor={"#1d2123"}
            className="w-full flex justify-between"
          >
            <div className="flex justify-between w-full items-center max-sm:">
              <div className="text-xl text-custom-pink max-sm:text-base">
                TOTAL{" "}
                <span className="text-custom-textColor font-medium ml-2 max-sm:ml-0">
                  ${context?.cartResume?.totalPrice?.toFixed(2)}
                </span>
              </div>
              <Link
                href={"/checkout"}
                className={`group bg-none border-2 w-56 border-custom-pink flex gap-12 items-center pl-2 justify-center text-custom-textColor py-1 rounded text-lg duration-300 hover:bg-custom-pink max-sm:text-sm max-sm:w-48 `}
              >
                <span>Close order</span>
                <FaArrowRight className="transition-all ease-in-out -translate-x-7 group-hover:translate-x-0 duration-1000" />
              </Link>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export { Cart };
