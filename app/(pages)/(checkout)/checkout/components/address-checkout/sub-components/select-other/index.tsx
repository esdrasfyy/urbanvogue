"use client";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { AddressDeleteApi } from "@/services/user/address/delete/index";
import { CardAddress } from "@/components/card/address";
import { ContextUser } from "@/contexts/ContextUser";
import { ContextPay } from "@/contexts/ContextPay";
import { RiDeleteBinLine } from "react-icons/ri";
import React, { useContext } from "react";

interface SelectOtherProps {
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
}
function SelectOther({ onOpen, onClose, isOpen }: SelectOtherProps) {
  const contextPay = useContext(ContextPay);
  const toast = useToast()

  if (!contextPay) {
    return;
  }
  const { handleAddressDefalt, handleDeleteAddress,  dataAddress: data } = contextPay;

  const handle = (id: number) => {
    handleAddressDefalt(id);
    onClose();
  };

  const handleDelete = async (address_id:number, user_id:number) =>{
    try {
      const {status, data} = await AddressDeleteApi({address_id, user_id})
      console.log(status);
      if(status !== 204){
        toast({
          title: "Error deleting address!",
          description: "You can be together again in moments.",
          status: "error",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
          position: "top-right",
        });
        return;
      }  

      handleDeleteAddress(address_id)
      toast({
        title: "Address deleted!",
        description: "Your address has been successfully deleted.",
        status: "success",
        duration: 9000,
        isClosable: true,
        variant: "left-accent",
        position: "top-right",
      });
      return onClose();
    } catch (error) {
      console.error(error);
    }
  }

  const context = useContext(ContextUser);
  if (!context) {
    return;
  }
  const { user } = context;

  return (
    <>
      {" "}
      <button
        className="hover:text-custom-pink duration-300 ease-linear"
        onClick={onOpen}
      >
        SELECT OTHER
      </button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent backgroundColor={"#1d2123"} color={"#d9d9d9"}>
          <ModalHeader>Select other</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ul className="flex w-full h-full gap-5 flex-col">
              {data.length > 0 &&
                data.map((card) => (
                  <li className="relative w-full cursor-pointer"
                    key={card.address_id}
                  >
                    <div
                      className="flex w-full"
                      onClick={() => handle(card.address_id)}
                    >
                      <CardAddress
                        data={card}
                      />
                    </div>
                    <div className="absolute py-3 items-end top-1 right-4 flex flex-col justify-between h-full">
                      <div>
                        <button className="text-2xl hover:text-custom-pink duration-200 ease-linear hover:scale-110"
                        onClick={() => handleDelete(card.address_id, user?.user_id || 0)}>
                          <RiDeleteBinLine />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              className="py-2 px-6 border-2 border-custom-pink/40 rounded-md hover:bg-custom-pink duration-300 ease-linear"
              onClick={onClose}
            >
              Cancel
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export { SelectOther };
