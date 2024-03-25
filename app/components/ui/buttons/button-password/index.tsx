"use client";
import { Input, InputRightElement, Button, InputGroup } from "@chakra-ui/react";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {buttonPassUiProps} from "@/components/ui/buttons/button-password/types/index";

function ButtonPassUi({
  show,
  handleClick,
  name,
  label,
  classname,
  register,
  error,
  disabled,
  defaultvalue,
}: buttonPassUiProps) {
  return (
      <>
        <label className="mb-2 text-sm text-custom-textColor uppercase max-md:text-[10px] max-md:mb-1" htmlFor={name}>
          {label}
        </label>
        <InputGroup>
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            borderWidth="1px"
            borderRadius={"4px"}
            id={name}
            name={name}
            defaultValue={defaultvalue}
            focusBorderColor={"#ed145b"}
            className={`${classname} text-3xl py-5 shadow-snipped`}
            {...register(`${name}`)}
            disabled={disabled}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              background="none"
              onClick={handleClick}
              _hover={{ background: "none" }}
            >
              <div className="group -mt-1.5">
                {!show ? (
                  <FaEye
                    style={{ fontSize: "25px" }}
                    className="text-custom-grayThree translate-y-[20%] group-hover:text-custom-pink duration-300 ease-in-out"
                  />
                ) : (
                  <FaEyeSlash
                    style={{ fontSize: "25px" }}
                    className=" text-custom-grayThree translate-y-[20%] group-hover:text-custom-pink duration-300 ease-in-out"
                  />
                )}
              </div>
            </Button>
          </InputRightElement>
        </InputGroup>
        <span
          className={`text-red text-sm italic text-right mr-2 ${
            error ? "mb-2" : "mb-0"
          }`}
        >
          {error}
        </span>
      </>
  );
}

export {ButtonPassUi};
