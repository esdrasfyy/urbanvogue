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
import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputPassword, schema } from "./types";
import { ContextLoading } from "@/contexts/ContextLoading";
import { ButtonIconUi } from "@/components/ui/buttons/button-icon";
import { UserI } from "@/interfaces/user";
import axios from "axios";
import { ButtonPassUi } from "@/components/ui/buttons/button-password";

function ModalPassword({
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
    const res = await axios.post("http://localhost:9090/user/changes", {
      user_id: user.user_id,
      change: "password",
      password: data.password,
    });
    console.log(res);
  };
  const handleClick1 = () => setShow1(!show1);
  const handleClick2 = () => setShow2(!show2);
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
          {user.password_hash ? "Change your password" : "Add password"}
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)} className="pb-5">
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
            <div className="mb-5">
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
              <ButtonIconUi
                type="submit"
                content="Next"
                icon="FaArrowRight"
                classname={`justify-end w-full max-sm:justify-start duration-300 ease-linear ${
                  errors.password?.message ? "mt-4" : "mt-0"
                }`}
              />
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export { ModalPassword };
