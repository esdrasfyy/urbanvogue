"use client";
import { SelectOther } from "@/(pages)/(checkout)/checkout/components/address-checkout/sub-components/select-other/index";
import { AddAddress } from "@/(pages)/(checkout)/checkout/components/address-checkout/sub-components/add-address/index";
import { CardAddress } from "@/components/card/address/index";
import { useDisclosure } from "@chakra-ui/react";
import { ContextPay } from "@/contexts/ContextPay";
import { SiGooglemaps } from "react-icons/si";
import React, { useContext } from "react";

function AddressCheckout() {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const contextPay = useContext(ContextPay);

  if (!contextPay) {
    return null;
  }
  const { address, dataAddress } = contextPay;
  return (
    <>
      <div className="bg-custom-grayTwo rounded-md flex flex-col gap-5 shadow-snipped px-5 py-4 pb-8">
        <h3 className="flex gap-3 items-center text-xl">
          <span className="text-custom-pink">
            <SiGooglemaps />
          </span>
          SELECT ADDRESS
        </h3>
        <div>
          {dataAddress?.length > 0 ? (
            (() => {
              const selectedAddress = dataAddress.filter(
                (item) => item.address_id === address
              )[0];
              return <CardAddress data={selectedAddress} />;
            })()
          ) : (
            <div className="w-full flex justify-center">
              {" "}
              <div className="bg-custom-grayOne py-2 px-4 rounded-md mt-3 cursor-pointer hover:bg-custom-grayOne/40 duration-300 ease-linear">
                <AddAddress />
              </div>
            </div>
          )}
          <div className=" w-full flex justify-end gap-5 text-sm font-semibold mt-5">
            {dataAddress.length > 0 && (
              <>
                <button className="hover:text-custom-pink duration-300 ease-linear">
                  EDIT
                </button>

                <SelectOther
                  onOpen={onOpen}
                  onClose={onClose}
                  isOpen={isOpen}
                />

                <AddAddress />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export { AddressCheckout };
