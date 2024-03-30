import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonPassUi } from "@/components/ui/buttons/button-password";
import { ImSpinner9 } from "react-icons/im";
import { ButtonIconUi } from "@/components/ui/buttons/button-icon";

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

function ResetPassword() {
  const [showPass, setShowPass] = React.useState(false);
  const [success, setSuccess] = React.useState<boolean>();
  const [loading, setLoading] = React.useState(false);
  const [errorPass, setErrorPass] = React.useState("");
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);
  const showPassword = () => setShowPass(!showPass);
  const showConfirmPassword = () => setShowConfirmPass(!showConfirmPass);

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
        return setErrorPass("Passwords do not match!");
      }
      const url = `http://localhost:9090/new-password/`;
      const { data, status } = await axios.post(url, {
        password,
      });

      if (status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.msg) {
        setSuccess(false);
        setErrorPass(error.response?.data.msg);
      } else {
        setSuccess(false);
        setErrorPass("Unknown error!");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pb-4 w-full max-w-96 mx-auto">
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
  );
}

export { ResetPassword };
