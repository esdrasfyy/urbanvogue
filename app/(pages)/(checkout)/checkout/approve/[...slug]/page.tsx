import React from "react";
import { PaymentPix } from "./components/payment-pix";
import { PaymentCard } from "./components/payment-card";

 const Approve = ({ params }: any) => {
  const method = params.slug[0];
  const orderId = params.slug[1];
  const paymentId = params.slug[2];

  const isValidMethod =
    method === "pix" || method === "bank" || method === "card";

  if (!isValidMethod) {
    return <div>Error: Invalid payment method</div>;
  }

  switch (method) {
    case "pix":
      return <PaymentPix order_id={orderId} payment_id={paymentId} />;

    case "bank":
      return <>Nao disponivel</>;
    case "card":
      return <PaymentCard order_id={orderId} payment_id={paymentId} />;
    default:
      <PaymentPix order_id={orderId} payment_id={paymentId} />;
      break;
  }
  return <>Nao disponivel</>;
}

export default Approve;
