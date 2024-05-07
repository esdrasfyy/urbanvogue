import { ContextLoading } from "@/contexts/ContextLoading";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { InputPhone, schema } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangesApi } from "@/services/user/changes";
import { UserI } from "@/interfaces/user";
import { FaArrowRight } from "react-icons/fa";
import { PhoneUi } from "@/components/ui/inputs/phone";

function SendCodePhone({
  onOpen,
  onClose,
  user,
  toast,
  setSend,
}: {
  onOpen: () => void;
  onClose: () => void;
  user: UserI;
  toast: Function;
  setSend: Function;
}) {
  const [transport, setTransport] = useState<string>("wpp");
  const [country, setCountry] = useState<string>("55");
  const contextLoading = useContext(ContextLoading!)!;
  const { loading, setLoading } = contextLoading;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputPhone>({
    resolver: yupResolver(schema),
  });

  const handleCountry = (value: string) => {
    setCountry(value);
  };

  const onSubmit: SubmitHandler<InputPhone> = async (data) => {
    try {
      setLoading(true);
      onClose();

      const {
        data: res,
        status,
        error,
      } = await ChangesApi({
        change: "phone",
        data: `${country}${data.phone}`,
        user_id: user.user_id,
        transport: transport === "wpp" ? "wpp" : "sms",
      });
      if (status !== 200) {
        toast({
          title: "Error in fiels!",
          description: `${res?.msg || error}`,
          status: "error",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
          position: "top-right",
        });
      }
      setSend(true);
      toast({
        title: `Code sent to your ${transport === "wpp" ? "WhatsApp" : "SMS"}!`,
        description: `Check the code in your ${
          transport === "wpp" ? "WhatsApp" : "SMS"
        } and go to the next step`,
        status: "success",
        duration: 9000,
        isClosable: true,
        variant: "left-accent",
        position: "top-right",
      });
    } catch (error: any) {
      toast({
        title: "Error in fiels!",
        description: `${error.message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
        variant: "left-accent",
        position: "top-right",
      });
    } finally {
      onOpen();
      setLoading(false);
    }
  };

  return (
    <form className="pb-5">
      <p className="mb-4 text-sm text-custom-textColor/35">
        {user.phone
          ? "Enter your new phone twice, and we will send you a code to confirm."
          : "Assign an phone address to your account so you can enjoy the latest news"}
      </p>

      <div className="h-fit">
        <PhoneUi
          handleCountry={handleCountry}
          label="phone"
          pleaceholder="(11) 95343-9141"
          classname="text-custom-textColor"
          name="phone"
          register={register}
          error={errors?.phone?.message}
          disabled={loading}
          country={country}
        />
      </div>
      <div>
        <label
          className={` mb-2 text-sm text-custom-textColor uppercase max-md:text-[10px] max-md:mb-1`}
        >
          methods
        </label>
        <RadioGroup onChange={setTransport} value={transport}>
          <Stack spacing={5} direction="row" color={"#fff"} marginTop={"4px"}>
            <Radio value="wpp">WhatsApp</Radio>
            <Radio value="sms" isDisabled>
              SMS
            </Radio>
          </Stack>
        </RadioGroup>
      </div>
      <div className="mt-5">
        <button
          type={"reset"}
          className={`w-full group bg-none border-2 border-custom-pink flex text-custom-textColor py-1.5  rounded text-xl duration-300 hover:bg-custom-pink`}
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
        >
          <span className="flex justify-between items-center px-3 max-w-[100%] w-full">
            <span className="ml-[45%] max-sm:ml-[15%]">Next</span>
            <FaArrowRight
              size={20}
              className="transition-all ease-in-out -translate-x-7 group-hover:translate-x-0 duration-1000"
            />
          </span>
        </button>
      </div>
    </form>
  );
}

export { SendCodePhone };
