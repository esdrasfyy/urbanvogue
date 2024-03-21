import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Inputs,
  schema,
} from "@/functions/add-card/types/index";
import { Card } from "@/functions/add-card/subcomponents/card/index";
import { CardCreateApi } from "@/services/user/card/create/index";
import {LoadingSpinner} from "@/components/ui/loading/index";
import {InputUi} from "@/components/ui/inputs/default/index";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoMdAddCircleOutline } from "react-icons/io";
import { ContextUser } from "@/contexts/ContextUser";
import React, { useContext, useState } from "react";
import { ContextPay } from "@/contexts/ContextPay";
import { formatCpf } from "@/masks/cpf/index";
import { ImSpinner9 } from "react-icons/im";
import { useRouter } from "next/navigation";


function AddCard({ type, getData }: { type: string, getData:() => void }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const [back, setBack] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [number, setNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [network, setNetWork] = useState<string>("elo");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const contextPay = useContext(ContextPay);

  if (!contextPay) {
    return null;
  }
  const router = useRouter()
  const context = useContext(ContextUser);
 
  
  const toast = useToast();
  
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!context) {
      return;
    }
    const { user } = context;

    const {
      card_nickname,
      card_number,
      cpf_holder,
      cvv,
      exp_month,
      exp_year,
      name_holder,
    } = data;
    console.log(data);
    const user_id = user?.user_id || 1;
    try {
      setLoading(true);
      const res = await CardCreateApi({
        type,
        card_network: network || "master",
        card_nickname,
        card_number,
        cpf_holder,
        cvv,
        expiration_date: `${exp_month}/${exp_year}`,
        name_holder,
        user_id,
      });
      if(res && !res.error && res.status === 201){
        getData()
        toast({
          title: `Card added!`,
          description: `Your ${type} card has been added to your account.`,
          status: "success",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
          position: "top-right",
        });
        onClose();
        setLoading(false);
        return;
      }
      if (res.error) {
        toast({
          title: "Internal error!",
          description: `${res.error}`,
          status: "error",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
          position: "top-right",
        });
        setLoading(false);
        return;
      }
    } catch (error:any) {
      throw new Error(error);
      return
    }
  };

  const handleName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
    return;
  };
  const handleMonth: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const monthValue = parseInt(e.target.value);
    if (monthValue > 12) {
      return;
    }
    if (String(monthValue).length > 2) {
      const newMonth = String(monthValue).slice(0, 2);
      setMonth(newMonth);
      return;
    }

    setMonth(e.target.value);
    return;
  };
  const handleYear: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const yearValue = parseInt(e.target.value);
    if (yearValue > 40 && yearValue < 24) {
      console.log("Errou em");
    }
    if (String(yearValue).length > 2) {
      const newYear = String(yearValue).slice(0, 2);
      setYear(newYear);
      return;
    }
    setYear(e.target.value);
    return;
  };
  const handleCvv: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setBack(true);
    if (cvv.length >= 4) {
      setCvv(e.target.value.slice(0, 4));
      return;
    }
    setCvv(e.target.value);
    return;
  };

  const handleNumber: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let newValue = e.target.value.replace(/[^\d]/g, "");
    if (newValue.length > 16) {
      newValue = newValue.slice(0, 16);
    }
    const formattedValue = newValue.replace(/(\d{4})(?=\d)/g, "$1 ");
    setNumber(formattedValue);

    if (
      formattedValue.startsWith("4") &&
      !["4011", "4389", "4514", "4576", "5041"].includes(
        formattedValue.substring(0, 4)
      )
    ) {
      setNetWork("visa");
    } else if (
      formattedValue.startsWith("5") &&
      !["5041"].includes(formattedValue.substring(0, 4))
    ) {
      setNetWork("master");
    } else if (
      formattedValue.startsWith("34") ||
      formattedValue.startsWith("37")
    ) {
      setNetWork("amex");
    } else if (
      ["4011", "4389", "4514", "4576", "5041"].includes(
        formattedValue.substring(0, 4)
      )
    ) {
      setNetWork("elo");
    } else {
      setNetWork("");
    }
    return;
  };
  const handleCPF: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const formattedValue = formatCpf(value);
    console.log(formattedValue);
    setCpf(formattedValue);
  };
  return (
    <>
      <button
        className="bg-custom-grayTwo/35 px-3 py-1 rounded-md flex gap-3 shadow-snipped mb-2"
        onClick={onOpen}
      >
        <span className="text-xl">
          <IoMdAddCircleOutline />
        </span>{" "}
        Add Card
      </button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent backgroundColor={"#1d2123"} color={"#d9d9d9"}>
          {loading ? (
            <div className="absolute w-full h-full text-custom-pink bg-custom-grayOne/90 z-40 flex justify-center items-center">
              <LoadingSpinner />
            </div>
          ) : (
            ""
          )}
          <ModalHeader>ADD A NEW CARD</ModalHeader>
          <ModalCloseButton />
          <div className="flex justify-center items-center w-full my-6">
            <Card
              back={back}
              cvv={cvv}
              month={month}
              name={name}
              number={number}
              year={year}
              network={network}
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="px-6">
            <div className="flex flex-col">
              <div className="w-full">
                <InputUi
                  label="card nickname"
                  name="card_nickname"
                  type="text"
                  pleaceholder="My card"
                  register={register}
                  classname="w-full text-custom-textColor"
                  error={errors?.card_nickname?.message}
                  disabled={loading ? true : false}
                />
              </div>
              <div className="w-full">
                {" "}
                <InputUi
                  label="NAME HOLDER"
                  name="name_holder"
                  type="text"
                  value={name}
                  pleaceholder="Neymar Santos Junior"
                  focus={() => setBack(false)}
                  change={handleName}
                  register={register}
                  classname="w-full text-custom-textColor"
                  error={errors?.name_holder?.message}
                  disabled={loading ? true : false}
                />
              </div>
              <div className="w-full">
                <InputUi
                  label="CPF"
                  name="cpf_holder"
                  type="tel"
                  pleaceholder="123.456.789-01"
                  change={handleCPF}
                  value={cpf}
                  register={register}
                  classname="w-full text-custom-textColor"
                  error={errors?.cpf_holder?.message}
                  disabled={loading ? true : false}
                />
              </div>
              <div className="w-full">
                <InputUi
                  label="CARD NUMBER"
                  name="card_number"
                  type="text"
                  pleaceholder="0000 0000 0000 0000"
                  change={handleNumber}
                  value={number}
                  focus={() => setBack(false)}
                  register={register}
                  classname="w-full text-custom-textColor"
                  error={errors?.card_number?.message}
                  disabled={loading ? true : false}
                />
              </div>
              <div className="flex w-full gap-3">
                <div className="w-full">
                  <InputUi
                    label="CVV"
                    name="cvv"
                    type="text"
                    pleaceholder="333"
                    change={handleCvv}
                    value={cvv}
                    register={register}
                    focus={() => setBack(true)}
                    classname="w-full text-custom-textColor"
                    error={errors?.cvv?.message}
                    disabled={loading ? true : false}
                  />
                </div>
                <div className="w-full">
                  <InputUi
                    label="MONTH"
                    name="exp_month"
                    type="number"
                    pleaceholder="06"
                    focus={() => setBack(false)}
                    change={handleMonth}
                    value={month}
                    register={register}
                    classname="w-full text-custom-textColor"
                    error={errors?.exp_month?.message}
                    disabled={loading ? true : false}
                  />
                </div>
                <div className="w-full">
                  <InputUi
                    label="YEAR"
                    name="exp_year"
                    type="number"
                    focus={() => setBack(false)}
                    pleaceholder="24"
                    change={handleYear}
                    value={year}
                    register={register}
                    classname="w-full text-custom-textColor"
                    error={errors?.exp_year?.message}
                    disabled={loading ? true : false}
                  />
                </div>
              </div>
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
                <span className="py-2 px-6 bg-custom-pink rounded-md">
                  <ImSpinner9 className="animate-spin text-3xl" />
                </span>
              ) : (
                <button
                  type="submit"
                  className="py-2 px-6 bg-custom-pink/40 rounded-md hover:bg-custom-pink duration-300 ease-linear"
                >
                  Add
                </button>
              )}
            </div>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export { AddCard };
