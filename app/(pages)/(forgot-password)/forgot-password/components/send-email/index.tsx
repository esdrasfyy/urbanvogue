"use client";
import { InputUi } from "@/components/ui/inputs/default";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import axios from "axios";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonIconUi } from "@/components/ui/buttons/button-icon";
import { useToast } from "@chakra-ui/react";
import { ForgotPassSendEmail } from "@/services/user/forgot-password/send-email";
import { ContextUser } from "@/contexts/ContextUser";
import { Inputs, SendEmailProps, schema } from "./types";
import { ContextLoading } from "@/contexts/ContextLoading";
axios.defaults.withCredentials = true;

function SendEmail({ handleCount }: SendEmailProps) {
  const context = useContext(ContextUser);
  const contextLoading = useContext(ContextLoading)!;
  const { setLoading, loading } = contextLoading;
  const toast = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const email = data.email;
    if (!context) return;
    const { setEmailForRecovery } = context;
    try {
      setLoading(true);
      const res = await ForgotPassSendEmail(email);
      if (res.status !== 201) {
        toast({
          title: "Error in sending.",
          description:
            res?.data?.msg || "Error sending the code to your email.",
          status: "error",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
          position: "top-right",
        });
        return;
      }
      setEmailForRecovery(email);
      handleCount(2);
      return toast({
        title: "Code sent!",
        description: res?.data?.msg || "A code has been sent to your email.",
        status: "success",
        duration: 9000,
        isClosable: true,
        variant: "left-accent",
        position: "top-right",
      });
    } catch (error:any) {
      toast({
        title: "Error in sending.",
        description:
          error.data.message || "Error sending the code to your email.",
        status: "error",
        duration: 9000,
        isClosable: true,
        variant: "left-accent",
        position: "top-right",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-96 mx-auto pb-4"
      >
        <div>
          <p className="mb-4 text-sm text-custom-textColor/35">
            Enter your email address and we'll send you a code to reset your
            password.
          </p>
        </div>
        <InputUi
          type="email"
          label="Email"
          pleaceholder="neymar.arabia@gmail.com"
          classname="w-full text-custom-textColor"
          name="email"
          register={register}
          error={errors?.email?.message}
          disabled={loading ? true : false}
        />
        <ButtonIconUi
          type="submit"
          content="Next"
          icon="FaArrowRight"
          classname={`justify-end w-full max-sm:justify-start duration-300 ease-linear ${
            errors.email?.message ? "mt-4" : "mt-0"
          }`}
        />
      </form>
    </>
  );
}

export { SendEmail };
