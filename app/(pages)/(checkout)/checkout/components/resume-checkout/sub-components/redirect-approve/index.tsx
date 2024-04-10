import { ContextCart } from "@/contexts/ContextCart";
import { ContextLoading } from "@/contexts/ContextLoading";
import { ContextPay } from "@/contexts/ContextPay";
import { ContextUser } from "@/contexts/ContextUser";
import { PaymentProcessApi } from "@/services/payments/process/index";
import { useToast } from "@chakra-ui/react";
import React, { useContext } from "react";
import { FaArrowRight } from "react-icons/fa";

function RedirectApprove() {
  const toast = useToast();
  const contextPay = useContext(ContextPay);
  const contextCart = useContext(ContextCart);
  const contextUser = useContext(ContextUser);
  const contextLoading = useContext(ContextLoading)!;
  if (!contextPay || !contextCart || !contextUser) return;
  
  const { address, method, cardId, total, coupon } = contextPay;
  const { setLoading } = contextLoading;
  const { cartResume } = contextCart;
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
    try {
      setLoading(true);
      const res = await PaymentProcessApi({
        user_id: 2,
        address_id: address || 1,
        payment_method: method,
        coupon: coupon,
        products: cartResume?.products!,
        card_id: method === "credit_card" || method === "debit_card" ? +cardId : null
      });
      
      if (res.status === 201) {
        toast({
          title: "Created Payment",
          description: "Order created successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
          position: "top-right",
        });
        setLoading(false);
        const realMethod = method === "credit_card" || method === "debit_card" ? method.split("_")[1] : method
        return (window.location.href = `/checkout/approve/${realMethod}/${res.data?.order_id}/${res.data?.payment_id}`);
      }
      toast({
        title: "Failed to create order",
        description:
          res.data?.msg ||
          "An error occurred with your order, please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
        variant: "left-accent",
        position: "top-right",
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
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
