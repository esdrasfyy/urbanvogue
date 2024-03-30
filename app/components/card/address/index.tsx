import React, { useContext } from "react";
import { AddressI } from "@/interfaces/address/index";
import { ContextPay } from "@/contexts/ContextPay";
interface CardAddressProps {
  data: AddressI;
}
function CardAddress({ data }: CardAddressProps) {
  const contextPay = useContext(ContextPay);

  if (!contextPay) {
    return;
  }
  const { address } = contextPay;
  return (
    <div
      className={`bg-white/5 px-5 uppercase py-4 rounded-md shadow-snipped border-l-[3px] ${
        data?.address_id === address
          ? "border-custom-pink"
          : "border-custom-grayThree "
      } w-full `}
    >
      <h4 className="font-semibold mb-3">{data?.type_address}</h4>
      <address className="flex flex-col gap-2 text-sm">
        <p>{data?.street}</p>
        <p>Number: {data?.number}</p>
        <p>
          CEP: {data?.cep} | {data?.city}, {data?.state}
        </p>
      </address>
    </div>
  );
}

export { CardAddress };
