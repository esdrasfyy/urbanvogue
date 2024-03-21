import master from "@/assets/networks/master.svg";
import visa from "@/assets/networks/visa.png";
import elo from "@/assets/networks/elo.webp";
import amex from "@/assets/networks/american.webp";
import { StaticImageData } from "next/image";

export interface ImageMap {
  [key: string]: StaticImageData | null;
}

export const networkImageMap: ImageMap = {
    visa: visa,
    master: master,
    elo: elo,
    american: amex,
  };

export interface Card {
  card_id: number;
  type: string;
  card_number: string;
  card_nickname: string;
  card_network: string;
}

export interface SelectCardProps {
  data: Card[];
  type: string;
  getData: () => void;
}