import { InputUi } from "@/components/ui/inputs/default";
import React, { SetStateAction, useContext } from "react";
import { InputEmail, schema } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaArrowRight } from "react-icons/fa";
import { ContextLoading } from "@/contexts/ContextLoading";
import { UserI } from "@/interfaces/user";
import { ChangesApi } from "@/services/user/changes";

function SendCodeEmail({
  onOpen,
  onClose,
  user,
  toast,
  setSend
}: {
  onOpen: () => void;
  onClose: () => void;
  user: UserI;
  toast: Function;
  setSend: Function
}) {
  const contextLoading = useContext(ContextLoading!)!;
  const { loading, setLoading } = contextLoading;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputEmail>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<InputEmail> = async (data) => {
    try {
      setLoading(true);
      onClose();
      if (data.email !== data.repeat) {
        throw new Error("Enter the same email in the fields");
      }
      if (user.email && data.email === user.email) {
        throw new Error("Enter a different email");
      }

      const {
        data: res,
        status,
        error,
      } = await ChangesApi({
        change: "email",
        email: data.email,
        user_id: user.user_id,
        password: null,
        phone: null,
      });
      if (status !== 201) {
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
        title: "Code sent to your email!",
        description: `Check the code in your email and go to the next step`,
        status: "success",
        duration: 9000,
        isClosable: true,
        variant: "left-accent",
        position: "top-right",
      });
    } catch (error: any) {
      toast({
        title: "Error in fiels!",
        description: `${error.message || "different emails"}`,
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
    <form className="pb-5 px-4">
      <p className="mb-4 text-sm text-custom-textColor/35">
        {user.email
          ? "Enter your new email twice, and we will send you a code to confirm."
          : "Assign an email address to your account so you can enjoy the latest news"}
      </p>

      <div className="h-fit">
        <InputUi
          type="email"
          label="Email"
          pleaceholder="neymarsantos@gmail.com"
          classname="w-full text-custom-textColor"
          name="email"
          register={register}
          error={errors?.email?.message}
          disabled={loading}
        />
      </div>
      <div className="mb-5">
        <InputUi
          type="repeat"
          label="repeat"
          pleaceholder="neymarsantos@gmail.com"
          classname="w-full text-custom-textColor"
          name="repeat"
          register={register}
          error={errors?.repeat?.message}
          disabled={loading}
        />
      </div>
      <div className="w-full">
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

export default SendCodeEmail;
