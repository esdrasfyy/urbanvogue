import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonPassUi } from "@/components/ui/buttons/button-password";
import { ImSpinner9 } from "react-icons/im";
import { ButtonIconUi } from "@/components/ui/buttons/button-icon";
import { ForgotPassReset } from "@/services/user/forgot-password/reset-password";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ContextLoading } from "@/contexts/ContextLoading";

interface NewPasswordProps {
  id: number;
  code: string;
}
axios.defaults.withCredentials = true;

const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Minimum characters are 8.")
    .required("This field is required!"),
  passwordConfirm: yup
    .string()
    .min(8, "Minimum characters are 8.")
    .required("This field is required!"),
});
type Inputs = {
  password: string;
  passwordConfirm: string;
};

function ResetPassword({
  handleCount,
}: {
  handleCount: (value: number) => void;
}) {
  const contextLoading = useContext(ContextLoading)!;
  const { setLoading, loading } = contextLoading;
  const [showPass, setShowPass] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);
  const showPassword = () => setShowPass(!showPass);
  const showConfirmPassword = () => setShowConfirmPass(!showConfirmPass);
  const toast = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const password = data.password;
    const passwordConfirm = data.passwordConfirm;

    try {
      setLoading(true);

      if (password !== passwordConfirm) {
        return toast({
          title: "Don't match.",
          description: "Your passwords don't match, correct them.",
          status: "error",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
          position: "top-right",
        });
      }
      const res = await ForgotPassReset({ password });

      if (res.status !== 200) {
        handleCount(1);
        return toast({
          title: "Error changing password.",
          description:
            res?.data?.msg || "Our system has failed, please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
          position: "top-right",
        });
      }
      router.push("/login");
      return toast({
        title: "Code sent!",
        description: res?.data?.msg || "A code has been sent to your email.",
        status: "success",
        duration: 9000,
        isClosable: true,
        variant: "left-accent",
        position: "top-right",
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col pb-4 w-full max-w-96 mx-auto"
      >
        <div
          className={` ${errors?.passwordConfirm?.message ? "pb-6" : "pb-10"}`}
        >
          <ButtonPassUi
            label="Password"
            classname={`w-full text-textColor text-2xl ${
              errors?.password?.message ? "mb-0" : "mb-4"
            }`}
            name="password"
            show={showPass}
            handleClick={showPassword}
            register={register}
            error={errors?.password?.message}
            disabled={loading ? true : false}
          />{" "}
          <ButtonPassUi
            label="Confirm"
            classname="w-full text-textColor text-2xl"
            name="passwordConfirm"
            show={showConfirmPass}
            handleClick={showConfirmPassword}
            register={register}
            error={errors?.passwordConfirm?.message}
            disabled={loading ? true : false}
          />
        </div>
        <ButtonIconUi
          type="submit"
          content="Reset"
          icon="FaArrowRight"
          classname={`justify-end w-full max-sm:justify-start duration-300 ease-linear`}
        />
      </form>
    </>
  );
}

export { ResetPassword };
