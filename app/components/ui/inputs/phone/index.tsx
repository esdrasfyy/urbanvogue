"use client";
import {
  Button,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { PhoneUiProps } from "./type";

function PhoneUi({
  label,
  register,
  name,
  required,
  maxLength,
  minLength,
  classname,
  error,
  value,
  autofocus,
  disabled,
  change,
  focus,
  defaultvalue,
  handleCountry,
  country,
}: PhoneUiProps) {
  const countryCodes = [
    { name: "Canada & EUA", code: "1" },
    { name: "Mexico", code: "52" },
    { name: "Brazil", code: "55" },
    { name: "France", code: "33" },
    { name: "United Kingdom", code: "44" },
    { name: "Germany", code: "49" },
    { name: "Italy", code: "39" },
    { name: "Spain", code: "34" },
    { name: "Japan", code: "81" },
    { name: "Australia", code: "61" },
    { name: "Ireland", code: "353" },
  ];
  const { onOpen, onClose, isOpen } = useDisclosure();
  const handleCode = (code: string) => {
    handleCountry(code);
    onClose();
  };
  return (
    <>
      <label
        className={` mb-2 text-sm text-custom-textColor uppercase max-md:text-[10px] max-md:mb-1`}
        htmlFor={name}
      >
        {label}
      </label>
      <div className={`mt-2 flex flex-row-reverse gap-3 ${classname} mx-1 ${error ? "mb-0" : "mb-4"}`}>
        <Input
          type={"number"}
          placeholder={11987654321}
          id={name}
          borderWidth="1px"
          paddingLeft="15px"
          borderRadius={"4px"}
          focusBorderColor={"#ed145b"}
          autoFocus={autofocus}
          onFocus={focus}
          value={value}
          defaultValue={defaultvalue}
          onChange={(e: any) => change!(e.target.value)}
          maxLength={maxLength}
          disabled={disabled}
          className={`${classname} py-5 shadow-snipped w-full`}
          {...register(`${name}`, {
            required,
            maxLength,
            minLength,
            onChange: change,
          })}
        />
        <span className="bg-custom-grayTwo min-h-full w-16 rounded-l-[0.17rem] flex items-center justify-center font-semibold">
          <Popover
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            placement="top-start"
          >
            <PopoverTrigger>
              <button
                type="reset"
                onClick={onOpen}
                className="w-full py-0.5 h-full flex items-center justify-center border-[1px] border-solid border-custom-textColor rounded-md"
              >
                <span className="text-xs -ml-1">+</span>
                {country}
              </button>
            </PopoverTrigger>
            <PopoverContent
              bg={"#1d2123"}
              border={"none"}
              className="shadow-snipped"
            >
              <PopoverArrow />
              <ul>
                {countryCodes.map((country) => (
                  <li
                  key={country.name}
                    className="hover:bg-custom-grayThree/50 cursor-pointer py-1 text-sm px-2 duration-300 ease-linear"
                    onClick={() => handleCode(country.code)}
                  >
                    {country.name} | (<span className="text-[10px]">+</span>
                    {country.code})
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </span>
      </div>
      {error && (
        <span
          className={`text-custom-red text-sm italic text-right mr-2 ${
            error ? "mb-4" : "mb-0"
          }`}
        >
          {error}
        </span>
      )}
    </>
  );
}

export { PhoneUi };
