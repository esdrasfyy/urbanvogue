import { ContextLoading } from "@/contexts/ContextLoading";
import { UserI } from "@/interfaces/user";
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import axios from "axios";
import React, { FormEvent, useContext, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

function ConfirmCode({
  onClose,
  toast,
  setSend,
  change,
  setUser,
}: {
  onOpen: () => void;
  onClose: () => void;
  user: UserI;
  toast: Function;
  setSend: Function;
  setUser: Function;
  change: "email" | "phone" | "password";
}) {
  const [valueInput, setValueInput] = useState("");
  const contextLoading = useContext(ContextLoading)!;
  const { setLoading, loading } = contextLoading;
  const handleChange = (value: string) => {
    setValueInput(value);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:9090/user/changes?change=${change}&code=${valueInput}`,
        {
          withCredentials: true,
        }
      );
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
      switch (change) {
        case "email":
          setUser((prev: any) => ({
            ...prev,
            email: res.data.email,
            verify_email: true,
          }));
          break;
        case "phone":
          setUser((prev: any) => ({
            ...prev,
            phone: res.data.phone,
            verify_phone: true,
          }));
          break;
      }

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
    } catch (error: any) {
      return toast({
        title: "Internal Error!",
        description: error.message || "Try again later.",
        status: "success",
        duration: 9000,
        isClosable: true,
        variant: "left-accent",
        position: "top-right",
      });
    } finally {
      onClose();
      setLoading(false);
    }
  };
  return (
    <>
      <form className="flex flex-col justify-between w-full max-w-96 mx-auto pb-4">
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
        <div>
          <button
            type="reset"
            className="uppercase undeline mt-3  text-custom-pink text-sm hover:text-custom-textColor duration-300 ease-linear"
            onClick={() => setSend(false)}
          >
            wrong {change}
          </button>
        </div>
        <div className="flex w-full justify-between my-6">
          <button
            type="reset"
            className={`w-full group bg-none border-2 border-custom-pink flex text-custom-textColor py-1.5  rounded text-xl duration-300 hover:bg-custom-pink`}
            disabled={loading}
            onClick={(e: any) => onSubmit(e)}
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
        <div>
          <p className="text-xs text-custom-textColor/50">
            {(change === "email" &&
              "A verification code has been sent to your email address. Please check your inbox and follow the instructions to complete the verification process. ") ||
              change === "phone" ||
              (change === "password" &&
                "A verification code has been sent to you by your chosen carrier. Please check and follow the instructions for next step.")}
          </p>
        </div>
      </form>
    </>
  );
}

export { ConfirmCode };
