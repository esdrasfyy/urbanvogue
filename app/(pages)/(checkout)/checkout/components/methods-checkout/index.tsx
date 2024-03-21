"use client";
import { ContextPay } from "@/contexts/ContextPay";
import { Radio, RadioGroup } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { BiSolidBank } from "react-icons/bi";
import { FaCreditCard, FaRegCreditCard } from "react-icons/fa";
import { ImBarcode } from "react-icons/im";
import { MdPix } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbArrowBadgeDown, TbArrowBadgeUp } from "react-icons/tb";
import { SelectCard } from "@/(pages)/(checkout)/checkout/components/methods-checkout/select-card-checkout/index";
import { CardReadApi } from "@/services/user/card/read";
import { ContextUser } from "@/contexts/ContextUser";

interface Card {
  card_id: number;
  type: string;
  card_number: string;
  card_nickname: string;
  card_network: string;
}

function PaymentsMethods() {
  const context = useContext(ContextUser);
  const [dataCards, setDataCards] = useState<Card[]>([]);
  const contextPay = useContext(ContextPay);

  const getData = async () => {
    if (!context) {
      return;
    }
    const { user } = context;
    if (user?.user_id) {
      const res = await CardReadApi(user.user_id);
      if (res.status === 200 && res?.data?.cards) {
        setDataCards(res.data.cards);
        return;
      }
    }
    return;
  };
  useEffect(() => {
    getData();
  }, [context, getData]);

  if (!contextPay) {
    return;
  }
  const { method, setMethod } = contextPay;

  return (
    <div className="bg-custom-grayTwo rounded-md flex flex-col gap-5 shadow-snipped px-5 py-4 pb-8">
      <h3 className="flex gap-3 items-center text-xl">
        <span className="text-custom-pink text-2xl">
          <RiMoneyDollarCircleLine />
        </span>
        PAYMENT METHODS
      </h3>
      <RadioGroup onChange={setMethod} value={method}>
        <ul className="flex flex-col gap-3">
          <li className="flex items-center w-full">
            <div className="w-full bg-white/5 px-3 py-2 rounded-md shadow-snipped flex">
              <Radio value="pix" display={"flex"} width={"100%"}>
                <span className="flex text-sm items-center gap-2 w-full">
                  <span className="text-[#08BFB1] text-2xl">
                    <MdPix />
                  </span>{" "}
                  PIX
                </span>
              </Radio>
            </div>
          </li>
          <li className="flex items-center w-full flex-col gap-3 relative">
            <span className="absolute right-1 top-2 text-xl">
              {method === "credit_card" ? (
                <TbArrowBadgeUp />
              ) : (
                <TbArrowBadgeDown />
              )}
            </span>
            <div className="w-full bg-white/5 px-3 py-2 rounded-md shadow-snipped flex flex-col">
              <Radio value="credit_card" display={"flex"} width={"100%"}>
                <span className="flex text-sm items-center gap-2 w-full">
                  <span className="text-2xl">
                    <FaRegCreditCard />
                  </span>{" "}
                  CREDIT CARD
                </span>
              </Radio>
            </div>
            {method === "credit_card" && (
              <SelectCard
                data={dataCards.filter((card) => card.type === "credit")}
                type="credit"
                getData={getData}
              />
            )}
          </li>
          <li className="flex items-center w-full flex-col gap-3 relative">
            <span className="absolute right-1 top-2 text-xl">
              {method === "debit_card" ? (
                <TbArrowBadgeUp />
              ) : (
                <TbArrowBadgeDown />
              )}
            </span>
            <div className="w-full bg-white/5 px-3 py-2 rounded-md shadow-snipped flex">
              <Radio value="debit_card" display={"flex"} width={"100%"}>
                <div>
                  <span className="flex text-sm items-center gap-2 w-full">
                    <span className="text-2xl">
                      <FaCreditCard />
                    </span>{" "}
                    DEBIT CARD
                  </span>
                </div>
              </Radio>
            </div>

            {method === "debit_card" && (
              <SelectCard
                data={dataCards.filter((card) => card.type === "debit")}
                type="debit"
                getData={getData}
              />
            )}
          </li>
          <li className="flex items-center w-full">
            <div className="w-full bg-white/5 px-3 py-2 rounded-md shadow-snipped flex">
              <Radio value="bank_slip" display={"flex"} width={"100%"}>
                <span className="flex text-sm items-center gap-2 w-full">
                  <span className="text-2xl">
                    <ImBarcode />
                  </span>{" "}
                  BANK SLIP
                </span>
              </Radio>
            </div>
          </li>
          <li className="flex items-center w-full">
            <div className="w-full bg-white/5 px-3 py-2 rounded-md shadow-snipped flex">
              <Radio value="lottery" width={"100%"}>
                <span className="flex text-sm items-center gap-2 w-full">
                  <span className="text-2xl">
                    <BiSolidBank />
                  </span>{" "}
                  LOTTERY
                </span>
              </Radio>
            </div>
          </li>
        </ul>
      </RadioGroup>
    </div>
  );
}

export { PaymentsMethods };
