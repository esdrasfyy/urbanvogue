import { ContextPay } from "@/contexts/ContextPay";
import { useToast } from "@chakra-ui/react";
import React, { useContext } from "react";
import { FaArrowRight } from "react-icons/fa";

function RedirectApprove() {
  const contextPay = useContext(ContextPay);
  const toast = useToast();
  if (!contextPay) return;
  const { address, method, cardId, dataProducts, total } = contextPay;

  const verifyData = () => {
    const errorMessages = [];
    
    if (!address) errorMessages.push("Please add a delivery address.");
    if (!method) errorMessages.push("Please add a payment method.");
    if (!dataProducts) errorMessages.push("Your shopping cart is empty.");
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

    
    window.location.href = "/checkout/approve"
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
