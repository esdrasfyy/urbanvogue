"use client"
import React, { useCallback, useContext, useState } from "react";
import { ContextLoading } from "@/contexts/ContextLoading";
import { PaymentFindCardI } from "@/services/payments/find-payment/card/types";
import { FindPaymentCardApi } from "@/services/payments/find-payment/card";
import { formatBrazilianDate } from "@/masks/date";
import { useRouter } from "next/navigation";
import { ContextUser } from "@/contexts/ContextUser";

function PaymentCard({
  order_id,
  payment_id,
}: {
  order_id: string;
  payment_id: string;
}) {
  const contextLoading = useContext(ContextLoading)!;
  const contextUser = useContext(ContextUser)!
  const [data, setData] = useState<PaymentFindCardI | null>(null);
  const [created, setCreated] = useState<string | null>(null);
  const { setLoading, loading } = contextLoading;
  const router = useRouter();
  async function getData() {
    try {
      setLoading(true);
      const {
        data: res,
        status,
        error,
      } = await FindPaymentCardApi({ order_id, payment_id });
      if (status === 200 && !error && res?.response) {
        const formatedDate = formatBrazilianDate(
          res?.response?.payment_card[0]?.date_created!
        );
        setCreated(formatedDate);
        return setData(res?.response);
      }
      return router.back();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  if (!data) {
    getData();
  }

  return (
    <main className="max-w-[800px] w-full flex mt-36 px-4 flex-col gap-5 text-custom-textColor">
      <h1 className="font-semibold uppercase text-2xl">Order Confirmed</h1>
      <section className="bg-custom-grayTwo rounded-md shadow-snipped p-5">
        <h2 className="text-custom-pink font-semibold uppercase pb-2">
          Your order was placed successfully.
        </h2>
        <p>
          You will soon receive an email at{" "}
          <span className="font-semibold">{contextUser.user?.email}</span> with
          all order details.
        </p>
      </section>
      <div className="w-full flex items-center text-custom-textColor gap-5 max-md:flex-wrap">
        <div className="flex gap-5 w-full">
          <button className="py-2 w-full font-semibold bg-custom-grayTwo text-xs rounded-md shadow-snipped uppercase">
            order details
          </button>
          <button className="py-2 w-full font-semibold bg-custom-grayTwo text-xs rounded-md shadow-snipped uppercase">
            Check Payment
          </button>
        </div>
        <div className="flex gap-5 w-full">
          <button className="py-2 w-full font-semibold bg-custom-grayTwo text-xs rounded-md shadow-snipped uppercase">
            My orders
          </button>
          <button className="py-2 w-full font-semibold bg-custom-grayTwo text-xs rounded-md shadow-snipped uppercase">
            help
          </button>
        </div>
      </div>
      <section className="bg-custom-grayTwo rounded-md shadow-snipped p-5">
        <h2 className="text-custom-pink font-semibold uppercase">
          Order Resume
        </h2>
        <div>
          <div className="mt-3 text-sm">
            <p>
              <span className="font-semibold">Payment number:</span> {data?.payment_card[0].payment_id}
            </p>
          </div>
          <div className="mt-3 text-sm">
            <p>
              <span className="font-semibold">Method:</span> {data?.payment_method}
            </p>
          </div>
          <div className="mt-3 text-sm">
            <p>
              <span className="font-semibold">Order created:</span> {created}
            </p>
          </div>
          <div className="mt-3 text-sm">
            <p>
              <span className="font-semibold">Price:</span> BRL {data?.payment_card[0].transaction_amount}
            </p>
          </div>
          <div className="mt-3 text-sm">
            <p>
              <span className="font-semibold">Status:</span> {data?.payment_card[0].status}
            </p>
          </div>
          <div className="mt-3 text-sm">
            <p>
              <span className="font-semibold">Status details:</span> {data?.payment_card[0].status_detail}
            </p>
          </div>

          <div className="mt-3 text-sm">
            <p>
              <span className="font-semibold">Installments:</span> {data?.payment_card[0].installments}x BRL {data?.payment_card[0].installment_amount}
            </p>
          </div>
          <div className="mt-3 text-sm">
            <p>
              <span className="font-semibold">Card:</span> **** **** {data?.payment_card[0].last_digits}
            </p>
          </div>
          <div className="mt-3 text-sm">
            <p>
              <span className="font-semibold">Street:</span> {data?.street}
            </p>
          </div>
          <div className="mt-3 text-sm">
            <p>
              <span className="font-semibold">Number:</span> {data?.number}
            </p>
          </div>
          <div className="mt-3 text-sm">
            <p>
              <span className="font-semibold">CEP:</span> {data?.cep} | {data?.city},{data?.state}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export { PaymentCard };
