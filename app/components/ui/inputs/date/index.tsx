"use client";
import { Input } from "@chakra-ui/react";
import React from "react";
import { DateUiProps } from "./types";

function DateUi({
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
  focus,
  defaultvalue
}: DateUiProps) {
  return (
    <>
      <label className={` mb-2 text-sm text-custom-textColor uppercase`} htmlFor={name}>
        {label}
      </label>
      <Input
        type="date"
        placeholder={pleaceholder}
        id={name}
        borderWidth="2px"
        paddingLeft="10px"
        borderRadius={"4px"}
        focusBorderColor={"#ed145b"}
        autoFocus={autofocus}
        onFocus={focus}
        value={value}
        defaultValue={defaultvalue}
        onChange={(e:any) => change!(e.target.value)}
        maxLength={maxLength}
        disabled={disabled}
        className={`${classname} ${
          error ? "mb-0" : "mb-4"
        } shadow-snipped text-custom-pink h-2 cursor-pointer`}
        {...register(`${name}`, { required, maxLength, minLength, onChange:change})}
      />
      <span
        className={`text-custom-red text-sm italic text-right mr-2 ${
          error ? "mb-0" : "mb-0"
        }`}
      >
        {error}
      </span>
    </>
  );
}

export {DateUi};
