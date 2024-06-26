import { ButtonIconUi } from "@/components/ui/buttons/button-icon";
import { ContextLoading } from "@/contexts/ContextLoading";
import { ContextUser } from "@/contexts/ContextUser";
import { ForgotPassSendCode } from "@/services/user/forgot-password/send-code";
import {
  HStack,
  PinInput,
  PinInputField,
  useToast,
} from "@chakra-ui/react";
import React, { FormEvent, useContext, useState } from "react";

function SendCode({ handleCount }: { handleCount: (value: number) => void }) {
  const toast = useToast();
  const [valueInput, setValueInput] = useState("");
  const context = useContext(ContextUser);
  const contextLoading = useContext(ContextLoading)!;
  const { setLoading, loading } = contextLoading;
  const handleChange = (value: string) => {
    setValueInput(value);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!context) return;
    const { emailForRecovery } = context;
    try {
      setLoading(true);
      const res = await ForgotPassSendCode({
        email: emailForRecovery || "",
        code: valueInput,
      });
      if (res.status !== 200) {
        toast({
          title: "Error checking code.",
          description:
            res?.data?.msg || "Failed to verify authentication code.",
          status: "error",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
          position: "top-right",
        });
        return;
      }
      handleCount(3);
      return toast({
        title: "Validated code!",
        description:
          res?.data?.msg ||
          "Your code has been validated, go to the next step.",
        status: "success",
        duration: 9000,
        isClosable: true,
        variant: "left-accent",
        position: "top-right",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-between w-full max-w-96 mx-auto pb-4"
      >
        <p
          className={`w-full max-w-96 mx-auto mb-2 text-sm text-custom-textColor/45 uppercase max-md:text-[10px] max-md:mb-1`}
        >
          What your code?
        </p>
        <HStack className="flex justify-between">
          <PinInput
            value={valueInput}
            onChange={handleChange}
            manageFocus={true}
            autoFocus
            otp
            placeholder="0"
            id="pin"
          >
            <PinInputField
              className="inputPin py-8"
              outline={"none"}
              outlineOffset={0}
              autoFocus={true}
            />
            <PinInputField
              className="inputPin py-8"
              outline={"none"}
              outlineOffset={0}
            />
            <PinInputField
              className="inputPin py-8"
              outline={"none"}
              outlineOffset={0}
            />
            <PinInputField
              className="inputPin py-8"
              outline={"none"}
              outlineOffset={0}
            />
            <PinInputField
              className="inputPin py-8"
              outline={"none"}
              outlineOffset={0}
            />
            <PinInputField
              className="inputPin py-8"
              outline={"none"}
              outlineOffset={0}
            />
          </PinInput>
        </HStack>
        <div className="uppercase text-[10px] underline text-custom-pink mt-5 cursor-pointer">
          <a>Resend Code</a>
        </div>
        <div className="uppercase text-[10px] underline text-custom-pink mt-2 cursor-pointer">
          <a>I entered the wrong email</a>
        </div>
        <div className="flex w-full justify-between py-8">
          <ButtonIconUi
            type="submit"
            content="Next"
            icon="FaArrowRight"
            classname={`justify-end w-full max-sm:justify-start duration-300 ease-linear`}
          />
        </div>
      </form>
    </>
  );
}

export { SendCode };
