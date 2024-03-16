"use client";
import React, { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { RiFilterLine } from "react-icons/ri";
import { GridSearch } from "@/(pages)/search/components/grid/index";
import { Filter } from "@/(pages)/search/components/filter/index";
import { ProductSearchApi } from "@/services/product-search";
import { ProductI } from "@/interfaces/product/card";
import { useSearchParams } from "next/navigation";
import { FiltersI } from "./types";

function Search() {
  const [data, setData] = useState<ProductI[] | null>(null);
  const [filters, setFilters] = useState<FiltersI | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorFetch, setErrorFetch] = useState<string | null>(null);
  const searchParams = useSearchParams();
  let search = searchParams.get("query");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        search = searchParams.get("query");
        const { data, status, error } = await ProductSearchApi({
          search: searchParams.toString(),
        });
        console.log(status);

        if (status === 200 && data) {
          setData(data?.products);
          setFilters(data?.filters);
          return;
        }
        if (error) {
          console.log(error);

          return setErrorFetch(error);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <main
      className={`relative min-h-screen min-w-full flex flex-col items-center justify-center pt-32`}
    >
      <Filter
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        filters={filters}
      />
      {errorFetch ? (
        <div className="absolute top-1/2 left-1/2">
          Error finding products for search:{search}
        </div>
      ) : (
        <GridSearch data={data} />
      )}
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
