"use client"
import { RiArrowUpDoubleFill } from "react-icons/ri";

const BackTop = () => {

  const irParaOTopo = () => {
    window.scrollTo({
    top:0,
    behavior: "smooth"
    });
  };
  return (
    <aside className="flex w-full text-custom-textColor bg-custom-grayTwo/65 justify-center items-center rounded-md mt-10 shadow-snipped ">
      <button onClick={irParaOTopo} className="w-full py-5 flex items-center justify-center">
        BACK TO TOP{" "}
        <span className="text-custom-pink text-2xl ml-3 arrow-footer">
          <RiArrowUpDoubleFill />
        </span>
      </button>
    </aside>
  );
};
export { BackTop };
