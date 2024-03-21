import { Address } from "@/(pages)/(checkout)/checkout/components/address-checkout/index";

function Checkout() {
  return (
    <main className="flex mt-36 w-full justify-center items-start gap-5 max-w-[1050px] text-custom-textColor mx-3 max-md:flex-col mb-64">
      <section className="w-full flex flex-col gap-5">
        <Address />
      </section>
    </main>
  );
}

export default Checkout;
