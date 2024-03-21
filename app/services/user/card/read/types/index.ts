import { AddressI } from "../../../../../interfaces/address";

interface Card {
    card_id: number;
    type: string;
    card_number: string;
    card_nickname: string;
    card_network: string;
  }

export interface CardReadApiReq {
  cards: Card[] | null;
  msg: string | null;
}
export interface CardReadApiRes{
  data: CardReadApiReq | null;
  error: string | null;
  status: number;
}

