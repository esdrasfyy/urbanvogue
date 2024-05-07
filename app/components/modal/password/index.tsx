import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
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
import SendCodePassword from "./send-code";
import { ConfirmCode } from "../sub-components/confirm-code";

function ModalPassword({
  isOpen,
  onClose,
  onOpen,
  user,
  setUser,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  user: UserI;
  setUser: Function;
}) {
  const [send, setSend] = useState<boolean>(false);
  const toast = useToast();
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
          {send ? (
            <ConfirmCode
              onClose={onClose}
              onOpen={onOpen}
              setSend={setSend}
              toast={toast}
              user={user}
              change="password"
              setUser={setUser}
            />
          ) : (
            <SendCodePassword
              onClose={onClose}
              onOpen={onOpen}
              setSend={setSend}
              toast={toast}
              user={user}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export { ModalPassword };
