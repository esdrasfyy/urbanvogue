import React from "react";
import { PaymentPix } from "./components/payment-pix";

function Approve({ params }: any) {
  const method = params.slug[0];
  const orderId = params.slug[1];
  const paymentId = params.slug[2];

  const isValidMethod =
    method === "pix" ||
    method === "bank" ||
    method === "credit" ||
    method === "debit";

  if (!isValidMethod) {
    return <div>Error: Invalid payment method</div>;
  }
  return (
    <>
      <PaymentPix method={method} order_id={orderId} payment_id={paymentId} />
    </>
  );
}

export default Approve;
