"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { MdKeyboardVoice } from "react-icons/md";
import { SearchInputProps } from "@/components/ui/inputs/search/types";
import { useRouter, useSearchParams } from "next/navigation";

function SearchInputUi({ classname }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>(searchParams.get("query") || "");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value) {
      return router.push(`/search?query=${value}`);
    }
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
          value={value}
        />
        <button className="absolute right-3 z-10 top-[50%] translate-y-[-50%] text-white text-2xl duration-200 transition-all ease-linear hover:text-custom-pink max-md:text-2xl ">
          <MdKeyboardVoice />
        </button>
        <button
          type="submit"
          className="absolute left-0 top-[50%] -translate-y-1/2 bg-white text-grayOnerounded-full duration-200 transition-all ease-linear hover:opacity-60 z-10 p-[6px] text-2xl rounded-full"
        >
          <HiSearch />
        </button>
      </div>
    </form>
  );
}

export {SearchInputUi};
