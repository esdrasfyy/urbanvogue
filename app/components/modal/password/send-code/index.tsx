import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputPassword, schema } from "../types";
import { ContextLoading } from "@/contexts/ContextLoading";
import { ButtonIconUi } from "@/components/ui/buttons/button-icon";
import { UserI } from "@/interfaces/user";
import axios from "axios";
import { ButtonPassUi } from "@/components/ui/buttons/button-password";
import { ChangesApi } from "@/services/user/changes";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

function SendCodePassword({
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
  const contextLoading = useContext(ContextLoading!)!;
  const { loading, setLoading } = contextLoading;
  const [transport, setTransport] = useState<string>("wpp");
  const [show1, setShow1] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputPassword>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<InputPassword> = async (data) => {
    try {
      setLoading(true);
      onClose();

      const {
        data: res,
        status,
        error,
      } = await ChangesApi({
        change: "password",
        data: data.password,
        user_id: user.user_id,
        transport: transport === "wpp" ? "wpp" : "email",
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
        title: `Code sent to your ${
          transport === "wpp" ? "WhatsApp" : "Email"
        }!`,
        description: `Check the code in your ${
          transport === "wpp" ? "WhatsApp" : "Email"
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

  const handleClick1 = () => setShow1(!show1);
  const handleClick2 = () => setShow2(!show2);

  return (
    <form className="pb-5">
      <p className="mb-4 text-sm text-custom-textColor/35">
        {user.password_hash
          ? "Enter your new password twice, and we will send you a code to confirm."
          : "Assign an password address to your account so you can enjoy the latest news"}
      </p>

      <div className="h-fit">
        <ButtonPassUi
          show={show1}
          handleClick={handleClick1}
          label="password"
          classname="w-full text-custom-textColor"
          name="password"
          register={register}
          error={errors?.password?.message}
          disabled={loading}
        />
      </div>
      <div>
        <ButtonPassUi
          show={show2}
          handleClick={handleClick2}
          label="repeat"
          classname="w-full text-custom-textColor"
          name="repeat"
          register={register}
          error={errors?.repeat?.message}
          disabled={loading}
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
            <Radio value="email">Email</Radio>
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
export default SendCodePassword;
