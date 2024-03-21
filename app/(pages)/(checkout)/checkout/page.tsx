import { PaymentsMethods } from "@/(pages)/(checkout)/checkout/components/methods-checkout/index";
import {ProductsGridPay} from "@/(pages)/(checkout)/checkout/components/products-grid-checkout/index";
import { ResumePayment } from "@/(pages)/(checkout)/checkout/components/resume-checkout/index";
import { Address } from "@/(pages)/(checkout)/checkout/components/address-checkout/index";
import { HiClipboardList } from "react-icons/hi";

function Checkout() {

  return (
    <main className="flex mt-36 w-full justify-center items-start gap-5 max-w-[1050px] text-custom-textColor mx-3 max-md:flex-col mb-64">
      <section className="w-full flex flex-col gap-5">
        <Address />
        <PaymentsMethods />
        <div className="bg-custom-grayTwo rounded-md flex flex-col gap-5 shadow-snipped px-5 py-4 pb-8">
          <h3 className="flex gap-3 items-center text-xl">
            <span className="text-custom-pink text-2xl">
              <HiClipboardList />
            </span>
            PRODUCTS
          </h3>
          <ProductsGridPay />
        </div>
      </section>
      <section className="sticky top-16 shadow-snipped rounded-md px-5 py-4 bg-custom-grayTwo max-w-80 w-full max-md:max-w-full pb-8">
       <ResumePayment/>
      </section>
    </main>
  );
}

export default Checkout;
