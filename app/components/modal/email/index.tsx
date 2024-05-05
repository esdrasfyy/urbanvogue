import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputEmail, schema } from "./types";
import { InputUi } from "@/components/ui/inputs/default";
import { ContextLoading } from "@/contexts/ContextLoading";
import { ButtonIconUi } from "@/components/ui/buttons/button-icon";
import { UserI } from "@/interfaces/user";
import axios from "axios";

function ModalEmail({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: UserI;
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
    const res = await axios.post("http://localhost:9090/user/changes",{
        user_id: user.user_id,
        change:"email",
        email: data.email
    })
    console.log(res);
    
  };

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay
        bg="none"
        backdropFilter="saturate(150%) blur(4px)"
        backdropInvert="50%"
        backdropBlur="3px"
      />
      <ModalContent
        backgroundColor={"#171a1b"}
        textColor={"#d9d9d9"}
        borderRadius={"4px"}
        position={"relative"}
        margin={"0px 14px"}
      >
        <ModalHeader>
          {" "}
          {(user.email && user.verify_email && "Change your email") ||
            (user.email && !user.verify_email && "Check your email") || 
            (!user.email && !user.verify_email && "Add email") 
            }
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)} className="pb-5">
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
            <div>
              <ButtonIconUi
                type="submit"
                content="Next"
                icon="FaArrowRight"
                classname={`justify-end w-full max-sm:justify-start duration-300 ease-linear ${
                  errors.email?.message ? "mt-4" : "mt-0"
                }`}
              />
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export { ModalEmail };
