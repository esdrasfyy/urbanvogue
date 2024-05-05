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
import { InputEmail, schema } from "./types";
import { InputUi } from "@/components/ui/inputs/default";
import { ContextLoading } from "@/contexts/ContextLoading";
import { ButtonIconUi } from "@/components/ui/buttons/button-icon";
import { UserI } from "@/interfaces/user";
import axios from "axios";
import { ChangesApi } from "@/services/user/changes";
import { FaArrowRight } from "react-icons/fa";
import { set } from "date-fns";
import { LoadingGlobal } from "@/components/loading";
import SendCodeEmail from "./send-code";
import { ConfirmCode } from "./confirm-code";

function ModalEmail({
  isOpen,
  onClose,
  onOpen,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  user: UserI;
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
      <LoadingGlobal />
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
            (!user.email && !user.verify_email && "Add email")}
        </ModalHeader>
        {send ? (
          <ConfirmCode
            onClose={onClose}
            onOpen={onOpen}
            setSend={setSend}
            toast={toast}
            user={user}
            change="email"
          />
        ) : (
          <SendCodeEmail
            onClose={onClose}
            onOpen={onOpen}
            setSend={setSend}
            toast={toast}
            user={user}
          />
        )}
      </ModalContent>
    </Modal>
  );
}

export { ModalEmail };
