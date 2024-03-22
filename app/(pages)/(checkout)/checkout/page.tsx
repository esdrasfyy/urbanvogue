import { AddressCheckout } from "@/(pages)/(checkout)/checkout/components/address-checkout/index";
import { ProductsGridCheckout } from "./components/products-grid-checkout";
import { MethodsCheckout } from "./components/methods-checkout";
import { ResumeCheckout } from "./components/resume-checkout";
import { HiClipboardList } from "react-icons/hi";

function Checkout() {
  return (
    <main className="flex mt-36 w-full justify-center items-start gap-5 max-w-[1050px] text-custom-textColor mx-3 max-md:flex-col mb-64">
      <section className="w-full flex flex-col gap-5">
        <AddressCheckout />
        <MethodsCheckout />
        <div className="bg-custom-grayTwo rounded-md flex flex-col gap-5 shadow-snipped px-5 py-4 pb-8">
          <h3 className="flex gap-3 items-center text-xl">
            <span className="text-custom-pink text-2xl">
              <HiClipboardList />
            </span>
            PRODUCTS
          </h3>
          <ProductsGridCheckout />
        </div>
      </section>
      <section className="sticky top-16 shadow-snipped rounded-md px-5 py-4 bg-custom-grayTwo max-w-80 w-full max-md:max-w-full pb-8">
        <ResumeCheckout />
      </section>
    </main>
  );
}

export default Checkout;
