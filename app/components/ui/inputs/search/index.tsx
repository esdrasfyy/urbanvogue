"use client";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { SearchInputProps } from "./types";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { Voice } from "@/components/voice";

function SearchInputUi({ classname }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>(searchParams.get("query") || "");
  const toast = useToast();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit(value);
  };

  const handleSubmit = (value: string) => {
    if (value) {
      const newValue = value.split(" ").join("-")
      return router.push(`/search?query=${newValue}&page=1`);
    }
    toast({
      title: "Speak your research.",
      description: "You need to say something before searching.",
      status: "error",
      duration: 9000,
      isClosable: true,
      variant: "left-accent",
      position: "top-right",
    });
  };
  return (
    <form
      className={`relative ${classname} shadow-snipped rounded-full `}
      onSubmit={(e) => onSubmit(e)}
    >
      <div className={`relative w-full`}>
        <input
          type="search"
          className={`shadow-snipped duration-300 ease-linear relative bg-custom-grayThree border-custom-grayThree border-2 rounded-3xl py-[3px] pl-16 text-white transition-all hover:opacity-70 w-full outline-none searchInput text-lg max-[400px]:pl-12 focus:outline-none focus:ring-0 focus:border-custom-pink focus:border-2  ring-0`}
          placeholder="ex: Camisa"
          onChange={handleChange}
          value={value.split("-").join(" ")}
        />
        <button
          type="submit"
          className="absolute left-0 top-[50%] -translate-y-1/2 bg-white text-grayOnerounded-full duration-200 transition-all ease-linear hover:opacity-60 z-10 p-[6px] text-2xl rounded-full"
        >
          <HiSearch />
        </button>
        <Voice handleSubmit={handleSubmit} />
      </div>
    </form>
  );
}

export { SearchInputUi };
