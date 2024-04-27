import { useState } from "react";
import { TbArrowBadgeDown, TbArrowBadgeUp } from "react-icons/tb";
import { Divider } from "@chakra-ui/react";

function OrderCard() {
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false);
  
  return (
    <div className="flex flex-col w-full p-7 bg-custom-grayTwo text-custom-textColor justify-center rounded-md shadow-snipped">
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-7">
          <h4 className="font-semibold text-sm uppercase">Número do Pedido</h4>
          <span className="text-custom-textColor/50 text-sm">#94632824</span>
        </div>
        <div className="flex flex-col gap-7">
          <h4 className="font-semibold text-sm uppercase">Status</h4>
          <span className="text-custom-textColor/50 text-sm font-semibold ">
            Concluído
          </span>
        </div>
        <div className="flex flex-col gap-7">
          <h4 className="font-semibold text-sm uppercase">Data</h4>
          <span className="text-custom-textColor/50 text-sm">27/11/2023</span>
        </div>
        <div className="flex flex-col gap-7">
          <h4 className="font-semibold text-sm uppercase">Pagamento</h4>
          <span className="text-custom-pink font-semibold text-sm">PIX</span>
        </div>
        <div className="flex items-center">
          <button
            className="text-sm font-semibold text-custom-pink underline flex gap-3 w-full items-center"
            onClick={() => setDetailsVisible(!detailsVisible)}
          >
            More details
            <span
              className={`text-xl duration-300 ease-linear ${
                detailsVisible ? "-rotate-180" : ""
              }`}
            >
              <TbArrowBadgeDown />
            </span>
          </button>
        </div>
      </div>
      <div className={`order-card-details ${detailsVisible ? "details-visible" : ""}`}>
        <Divider className="order-card-divider" bgColor={"#5d5d5d"} margin={"32px 0px"} />
        <div className="order-card-rest">
          RESTANTE
        </div>
      </div>
    </div>
  );
}

export { OrderCard };
