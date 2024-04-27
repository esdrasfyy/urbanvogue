"use client";
import { OrderCard } from "@/components/card/order";
import { Select } from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useState } from "react";
import { GoChecklist } from "react-icons/go";
import { TbArrowBadgeDown, TbArrowBadgeUp } from "react-icons/tb";

enum FilterOrder {
  Concluded = "Concluded",
  All = "All",
  Canceled = "Canceled",
  Pending = "Pending",
  Processing = "Processing",
  Sent = "Sent",
}

const Orders: NextPage = () => {
  const [arrow1, setArrow1] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterOrder>(FilterOrder.All);
  return (
    <main  className="w-full flex flex-col gap-9 max-w-[1050px] bg-custom-grayOne px-4 min-h-screen pt-32 items-start">
      <aside className="flex w-full justify-between">
        <h2 className="flex items-center font-semibold text-custom-textColor gap-3">
          <span className="text-custom-pink text-2xl">
            {" "}
            <GoChecklist />
          </span>
          ORDERS
        </h2>
        <div>
          <Select
            iconColor="#ed145b"
            icon={arrow1 ? <TbArrowBadgeUp /> : <TbArrowBadgeDown />}
            onBlur={() => setArrow1(false)}
            defaultValue={filter}
            color={"#fff"}
            onClick={() => setArrow1(!arrow1)}
            onChange={(e) => setFilter(e.target.value as FilterOrder)}
            _focus={{
              borderColor: "#ed145b",
              boxShadow: "0 0 0 1px #ed145b",
            }}
            className="p-0 shadow-snipped border-[10px] border-solid rounded-md outline-none focus:ring-custom-pink cursor-pointer focus:border-custom-pink"
          >
            {Object.values(FilterOrder).map((filterOption) => (
              <option key={filterOption} value={filterOption}>
                {filterOption}
              </option>
            ))}
          </Select>
        </div>
      </aside>
      <section className="min-h-screen w-full flex items-start justify-centerpx-4 flex-col gap-5">
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
      </section>
    </main>
  );
};

export default Orders;
