"use client";
import { ModalEmail } from "@/components/modal/email";
import { ContextUser } from "@/contexts/ContextUser";
import { Input, useDisclosure } from "@chakra-ui/react";
import React, { ChangeEvent, useContext, useState } from "react";
import {
  IoIosInformationCircleOutline,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";
import { MdEdit, MdMailOutline } from "react-icons/md";
import { TbMailSearch } from "react-icons/tb";

function ChangesEmail() {
  const [email, setEmail] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useContext(ContextUser);
  if (!context) {
    return;
  }
  const { user,setUser } = context;
  return (
    <div className="w-full mb-5">
      <label
        className={` mb-2 text-sm text-custom-textColor uppercase max-md:text-[10px] max-md:mb-1`}
        htmlFor={"email"}
      >
        email
      </label>
      <div className="flex w-full gap-3">
        <div className="flex w-full relative">
          <Input
            type={"email"}
            placeholder={"neymarsantos@gmail.com"}
            id={"email"}
            borderWidth="1px"
            paddingLeft="10px"
            borderRadius={"4px"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            focusBorderColor={"#ed145b"}
            value={email || user?.email}
            defaultValue={user?.email}
            disabled={true}
            className={`w-full text-custom-textColor py-5 shadow-snipped`}
          />
          {user?.email && user.verify_email ? (
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
          onClick={onOpen}
          type="reset"
          className="text-2xl border-[1px] px-2 border-custom-textColor rounded-md hover:bg-custom-pink duration-300 ease-linear text-custom-pink hover:text-custom-grayTwo hover:border-custom-pink"
        >
          {user?.email && user.verify_email ? <MdEdit /> : <TbMailSearch />}
        </button>
        {user && <ModalEmail isOpen={isOpen} onClose={onClose} user={user} setUser={setUser} onOpen={onOpen}/>}
      </div>
    </div>
  );
}

export { ChangesEmail };
