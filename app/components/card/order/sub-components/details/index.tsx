import { OrderDetailsI, OrderI } from "@/interfaces/user/order";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { PiWarningOctagonBold } from "react-icons/pi";
import { ContextUser } from "@/contexts/ContextUser";
import { ContextLoading } from "@/contexts/ContextLoading";
import { getOrderDetails } from "@/services/user/orders/get-order-detail";
import OrderProductCard from "../product";

function OrderCardDetails({
  detailsVisible,
  order,
}: {
  detailsVisible: boolean;
  order: OrderI;
}) {
  const context = useContext(ContextUser!);
  const contextLoading = useContext(ContextLoading!)!;
  const [orderDetails, setOrderDetails] = useState<OrderDetailsI | null>();
  const { setLoading } = contextLoading;
  const [values, setValues] = useState<{
    products: number;
    freight: number;
    discount: number;
    total: number;
  }>({
    products: 100.00,
    freight: 0.00,
    discount: 0.00,
    total: 100.00,
  });

  useEffect(() => {
    if (!context) {
      return;
    }
    const { user } = context;

    if (!order) {
      return;
    }

    const fetch = async () => {
      setLoading(true);
      if (user?.user_id && detailsVisible) {
        const { data } = await getOrderDetails({
          order_id: order.order_id,
          user_id: user.user_id,
        });

        if (data?.order && data?.order) {
          setOrderDetails(data.order);
          const totalProducts = data.order.product_orders.reduce(
            (acc, product) => acc + parseFloat(product.price),
            0
          );
          setValues(prevValues => ({
            ...prevValues,
            products: totalProducts,
            total: data.order?.payment_pix ? data.order.payment_pix[0]?.transaction_amount : data.order?.payment_card[0]?.transaction_amount || prevValues.total,
            discount: data.order?.payment_pix ? data.order.payment_pix[0]?.discount || 0 : data.order?.payment_card[0]?.discount || prevValues.discount,
            freight:data.order?.payment_pix ? data.order.payment_pix[0]?.freight_amount || 0 : data.order?.payment_card[0]?.freight_amount || prevValues.freight
          }));
          
        }
      }
      setLoading(false);
    };
    console.log(values.freight);
    
    if (!orderDetails) {
      fetch();
    }
  }, [order, detailsVisible]);

  return (
    <div
      className={`order-card-details ${
        detailsVisible ? "details-visible" : ""
      }`}
    >
      <div className="hidden w-full justify-between mt-4 min-h-full max-md:flex ">
        <div className="flex flex-col gap-7">
          <h4 className="font-semibold text-sm uppercase">Status</h4>
          <span className="text-custom-textColor/50 text-sm font-semibold uppercase">
            {order.status}
          </span>
        </div>
        <div className="flex flex-col gap-7">
          <h4 className="font-semibold text-sm uppercase">Date</h4>
          <span className="text-custom-textColor/50 text-sm">
            {format(order.created_at, "dd/MM/yyyy")}
          </span>
        </div>
        <div className="flex flex-col gap-7">
          <h4 className="font-semibold text-sm uppercase">Payment</h4>
          <span className="text-custom-pink font-semibold text-sm uppercase">
            {order.payment_method}
          </span>
        </div>
      </div>
      <span className="block h-[1px] w-full mt-3 mb-3 bg-custom-textColor"></span>
      <div className="order-card-rest mt-4">
        <div className="flex w-full justify-between items-center max-md:flex-col max-md:items-start max-md:gap-3">
          <div className="w-full">
            <h4 className="font-semibold text-sm uppercase">ADDRESS</h4>
            <div className="flex w-full justify-between mt-4 max-md:flex-col gap-4">
              <div className="flex flex-col justify-between min-h-full">
                <p className="text-custom-textColor/50 uppercase text-sm">
                  {order.street}
                </p>
                <p className="text-custom-textColor/50 uppercase text-sm">
                  NUMBER: {order.number}
                </p>
                <p className="text-custom-textColor/50 uppercase text-sm">
                  CEP: {order.cep} | {order.city}, {order.state}
                </p>
              </div>
              <div className="flex gap-3 flex-col justify-between h-full max-md:w-full">
                <button className="border-[1px] border-custom-pink border-solid h-fit py-1.5 px-3 rounded-md text-sm duration-300 ease-linear hover:bg-custom-pink max-md:w-full">
                  SEILA TIO
                </button>
                <button className="border-[1px] border-custom-pink border-solid h-fit py-1.5 px-3 rounded-md text-sm duration-300 ease-linear hover:bg-custom-pink max-md:w-full">
                  SEILA TIO
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={` mt-7 bg-white/5 px-5 uppercase py-4 rounded-md border-l-[3px] border-custom-pink w-full `}
        >
          <div className="flex items-center gap-3">
            <span className="text-custom-pink text-2xl">
              <PiWarningOctagonBold />
            </span>
            <span className="max-md:text-sm">IMPORTANT WARNING</span>
          </div>
          <div className="text-sm text-custom-textColor/70 mt-3 w-full normal-case">
            <p className="max-md:text-xs">
              Guarantees and regrets can only be requested after the receipt of
              the product. If you cancel your purchase, we ask refuse the
              product upon delivery.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-9 h-full">
        <div className="flex w-full justify-between uppercase text-sm font-semibold">
          <div>
            <p>PRODUCT(S)</p>
          </div>
          <div>
            <p>TOTAL</p>
          </div>
        </div>
        <span className="block h-[1px] w-full mt-1 mb-6 bg-custom-textColor"></span>
        <ul className="flex flex-col gap-6 h-full">
          {orderDetails &&
            orderDetails.product_orders.length > 0 &&
            orderDetails.product_orders.map((product, index, array) => {
              const isLastItem = index === array.length - 1;
              return (
                <OrderProductCard
                  product={product}
                  key={index}
                  isLastItem={isLastItem}
                />
              );
            })}
        </ul>
      </div>
      <div className="mt-5">
        <div className="flex w-full justify-between uppercase text-sm font-medium py-3">
          <div>total product(s)</div>
          <div className="font-semibold text-green-500">$ {values.products}</div>
        </div>
        <div className="flex w-full justify-between uppercase text-sm font-medium py-3">
          <div>
            Freight
          </div>
          <div className="font-semibold text-green-500">
             {values.freight > 0 ? "$ " + values.freight : "FREE"}
          </div>
        </div>
        {values.discount !== 0.00 && (
              <div className="flex w-full justify-between uppercase text-sm  text-custom-pink py-3">
                <div>Discount</div>
                <div className="font-semibold text-red-600">
                  - $ {values.discount}
                </div>
              </div>
            )}
        <div className="flex w-full justify-between uppercase text-sm font-semibold py-3 border-t-[1px] border-custom-grayThree/50 mt-5">
          <div>TOTAL</div>
          <div>
            $ {values.total}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCardDetails;
