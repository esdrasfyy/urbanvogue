import React, { FormEvent, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import axios, { AxiosResponse } from "axios";
import { PinInput, PinInputField, HStack } from "@chakra-ui/react";
import {
  Button,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import {NewPassword} from "@/(pages)/(login)/login/components/reset-password/new-password/index";

interface SendCodeProps {
  id: number;
}

function SendCode({ id }: SendCodeProps) {
  const [valueInput, setValueInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorCode, setErrorCode] = useState("");

  const handleChange = (value: string) => {
    setValueInput(value);
    setErrorCode("");
    console.log(value);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const code = valueInput;
    const url = `http://localhost:9090/reset-password/${code}`;
    try {
      if (code.length !== 6) {
        return setErrorCode("Enter the correct code!");
      }
      setLoading(true);
      const response: AxiosResponse = await axios.get(url, {
        withCredentials: true,
      });
      console.log(response);
      if (response.status === 200) {
        setSuccess(true);
      } else {
        alert(`Status: ${response.status}, Error: ${response.data.error}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.msg) {
        setErrorCode(error.response?.data.msg);
      } else {
        setErrorCode("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {success ? (
        <>
          <NewPassword code={valueInput} id={id} />
        </>
      ) : (
        <>
          <ModalOverlay />
          <ModalContent
            bg={"#1d2123"}
            color={"#d9d9d9"}
            padding={"5px"}
            className="absolute top-[30%]"
          >
            <ModalHeader paddingBottom={0}>
              Check the code sent to your email!
            </ModalHeader>
            <ModalCloseButton />
            <div className="w-full flex flex-col px-6 items-start">
              <p className="text-custom-textColor/40 mb-4">
                Check your spam box.
              </p>
            </div>
            <div className="w-full flex px-6 pb-6">
              <button className="text-custom-pink underline mb-3 cursor-pointer">
                Didn't receive the code?
              </button>
            </div>
            <div className="w-full flex flex-col px-6">
            
            </div>
          </ModalContent>
        </>
      )}
    </>
  );
}

export {SendCode};
