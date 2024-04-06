import React from "react";
import { PaymentPix } from "./components/payment-pix";
import { PaymentCard } from "./components/payment-card";

function Approve({ params }: any) {
  const method = params.slug[0];
  const orderId = params.slug[1];
  const paymentId = params.slug[2];

  let component;
  const isValidMethod =
    method === "pix" ||
    method === "bank" ||
    method === "credit_card" ||
    method === "debit_card";

  if (!isValidMethod) {
    return <div>Error: Invalid payment method</div>;
  }

  switch (method) {
    case "pix":
      return (
        <PaymentPix method={method} order_id={orderId} payment_id={paymentId} />
      );

    case "bank":
      return <>Nao disponivel</>;
    case "credit_card":
      return <PaymentCard />;
    case "debit_card":
      return <PaymentCard />;
    default:
      <PaymentPix method={method} order_id={orderId} payment_id={paymentId} />;
      break;
  }
  return <>Nao disponivel</>;
}

export default Approve;
