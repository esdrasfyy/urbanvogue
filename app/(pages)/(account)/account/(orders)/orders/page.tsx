"use client";
import { OrderCard } from "@/components/card/order";
import { ContextLoading } from "@/contexts/ContextLoading";
import { ContextUser } from "@/contexts/ContextUser";
import { OrderI } from "@/interfaces/user/order";
import { getOrders } from "@/services/user/orders/get-orders";
import { Select } from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import { GoChecklist } from "react-icons/go";
import { TbArrowBadgeDown, TbArrowBadgeUp } from "react-icons/tb";
import { VscSurroundWith } from "react-icons/vsc";

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
  const [orders, setOrders] = useState<OrderI[] | []>([]);
  const context = useContext(ContextUser!);
  const contextLoading = useContext(ContextLoading!)!;
  const { setLoading } = contextLoading;

  useEffect(() => {
    if (!context) {
      return;
    }
    const { user } = context;

    const fetch = async () => {
      setLoading(true);
      if (user?.user_id) {
        const { data, status } = await getOrders({ user_id: user?.user_id });

        if (data?.orders && data?.orders?.length > 0) {
          setOrders(data.orders);
        }
      }
      setLoading(false);
    };
    fetch();
  }, [context]);

  return (
    <main className={`w-full flex flex-col gap-9 max-w-[1050px] bg-custom-grayOne px-4 pt-32 items-start`}>
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
      <section className="w-full flex items-start justify-center flex-col gap-5">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard key={order.order_id} order={order}/>
          ))
        ) : (
            <div className="flex flex-col w-full p-4 bg-custom-grayTwo text-custom-textColor justify-center rounded-md shadow-snipped items-center">
              <div className="text-7xl my-5 text-custom-pink">
                <VscSurroundWith />
              </div>
              <div className="flex flex-col gap-5 mb-5 items-center">
                <h1 className="uppercase text-xl font-semibold text-custom-textColor">Empty order list</h1>
                <p className="text-custom-textColor/50 text-center">Fill your cart and complete your purchases so they appear here.</p>
              </div>
            </div>
        
        )}
      </section>
    </main>
  );
};

export default Orders;
