"use client";
import {
  Inputs,
  FormLoginProps,
  schema,
} from "@/(pages)/(login)/login/components/form/types";
import { ButtonPassUi } from "@/components/ui/buttons/button-password/index";
import { ButtonIconUi } from "@/components/ui/buttons/button-icon/index";
import { InputUi } from "@/components/ui/inputs/default/index";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContextUser } from "@/contexts/ContextUser";
import { LoginApi } from "@/services/login";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useContext} from "react";
import { ForgotPassword } from "../forgot-password";



function FormLogin({ loading, handleLoading }: FormLoginProps) {
  const [show, setShow] = React.useState(false);
  const router = useRouter();
  const toast = useToast();
  
  const context = useContext(ContextUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  if (!context) {
    return;
  }
  const { setUser, user } = context;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const credential = data.credential;
    const password = data.password;
    
    try {
      handleLoading(!loading);
      const {data, status, error} = await LoginApi({ credential, password });
   
      if (status === 200) {
        setUser(data!.user);
        toast({
          title: "Logged in user!",
          description: `Welcome back, enjoy the varieties!`,
          status: "success",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
          position: "top-right",
        });
        setInterval(() => {
          if (router) {
            router.push("/account")
          }
        }, 2000);
      }
      if (status !== 200 && status !== 401) {
        toast({
          title: "Error unknown.",
          description: "error when logging in, try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
          position: "top-right",
        });
        handleLoading(false);
      }
      if (status === 401) {
        toast({
          title: "Invalid Credentials!",
          description: "Incorrect credential or password.",
          status: "error",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
          position: "top-right",
        });
        handleLoading(false);
      }
    } catch (error) {
      throw new Error("Erro ao buscar usuario");
    }
  };

  const handleClick = () => setShow(!show);

  return (
    <form
      className="flex w-full flex-col  justify-center px-10 pb-3 max-md:px-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputUi
        type="text"
        label="Email ou username"
        pleaceholder="Enter you email or username"
        classname="w-full text-custom-textColor"
        name="credential"
        register={register}
        error={errors?.credential?.message}
        autofocus={true}
        disabled={loading ? true : false}
      />
      <ButtonPassUi
        label="Password"
        classname="w-full text-custom-textColor"
        name="password"
        show={show}
        handleClick={handleClick}
        register={register}
        error={errors?.password?.message}
        disabled={loading ? true : false}
      />
      <ForgotPassword />
      <ButtonIconUi
        type="submit"
        content="Login"
        icon="FaArrowRight"
        classname="justify-end mt-6 max-sm:justify-start duration-300 ease-linear"
      />
    </form>
  );
}

export { FormLogin };
