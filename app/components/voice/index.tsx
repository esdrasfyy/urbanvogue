// Adicione "use client"; para indicar que este arquivo deve ser executado apenas no navegador
"use client";

import { useRef, useState, useEffect } from "react";
import Lottie from "lottie-react";
import gif from "@/assets/gifs/Animation - 1712939579857.json";
import { MdKeyboardVoice } from "react-icons/md";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { IoSearchSharp } from "react-icons/io5";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

function Voice({ handleSubmit }: { handleSubmit: (value: string) => void }) {
  const lottieRef = useRef<any>();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);
  const toast = useToast();

  useEffect(() => {
    if (typeof window !== "undefined" && window.webkitSpeechRecognition) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        const { transcript } = event.results[event.results.length - 1][0];
        setTranscript(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    } else {
      console.log("Speech recognition not supported in this browser");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    if (typeof window !== "undefined" && window.webkitSpeechRecognition) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        const { transcript } = event.results[event.results.length - 1][0];
        setTranscript(transcript);
      };

      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      lottieRef.current.pause();
      setIsRecording(false);
      recognitionRef.current.stop();
      setRecordingComplete(true);
    }
  };

  const { isOpen, onClose, onOpen } = useDisclosure();
  const handleOpen = () => {
    if (typeof window !== "undefined" && !window.webkitSpeechRecognition) {
      toast({
        title: "Unavailable service.",
        description: "Speech recognition not supported in this browser",
        status: "error",
        duration: 9000,
        isClosable: true,
        variant: "left-accent",
        position: "top-right",
      });
      return;
    }
    onOpen();
  };

  return (
    <>
      <span
        className="absolute right-3 z-10 top-[50%] translate-y-[-50%] text-white text-2xl duration-200 transition-all ease-linear hover:text-custom-pink max-md:text-2xl cursor-pointer"
        onClick={handleOpen}
      >
        <MdKeyboardVoice />
      </span>
      {/* Modal de gravação */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          lottieRef.current.pause();
          setIsRecording(false);
          recognitionRef.current.stop();
          stopRecording();
          onClose();
        }}
        isCentered
        size={"xs"}
      >
        <ModalOverlay
          backdropFilter="saturate(150%) blur(4px)"
          backdropInvert="50%"
          backdropBlur="3px"
        />
        <ModalContent
          background={"#1d2123"}
          textColor={"#d9d9d9"}
          margin={"0px 0px"}
        >
          <ModalBody>
            <div className="flex items-center justify-center flex-col my-10">
              <Lottie
                animationData={gif}
                width={200}
                height={200}
                renderer="svg"
                lottieRef={lottieRef}
              />
              <p className="text-custom-textColor/80 text-xl mb-10">
                {transcript ? transcript : " Say your search..."}
              </p>

              <div className="flex gap-5">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`text-2xl p-4 rounded-full ${
                    isRecording
                      ? "border-[1px] border-transparent bg-custom-pink hover:bg-custom-pink/50"
                      : "border-[1px] border-custom-textColor hover:bg-custom-pink/50"
                  } duration-300 ease-linear`}
                >
                  {/* Ícone do microfone */}
                  {isRecording ? <BiMicrophone /> : <BiMicrophoneOff />}
                </button>
                {transcript && !isRecording && (
                  <button
                    onClick={() => {
                      onClose();
                      handleSubmit(transcript);
                    }}
                    className={`text-2xl p-4 rounded-full flex items-center justify-center ${
                      isRecording
                        ? "border-[1px] border-transparent bg-custom-pink hover:bg-custom-pink/50"
                        : "border-[1px] border-custom-textColor hover:bg-custom-pink/50"
                    } duration-300 ease-linear`}
                  >
                    <IoSearchSharp />
                  </button>
                )}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export { Voice };
