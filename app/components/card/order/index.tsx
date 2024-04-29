import { useState } from "react";
import { TbArrowBadgeDown } from "react-icons/tb";
import { format } from "date-fns";
import OrderCardDetails from "./sub-components/details";
import { OrderI } from "@/interfaces/user/order";

function OrderCard({ order }: { order: OrderI }) {
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false);
 
 
  return (
    <div className="flex flex-col w-full p-4 bg-custom-grayTwo text-custom-textColor justify-center rounded-md shadow-snipped">
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-7 max-md:gap-1">
          <h4 className="font-semibold text-sm uppercase">Number of Order</h4>
          <span className="text-custom-textColor/50 text-sm">
            #{order.order_id}
          </span>
        </div>
        <div className="flex flex-col gap-7 max-md:hidden">
          <h4 className="font-semibold text-sm uppercase">Status</h4>
          <span className="text-custom-textColor/50 text-sm font-semibold uppercase">
            {order.status}
          </span>
        </div>
        <div className="flex flex-col gap-7 max-md:hidden">
          <h4 className="font-semibold text-sm uppercase">Date</h4>
          <span className="text-custom-textColor/50 text-sm">
            {format(order.created_at, "dd/MM/yyyy")}
          </span>
        </div>
        <div className="flex flex-col gap-7 max-md:hidden">
          <h4 className="font-semibold text-sm uppercase">Payment</h4>
          <span className="text-custom-pink font-semibold text-sm uppercase">
            {order.payment_method}
          </span>
        </div>
        <div className="flex items-center">
          <button
            className="text-sm font-semibold text-custom-pink underline flex gap-3 w-full items-center"
            onClick={() => setDetailsVisible(!detailsVisible)}
          >
            <span className="max-md:hidden">More details</span>
            <span
              className={`text-xl duration-300 ease-linear ${
                detailsVisible ? "-rotate-180" : ""
              }`}
            >
              <TbArrowBadgeDown />
            </span>
          </button>
        </div>
      </div>
      <OrderCardDetails detailsVisible={detailsVisible} order={order} />
    </div>
  );
}

export { OrderCard };
