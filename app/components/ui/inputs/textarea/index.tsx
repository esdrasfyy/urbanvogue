"use client";
import { Textarea } from "@chakra-ui/react";

import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

import {inputProps} from "@/components/ui/inputs/textarea/types/index"
function TextAreaUi({
  type,
  label,
  register,
  name,
  required,
  maxLength,
  minLength,
  classname,
  pleaceholder,
  error,
  value,
  autofocus,
  disabled,
  change,
  defaultvalue,
}: inputProps) {
  return (
    <ChakraProvider>
      <label className={` mb-2 text-sm text-custom-textColor`} htmlFor={name}>
        {label}
      </label>
      <Textarea
        type={type}
        padding="6px 0"
        placeholder={pleaceholder}
        id={name}
        borderWidth="2px"
        paddingLeft="10px"
        borderRadius={"4px"}
        focusBorderColor={"#ed145b"}
        autoFocus={autofocus}
        value={value}
        defaultValue={defaultvalue}
        onChange={change}
        disabled={disabled}
        className={`${classname} ${error ? "mb-0" : "mb-4"}`}
        {...register(`${name}`, { required, maxLength, minLength })}
      />
      <span
        className={`text-custom-red text-sm italic text-right mr-2 ${
          error ? "mb-0" : "mb-0"
        }`}
      >
        {error}
      </span>
    </ChakraProvider>
  );
}

export {TextAreaUi};
