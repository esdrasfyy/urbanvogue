import { ContextCart } from "@/contexts/ContextCart";
import { ContextPay } from "@/contexts/ContextPay";
import { ContextUser } from "@/contexts/ContextUser";
import { PaymentPixApi } from "@/services/payments/pix";
import { useToast } from "@chakra-ui/react";
import React, { useContext } from "react";
import { FaArrowRight } from "react-icons/fa";

function RedirectApprove() {
  const contextPay = useContext(ContextPay);
  const contextCart = useContext(ContextCart);
  const contextUser = useContext(ContextUser);

  const toast = useToast();
  if (!contextPay || !contextCart || !contextUser) return;
  const { address, method, cardId, total, coupon } = contextPay;
  const { cartResume } = contextCart;
  const { user } = contextUser;
  const verifyData = async () => {
    const errorMessages = [];

    if (!address) errorMessages.push("Please add a delivery address.");
    if (!method) errorMessages.push("Please add a payment method.");
    if (!cartResume) errorMessages.push("Your shopping cart is empty.");
    if (!total) errorMessages.push("Interna Error.");
    if ((method === "credit_card" || method === "debit_card") && !cardId) {
      errorMessages.push("Please select a card to continue.");
    }

    if (errorMessages.length > 0) {
      errorMessages.forEach((message) => {
        toast({
          title: "Error in one of the fields!",
          description: message,
          status: "error",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
          position: "top-right",
        });
      });
      return;
    }

    const ids = cartResume?.products?.map((product) => product.id);
    console.log(user?.user_id);
    
    await PaymentPixApi({
      user_id: 2,
      products_ids: ids!,
      coupon: coupon,
    });

    // window.location.href = "/checkout/approve";
  };

  return (
    <>
      <button
        onClick={() => verifyData()}
        className={`group bg-none border-2 border-custom-pink flex gap-12 items-center pl-2 justify-center max-sm:py-2 w-full mt-5 text-custom-textColor py-1 rounded text-lg duration-300 hover:bg-custom-pink`}
      >
        <span>CONTINUE</span>
        <FaArrowRight className="transition-all ease-in-out -translate-x-7 group-hover:translate-x-0 duration-1000" />
      </button>
    </>
  );
}

export { RedirectApprove };
