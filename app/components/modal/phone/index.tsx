import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { UserI } from "@/interfaces/user";
import { SendCodePhone } from "./send-code";
import { ConfirmCode } from "../sub-components/confirm-code";

function ModalPhone({
  isOpen,
  onClose,
  onOpen,
  user,
  setUser
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  user: UserI;
  setUser: Function
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
          {(user.phone && user.verify_phone && "Change your phone") ||
            (user.phone && !user.verify_phone && "Check your phone") ||
            (!user.phone && !user.verify_phone && "Add phone")}
        </ModalHeader>
        <ModalBody>
          {send ? (
            <ConfirmCode
              onClose={onClose}
              onOpen={onOpen}
              setSend={setSend}
              toast={toast}
              user={user}
              change="phone"
              setUser={setUser}
            />
          ) : (
            <SendCodePhone
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

export { ModalPhone };
