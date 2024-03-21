import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {Inputs, schema} from "@/(pages)/(checkout)/checkout/components/address-checkout/sub-components/add-address/types/index"
import { AddressCreateApi } from "@/services/user/address/create/index";
import { TbArrowBadgeDown, TbArrowBadgeUp } from "react-icons/tb";
import { types } from "@/constants/type-of-address/index";
import { SubmitHandler, useForm } from "react-hook-form";
import {LoadingSpinner} from "@/components/ui/loading";
import {InputUi} from "@/components/ui/inputs/default";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContextUser } from "@/contexts/ContextUser";
import React, { useContext, useState } from "react";
import { ContextPay } from "@/contexts/ContextPay";
import { states } from "@/constants/states/index";
import { ImSpinner9 } from "react-icons/im";

function AddAddress() {
  const [arrow1, setArrow1] = useState<boolean>(false);
  const [arrow2, setArrow2] = useState<boolean>(false);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [selectType, setSelectType] = useState<string>("House");
  const [selectState, setSelectState] = useState<string>("SP");
  const [loading, setLoading] = useState<boolean>(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const contextPay = useContext(ContextPay);
  const context = useContext(ContextUser);
  const toast = useToast();
  
  const handleFormSubmit: SubmitHandler<Inputs> = async (data) => {
    if(!contextPay){
      return;
    }
    const { handleAddressDefalt, handleDataAddress, handleDeleteAddress } = contextPay;

    try {
      setLoading(true);

      const { cep, city, number, references, state, street, type } = data;
      const ref = references ? String(references) : "";
      const id = context?.user?.user_id;

      const result = await AddressCreateApi({
        cep,
        city,
        number,
        ref: ref,
        street,
        state: selectState,
        type: selectType,
        user_id: id!,
      });

      if (result && !result.error && result.status === 201) {
        await handleDataAddress(result?.data.address);
        await handleAddressDefalt(result?.data?.address?.address_id);
        toast({
          title: "Address Add.",
          description: "You can now view your new address.",
          status: "success",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
          position: "top-right",
        });
        onClose();
      } else {
        toast({
          title: "Error adding address!",
          description: `${result.error}`,
          status: "error",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Erro ao adicionar endereço:", error);
      toast({
        title: "Erro ao adicionar endereço!",
        description: "Ocorreu um erro ao tentar adicionar o endereço. Por favor, tente novamente mais tarde.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!contextPay || !context || !context.user) {
    return null;
  }



  return (
    <>
      <button className="hover:text-custom-pink duration-300 ease-linear" onClick={onOpen}>
        NEW ADDRESS
      </button>
      <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent backgroundColor={"#1d2123"} color={"#d9d9d9"}>
          {loading && (
            <div className="absolute w-full h-full text-custom-pink bg-custom-grayOne/90 z-40 flex justify-center items-center">
              <LoadingSpinner />
            </div>
          )}
          <ModalHeader>New address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="flex gap-3">
                <div className="w-1/2">
                  <label className={`mb-2 text-sm text-custom-textColor`} htmlFor={"type"}>
                    Type of address*
                  </label>
                  <Select
                    id="type"
                    iconColor="#ed145b"
                    icon={arrow1 ? <TbArrowBadgeUp /> : <TbArrowBadgeDown />}
                    onBlur={() => setArrow1(false)}
                    value={selectType}
                    onClick={() => setArrow1(!arrow1)}
                    onChange={(e) => setSelectType(e.target.value)}
                    border={"2px solid #d9d9d9"}
                    _focus={{
                      borderColor: "#ed145b",
                      boxShadow: "0 0 0 1px #ed145b",
                    }}
                    className="p-0 min-h-[44px] shadow-snipped border-solid rounded-md outline-none focus:ring-custom-pink cursor-pointer focus:border-custom-pink"
                  >
                    {types.map((type: string) => (
                      <option value={type} key={type}>
                        {type}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="w-1/2">
                  <InputUi
                    type="text"
                    label="Cep*"
                    pleaceholder="00000000"
                    classname="w-full text-custom-textColor"
                    name="cep"
                    register={register}
                    error={errors?.cep?.message}
                    disabled={loading ? true : false}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-4/5">
                  <InputUi
                    type="text"
                    label="Street*"
                    pleaceholder="Rua Antonio Oswaldo"
                    classname="w-full text-custom-textColor"
                    name="street"
                    register={register}
                    error={errors?.street?.message}
                    disabled={loading ? true : false}
                  />
                </div>
                <div className="w-1/5">
                  <InputUi
                    type="number"
                    label="Number*"
                    pleaceholder="99"
                    classname="w-full text-custom-textColor"
                    name="number"
                    register={register}
                    error={errors?.number?.message}
                    disabled={loading ? true : false}
                  />
                </div>
              </div>
              <div className="flex gap-3 -mt-3">
                <div className="w-1/2 mt-4">
                  <label className={`mb-2 text-sm text-custom-textColor`} htmlFor={"State"}>
                    State*
                  </label>
                  <Select
                    id="State"
                    iconColor="#ed145b"
                    icon={arrow2 ? <TbArrowBadgeUp /> : <TbArrowBadgeDown />}
                    onBlur={() => setArrow2(false)}
                    value={selectState}
                    onClick={() => setArrow2(!arrow2)}
                    onChange={(e) => setSelectState(e.target.value)}
                    border={"2px solid #d9d9d9"}
                    _focus={{
                      borderColor: "#ed145b",
                      boxShadow: "0 0 0 1px #ed145b",
                    }}
                    className="p-0 min-h-[44px] shadow-snipped border-solid rounded-md outline-none focus:ring-custom-pink cursor-pointer focus:border-custom-pink"
                  >
                    {states.map((state: string) => (
                      <option value={state} key={state}>
                        {state}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="w-full mt-4">
                  <InputUi
                    type="text"
                    label="City*"
                    pleaceholder="São Paulo"
                    classname="w-full text-custom-textColor"
                    name="city"
                    register={register}
                    error={errors?.city?.message}
                    disabled={loading ? true : false}
                  />
                </div>
              </div>
              <div className="w-full">
                <InputUi
                  type="text"
                  label="References (optional)"
                  pleaceholder="Orange house, black gate."
                  classname="w-full text-custom-textColor"
                  name="references"
                  register={register}
                  error={errors?.references?.message}
                  disabled={loading ? true : false}
                />
              </div>
              <div className="flex justify-end w-full gap-4 text-custom-textColor font-semibold mt-6 pb-6">
                <button
                  type="button"
                  className="py-2 px-6 border-2 border-custom-pink/40 rounded-md hover:bg-custom-pink duration-300 ease-linear"
                  onClick={onClose}
                  disabled={loading ? true : false}
                >
                  Cancel
                </button>
                  {loading ? (
                    <ImSpinner9 className="animate-spin text-3xl" />
                  ) : (
                    <button
                      type="submit"
                      className="py-2 px-6 bg-custom-pink rounded-md hover:bg-custom-pink duration-300 ease-linear"
                    >
                      Add
                    </button>
                  )}
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export { AddAddress };
