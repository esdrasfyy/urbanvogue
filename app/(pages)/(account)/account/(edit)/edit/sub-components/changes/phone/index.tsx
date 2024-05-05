"use client";
import { ModalPhone } from "@/components/modal/phone";
import { ContextUser } from "@/contexts/ContextUser";
import { Input, useDisclosure } from "@chakra-ui/react";
import React, { ChangeEvent, useContext, useState } from "react";
import {
  IoIosInformationCircleOutline,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { TbMessageSearch } from "react-icons/tb";

function ChangesPhone() {
  const [phone, setPhone] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useContext(ContextUser);
  if (!context) {
    return;
  }
  const { user } = context;
  return (
    <div className="w-full mb-5">
      <label
        className={` mb-2 text-sm text-custom-textColor uppercase max-md:text-[10px] max-md:mb-1`}
        htmlFor={"phone"}
      >
        phone
      </label>
      <div className="flex w-full gap-3">
        <div className="flex w-full relative">
          <Input
            type={"phone"}
            placeholder={"neymarsantos@gmail.com"}
            id={"phone"}
            borderWidth="1px"
            paddingLeft="10px"
            borderRadius={"4px"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPhone(e.target.value)
            }
            focusBorderColor={"#ed145b"}
            value={phone || user?.phone}
            defaultValue={user?.phone}
            disabled={true}
            className={`w-full text-custom-textColor py-5 shadow-snipped`}
          />
          {user?.phone && user.verify_phone ? (
            <span className="absolute top-1/2 -translate-y-1/2 text-green-500 right-3 text-2xl">
              {" "}
              <IoMdCheckmarkCircleOutline />
            </span>
          ) : (
            <span className="absolute top-1/2 -translate-y-1/2 text-red-600 right-3 text-2xl">
              {" "}
              <IoIosInformationCircleOutline />
            </span>
          )}
        </div>
        <button
          type="reset"
          onClick={onOpen}
          className="text-2xl border-[1px] px-2 border-custom-textColor rounded-md hover:bg-custom-pink duration-300 ease-linear text-custom-pink hover:text-custom-grayTwo hover:border-custom-pink"
        >
          {user?.phone && user.verify_phone ? <MdEdit /> : <TbMessageSearch />}
        </button>
        {user && <ModalPhone isOpen={isOpen} onClose={onClose} user={user} />}
      </div>
    </div>
  );
}

export { ChangesPhone };
