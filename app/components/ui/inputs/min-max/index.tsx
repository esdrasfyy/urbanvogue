"use client";
import { Input } from "@chakra-ui/react";
import React from "react";
import {MinMaxProps} from "@/components/ui/inputs/min-max/types/index"
function MinMaxUi({
  type,
  label,
  name,
  pleaceholder,
  value,
  disabled,
  defaultvalue,
  handleMinMax
}: MinMaxProps) {
  return (
    <>
      <label className={` mb-2 text-sm text-custom-textColor`} htmlFor={name}>
        {label}
      </label>
      <Input
        type="number"
        placeholder={pleaceholder}
        id={name}
        borderWidth="2px"
        paddingLeft="10px"
        border={"1px"}
        borderRadius={"4px"}
        focusBorderColor={"#ed145b"}
        value={value}
        min={0}
        max={999}
        defaultValue={defaultvalue}
        disabled={disabled}
        onChange={(e) => handleMinMax(e.target.value)}
      />
    </>
  );
}

export {MinMaxUi};
