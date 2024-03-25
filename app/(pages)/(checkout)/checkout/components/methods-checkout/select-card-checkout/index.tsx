import { Radio, RadioGroup } from "@chakra-ui/react";
import React, { useContext } from "react";
import Image from "next/image";
import { AddCard } from "@/utils/add-card";
import elo from "@/assets/networks/elo.webp";
import { ContextPay } from "@/contexts/ContextPay";
import { SelectCardProps, networkImageMap } from "./types";



function SelectCard({ data, type, getData }: SelectCardProps) {
  const contextPay = useContext(ContextPay);

  if (!contextPay) {
    return;
  }

  const { cardId, setCardId } = contextPay;
  return (
    <div className="w-full bg-white/5 px-3 py-2 rounded-md shadow-snipped flex flex-col">
      <h4 className="border-b-2 border-custom-pink h-fit px-1 pb-1 w-fit mb-3">
        SELECT A CARD
      </h4>
      <RadioGroup
        onChange={setCardId}
        value={cardId}
        className="flex flex-col gap-2"
      >
        {data.map((card, index, array) => {
          const isLastItem = index === array.length - 1;

          return (
            <div
              className={`${
                isLastItem
                  ? ""
                  : "border-solid border-b-[1px] pb-2 border-custom-grayThree"
              } `}
              key={card.card_id}
            >
              <Radio
                value={`${card.card_id}`}
                key={card.card_id}
                display={"flex"}
                width={"100%"}
              >
                <div className="flex items-center justify-center gap-5">
                  <div className="bg-custom-textColor/50 px-3 py-1 rounded-sm shadow-snipped ml-3 h-10 flex items-center">
                    <Image
                      src={networkImageMap[card.card_network] || elo}
                      alt={`${card.card_id}`}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <p>{card.card_nickname.toUpperCase()}</p>
                    <span className="text-custom-grayThree">
                      card with ending {card.card_number}
                    </span>
                  </div>
                </div>
              </Radio>
            </div>
          );
        })}
        <div className="flex justify-end w-full gap-3 hover:text-custom-pink duration-300 ease-linear uppercase text-sm font-semibold mt-4">
          <AddCard type={type} getData={getData} />
        </div>
      </RadioGroup>
    </div>
  );
}

export { SelectCard };
