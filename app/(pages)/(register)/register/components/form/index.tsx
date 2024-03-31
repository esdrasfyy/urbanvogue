import {
  Inputs,
  FormRegisterProps,
  schema,
} from "@/(pages)/(register)/register/components/form/types/index";
import { ButtonPassUi } from "@/components/ui/buttons/button-password";
import { ButtonIconUi } from "@/components/ui/buttons/button-icon";
import { InputUi } from "@/components/ui/inputs/default";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterApi } from "@/services/register/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContextUser } from "@/contexts/ContextUser";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { LoginApi } from "@/services/login";
import React, { useContext } from "react";

function FormRegister({ handleLoading, loading }: FormRegisterProps) {
  const router = useRouter();
  const toast = useToast();
  const [show, setShow] = React.useState(false);

  const context = useContext(ContextUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  if (!context) {
    return;
  }
  const { setUser } = context;

  const handleClickPass = () => setShow(!show);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { password, fullname, username, email } = data;
    try {
      handleLoading(true);
      const { data, error, status } = await RegisterApi({
        password,
        fullname,
        username,
        email,
      });

      if (status === 201 && !error) {
        const credential = username;

        const result = await LoginApi({ credential, password });

        if (result && !result.error && result.status === 200) {
          setUser(result?.data!.user);
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
              router.push("/");
            }
          }, 2000);
        }
      }

      if (status === 401) {
        toast({
          title: `Error in a field!`,
          description: `${data?.msg}`,
          status: "error",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
          position: "top-right",
        });
        handleLoading(false);
      }
      if (status !== 201 && status !== 401) {
        toast({
          title: "Error unknown.",
          description: "error when register in, try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
          position: "top-right",
        });
        handleLoading(false);
      }
    } catch {
      throw new Error("erro");
    }
  };

  return (
    <form
      className="flex w-full flex-col  justify-center px-10 pb-10 max-md:px-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputUi
        type="text"
        label="Fullname"
        pleaceholder="Neymar Santos Junior"
        classname="w-full text-custom-textColor"
        name="fullname"
        register={register}
        error={errors?.fullname?.message}
        autofocus={true}
        disabled={loading ? true : false}
      />
      <InputUi
        type="text"
        label="Username"
        pleaceholder="neydelas011"
        classname="w-full text-custom-textColor"
        name="username"
        register={register}
        error={errors?.username?.message}
        disabled={loading ? true : false}
      />
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
      <ButtonPassUi
        label="Password"
        classname="w-full text-custom-textColor"
        name="password"
        show={show}
        handleClick={handleClickPass}
        register={register}
        error={errors?.password?.message}
        disabled={loading ? true : false}
      />
      <ButtonIconUi
        type="submit"
        content="Register"
        icon="FaArrowRight"
        classname={`${
          errors?.password?.message
            ? "mt-0 justify-end max-sm:justify-start duration-300 ease-linear"
            : "mt-11 justify-end max-sm:justify-start duration-300 ease-linear"
        }`}
        error={errors?.password?.message}
        disabled={loading ? true : false}
      />
    </form>
  );
}

export { FormRegister };
