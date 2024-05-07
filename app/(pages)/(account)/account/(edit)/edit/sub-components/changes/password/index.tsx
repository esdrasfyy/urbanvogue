"use client";
import { ModalPassword } from "@/components/modal/password";
import { ContextUser } from "@/contexts/ContextUser";
import { Input, useDisclosure } from "@chakra-ui/react";
import React, { ChangeEvent, useContext, useState } from "react";
import {
  IoIosInformationCircleOutline,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { TbShieldPlus } from "react-icons/tb";

function ChangesPassword() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useContext(ContextUser);
  if (!context) {
    return;
}
const { user, setUser
 } = context;

return (
    <div className="w-full mb-5">
      <label
        className={` mb-2 text-sm text-custom-textColor uppercase max-md:text-[10px] max-md:mb-1`}
        htmlFor={"password"}
      >
        password
      </label>
      <div className="flex w-full gap-3">
        <div className="flex w-full relative">
          <Input
            type={"password"}
            placeholder={"••••••••••••"}
            id={"password"}
            borderWidth="1px"
            paddingLeft="10px"
            borderRadius={"4px"}
            focusBorderColor={"#ed145b"}
            defaultValue={"seu palhaco"}
            disabled={true}
            className={`w-full text-custom-textColor py-5 shadow-snipped`}
          />
          {user?.password_hash ? (
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
          {user?.password_hash ? <MdEdit /> : <TbShieldPlus />}
        </button>
        {user && <ModalPassword isOpen={isOpen} onClose={onClose} onOpen={onOpen} user={user} setUser={setUser} />}
      </div>
    </div>
  );
}

export { ChangesPassword };
