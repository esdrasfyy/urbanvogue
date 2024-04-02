import React from "react";
import master from "@/assets/networks/master.svg";
import visa from "@/assets/networks/visa.png";
import elo from "@/assets/networks/elo.webp";
import american from "@/assets/networks/american.webp";
import pix from "@/assets/networks/pix.png";
import loterica from "@/assets/networks/loterica.png";
import Image from "next/image";
import {BackTop} from "./components/back-top"
import { Divider } from "@chakra-ui/react";
function Footer() {
  return (
    <>
     <BackTop/>
      <footer className="flex justify-center items-center w-full text-custom-textColor bg-custom-grayTwo py-5 border-y border-solid border-custom-textColor/35">
        <div className="flex justify-between w-full items-start max-w-[1050px] max-md:flex-col mx-4">
          <section className="w-full border-custom-textColor/30 max-md:border-b max-md:mb-4 max-md:pb-4">
            <h3 className="text-custom-pink font-medium mb-3">ACCOUNT</h3>
            <ul className="flex flex-col gap-3">
              <li className="text-sm text-custom-textColor/60 uppercase cursor-pointer hover:text-custom-textColor duration-300 ease-linear max-md:text-xs">Your Account</li>
              <li className="text-sm text-custom-textColor/60 uppercase cursor-pointer hover:text-custom-textColor duration-300 ease-linear max-md:text-xs">Edit Account</li>
              <li className="text-sm text-custom-textColor/60 uppercase cursor-pointer hover:text-custom-textColor duration-300 ease-linear max-md:text-xs">Wallet</li>
              <li className="text-sm text-custom-textColor/60 uppercase cursor-pointer hover:text-custom-textColor duration-300 ease-linear max-md:text-xs">Orders</li>
              <li className="text-sm text-custom-textColor/60 uppercase cursor-pointer hover:text-custom-textColor duration-300 ease-linear max-md:text-xs">Gifts</li>
              <li className="text-sm text-custom-textColor/60 uppercase cursor-pointer hover:text-custom-textColor duration-300 ease-linear max-md:text-xs">Help</li>
            </ul>
          </section>
          <section className="w-full border-custom-textColor/30 max-md:border-b max-md:mb-4 max-md:pb-4">
            <h3 className="text-custom-pink font-medium mb-3">WHO WE ARE</h3>
            <ul className="flex flex-col gap-3">
              <li className="text-sm text-custom-textColor/60 uppercase cursor-pointer hover:text-custom-textColor duration-300 ease-linear max-md:text-xs">About Urban Vogue</li>
              <li className="text-sm text-custom-textColor/60 uppercase cursor-pointer hover:text-custom-textColor duration-300 ease-linear max-md:text-xs">Accessibility</li>
              <li className="text-sm text-custom-textColor/60 uppercase cursor-pointer hover:text-custom-textColor duration-300 ease-linear max-md:text-xs">Policies</li>
              <li className="text-sm text-custom-textColor/60 uppercase cursor-pointer hover:text-custom-textColor duration-300 ease-linear max-md:text-xs">Cookies policy</li>
              <li className="text-sm text-custom-textColor/60 uppercase cursor-pointer hover:text-custom-textColor duration-300 ease-linear max-md:text-xs">Privacy policy</li>
              <li className="text-sm text-custom-textColor/60 uppercase cursor-pointer hover:text-custom-textColor duration-300 ease-linear max-md:text-xs">Urban Vogue Awards</li>
            </ul>
          </section>
          <section className="w-full border-custom-textColor/30 max-md:border-b max-md:mb-4 max-md:pb-4">
            <h3 className="text-custom-pink font-medium mb-3">FAQs</h3>
            <ul className="flex flex-col gap-3">
              <li className="text-sm text-custom-textColor/60 uppercase cursor-pointer hover:text-custom-textColor duration-300 ease-linear max-md:text-xs">How to buy</li>
              <li className="text-sm text-custom-textColor/60 uppercase cursor-pointer hover:text-custom-textColor duration-300 ease-linear max-md:text-xs">it's trustable</li>
              <li className="text-sm text-custom-textColor/60 uppercase cursor-pointer hover:text-custom-textColor duration-300 ease-linear max-md:text-xs">Shipping and deadlines</li>
              <li className="text-sm text-custom-textColor/60 uppercase cursor-pointer hover:text-custom-textColor duration-300 ease-linear max-md:text-xs">Devolution</li>
              <li className="text-sm text-custom-textColor/60 uppercase cursor-pointer hover:text-custom-textColor duration-300 ease-linear max-md:text-xs">Methods Payment</li>
              <li className="text-sm text-custom-textColor/60 uppercase cursor-pointer hover:text-custom-textColor duration-300 ease-linear max-md:text-xs">Contact us</li>
            </ul>
          </section>
          <section className="w-full">
            <div>
              <h3 className="text-custom-pink font-medium mb-3">CONTACTS</h3>
              <ul>
                <li>
                  <h4 className="text-xs font-semibold uppercase mb-1 mt-2">Central SAC:</h4>
                  <p className="text-xs text-custom-textColor/60 mb-3">+55 (11) 2557-6909</p>
                </li>
                <li>
                  <h4 className="text-xs font-semibold uppercase mb-1">Email:</h4>
                  <p className="text-xs text-custom-textColor/60 mb-1">urbanvogue@cloud.com</p>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-custom-pink font-medium mb-3">PAYMENTS</h3>
              <ul className="flex gap-3 max-w-48 flex-wrap">
                <li className="w-14 h-9 bg-custom-grayThree/20 rounded-md flex justify-center items-center hover:bg-custom-grayThree duration-300 ease-linear">
                  <Image width={35} alt="mastercard" src={master} />
                </li>
                <li className="w-14 h-9  bg-custom-grayThree/20 rounded-md flex justify-center items-center hover:bg-custom-grayThree duration-300 ease-linear">
                  <Image width={35} alt="elo" src={elo} />
                </li>
                <li className="w-14 h-9  bg-custom-grayThree/20 rounded-md flex justify-center items-center hover:bg-custom-grayThree duration-300 ease-linear">
                  <Image width={35} alt="visa" src={visa} />
                </li>
                <li className="w-14 h-9  bg-custom-grayThree/20 rounded-md flex justify-center items-center hover:bg-custom-grayThree duration-300 ease-linear">
                  <Image width={35} alt="american" src={american} />
                </li>
                <li className="w-14 h-9  bg-custom-grayThree/20 rounded-md flex justify-center items-center hover:bg-custom-grayThree duration-300 ease-linear">
                  <Image width={55} alt="pix" src={pix} />
                </li>
                <li className="w-14 h-9  bg-custom-grayThree/20 rounded-md flex justify-center items-center hover:bg-custom-grayThree duration-300 ease-linear">
                  <Image width={20} alt="loterica" src={loterica} />
                </li>
              </ul>
            </div>
          </section>
        </div>
      </footer>
      <aside className="flex w-full text-custom-textColor/60 text-sm bg-custom-grayTwo/65 justify-center items-center py-3 rounded-md ">
        Desenvolvido por esdrasfyy
      </aside>
    </>
  );
}

export { Footer };
