"use client";
import { Input } from "@chakra-ui/react";
import React from "react";

function InputUi({
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
  focus,
  defaultvalue
}: inputProps) {
  return (
    <>
      <label className={` mb-2 text-sm text-custom-textColor uppercase`} htmlFor={name}>
        {label}
      </label>
      <Input
        type={type}
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
        } py-5 shadow-snipped`}
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

export {InputUi};
