import { ContextLoading } from "@/contexts/ContextLoading";
import { UserI } from "@/interfaces/user";
import { HStack, PinInput, PinInputField, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { FormEvent, useContext, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

function ConfirmCode({
  onOpen,
  onClose,
  user,
  toast,
  setSend,
  change
}: {
  onOpen: () => void;
  onClose: () => void;
  user: UserI;
  toast: Function;
  setSend: Function;
  change: "email" | "phone" | "password"
}) {
  const [valueInput, setValueInput] = useState("");
  const contextLoading = useContext(ContextLoading)!;
  const { setLoading, loading } = contextLoading;
  const handleChange = (value: string) => {
    setValueInput(value);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await axios.get(`http://localhost:9090/user/changes?change=${change}&code=${valueInput}`)
    try {
      setLoading(true);

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
        <div className="uppercase text-[10px] underline text-custom-pink mt-5 cursor-pointer">
          <a>Resend Code</a>
        </div>
        <div className="uppercase text-[10px] underline text-custom-pink mt-2 cursor-pointer">
          <a>I entered the wrong email</a>
        </div>
        <div className="flex w-full justify-between py-8">
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
      </form>
    </>
  );
}

export { ConfirmCode };
