import Image from "next/image";
import React from "react";
import { FaWifi } from "react-icons/fa";
import master from "@/assets/networks/master.svg";
import visa from "@/assets/networks/visa.png";
import elo from "@/assets/networks/elo.webp";
import amex from "@/assets/networks/american.webp";
import chipset from "@/assets/chip.jpg";
import { StaticImageData } from "next/image";
interface ImageMap {
    [key: string]: StaticImageData | null;
  }
  
  const networkImageMap: ImageMap = {
    visa: visa,
    master: master,
    elo: elo,
    american: amex,
  };

  
interface CardProps {
  number: string;
  name: string;
  month: string;
  year: string;
  cvv: string;
  back: boolean;
  network: string;
}

function Card({ cvv, month, name, number, year, back, network }: CardProps) {
  const networkImage = networkImageMap[network] || elo;

  return (
    <div className={`card ${back && "backOn"} mx-4`}>
      <div className="front">
        <div className="flex justify-between mt-6 max-sm:mt-4.5 px-5 items-center">
          <div className="flex">
            <span className="rounded-lg">
              <Image
                className="rounded-[12px] w-12 max-sm:w-10 max-sm:rounded-[5px]"
                alt="chipset"
                width={0}
                src={chipset}
              />
            </span>
            <span className="text-2xl rotate-90 ml-2 text-custom-grayThree max-sm:text-xl">
              <FaWifi />
            </span>
          </div>
          <span className="h-20 max-sm:h-14 flex items-center">
            <Image alt="network" className="w-20" src={networkImage} width={0} height={0} />
          </span>
        </div>
        <div className="flex w-full justify-center px-3 gap-3 text-3xl font-medium mt-4 max-sm:text-2xl">
          {number ? number : "0000 0000 0000 0000"}
        </div>
        <div className="flex w-full justify-between px-6 text-white font-semibold items-end mt-8 max-sm:mt-5 max-sm:text-sm">
          <p>{name ? name : "FERNANDO ESDRAS DA S"}</p>
          <p>
            {(month && month.length === 1 && "0" + month) ||
              (month && month.length >= 2 && month) ||
              "06"}
            /
            {(year && year.length === 1 && "0" + year) ||
              (year && year.length >= 2 && year) ||
              "25"}
          </p>
        </div>
      </div>
      <div className="back flex flex-col justify-between">
        <div className="w-full bg-custom-grayOne h-12 mt-10"></div>
        <div className="w-full flex justify-end px-6 pb-6 font-semibold">
          <span className="bg-custom-grayOne/30 px-5 py-1 rounded-md text-xl">
            {cvv ? cvv : "333"}
          </span>
        </div>
      </div>
    </div>
  );
}

export { Card };
