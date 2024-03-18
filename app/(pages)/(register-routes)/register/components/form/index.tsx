import React, { useContext } from "react";
import { InputUi } from "@/components/ui/inputs/default";
import { ButtonIconUi } from "@/components/ui/buttons/button-icon";
import { ButtonPassUi } from "@/components/ui/buttons/button-password";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RegisterApi } from "@/services/register/index";
import { Inputs, FormRegisterProps } from "@/(pages)/(register-routes)/register/components/form/types/index";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { ContextUser } from "@/contexts/ContextUser";
import { LoginApi } from "@/services/login";

const schema = yup.object().shape({
  fullname: yup
    .string()
    .required("This field is required!")
    .min(8, "Minimum characters are 8."),
  username: yup
    .string()
    .required("This field is required!")
    .min(5, "Minimum characters are 5."),
  email: yup
    .string()
    .email("must be a valid email!")
    .required("This field is required!"),
  password: yup
    .string()
    .min(8, "Minimum characters are 8.")
    .required("This field is required!"),
});

function FormRegister({ handleLoading, loading }: FormRegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const [show, setShow] = React.useState(false);
  const handleClickPass = () => setShow(!show);
  
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
   
    };

    return (
      <form
        className="flex w-full flex-col  justify-center px-10 pb-10 max-sm:px-3"
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

export default FormRegister;
