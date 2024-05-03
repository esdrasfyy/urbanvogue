"use client";

import { useRef, useState, useEffect } from "react";
import { MdKeyboardVoice } from "react-icons/md";
import { dotWave } from "ldrs";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

function Voice({ handleSubmit }: { handleSubmit: (value: string) => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);
  const toast = useToast();
  const [audioStart, setAudioStart] = useState<HTMLAudioElement | null>(null);
  const [audioPause, setAudioPause] = useState<HTMLAudioElement | null>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (typeof window !== "undefined" && window.webkitSpeechRecognition) {
      dotWave.register();
      const startAudio = new Audio("/resources/start.mp3");
      const pauseAudio = new Audio("/resources/pause.mp3");
      setAudioStart(startAudio);
      setAudioPause(pauseAudio);
    }
  }, []);

  const handleTranscript = () => {
    setTimeout(() => {
      if (transcript) {
        handleSubmit(transcript.toLowerCase());
        stopRecording();
      }
    }, 3000);
  };

  useEffect(() => {
    handleTranscript();
  }, [transcript]);

  const startRecording = () => {
    audioStart?.play();
    setIsRecording(true);
    if (typeof window !== "undefined" && window.webkitSpeechRecognition) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
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
      audioPause?.play();
      setIsRecording(false);
      recognitionRef.current.stop();
      onClose();
    }
  };

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
    setTranscript("");
    startRecording();
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
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          stopRecording();
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
          className="shadow-snipped"
        >
          <ModalBody>
            <div className="flex items-center justify-center flex-col my-10">
              <div className="h-16 flex justify-end mb-6">
                {isRecording ? (
                  <span className="mt-2">
                    <l-dot-wave size="75" speed="1" color="white"></l-dot-wave>
                  </span>
                ) : (
                  <span className=" text-[48px] flex gap-1.5 text-white">
                    <span>•</span>
                    <span>•</span>
                    <span>•</span>
                    <span>•</span>
                  </span>
                )}
              </div>
              {transcript ? (
                <p className="text-custom-pink text-xl font-semibold">
                  {transcript}
                </p>
              ) : (
                <p className="text-custom-pink text-xl font-semibold">
                  Say your search...
                </p>
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export { Voice };
