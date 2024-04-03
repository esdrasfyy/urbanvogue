"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { RiFilterLine } from "react-icons/ri";
import { GridSearch } from "./components/grid/index";
import { Filter } from "./components/filter/index";
import { FiltersI } from "./types";
import {PaginationUi} from "./components/pagination";

function Search() {
  const [filters, setFilters] = useState<FiltersI | null>(null);

  const handleFilters = (filtersData: FiltersI) => {
    setFilters(filtersData);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <main
      className={`relative min-h-screen min-w-min flex flex-col items-center justify-center pt-[76px]`}
    >
      <Filter
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        filters={filters}
      />

      <PaginationUi />
      <GridSearch handleFilters={handleFilters} />
      <PaginationUi  />
      <aside
        className="z-20 fixed border-[1px] border-custom-pink shadow-snipped bottom-5 right-5 bg-custom-grayThree/20 duration-300 ease-linear cursor-pointer hover:bg-custom-grayTwo rounded-full w-16 h-16 flex items-center justify-center"
        onClick={onOpen}
      >
        <RiFilterLine className="text-4xl text-custom-pink" />
      </aside>
    </main>
  );
}

export default Search;
