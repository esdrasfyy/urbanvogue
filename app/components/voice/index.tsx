"use client";
import { useRef, useState, useEffect } from "react";
import Lottie from "lottie-react";
import gif from "@/assets/gifs/Animation - 1712939579857.json";
import { MdKeyboardVoice } from "react-icons/md";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

// Declare a global interface to add the webkitSpeechRecognition property to the Window object
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

// Export the Voice component
function Voice() {
  const lottieRef = useRef<any>(); // Ref para o componente Lottie
  const [isRecording, setIsRecording] = useState(false); // Estado para controlar a gravação
  const [transcript, setTranscript] = useState(""); // Estado para armazenar o texto transcrito
  const [isPlaying, setIsPlaying] = useState(false); // Inicia a animação como pausada

  const recognitionRef = useRef<any>(null); // Ref para armazenar o objeto de reconhecimento de voz

  useEffect(() => {
    if (!window.webkitSpeechRecognition) {
      console.log("Speech recognition not supported in this browser");
    } else {
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
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (lottieRef.current) {
      if (isPlaying) {
        lottieRef.current.play(); // Se isPlaying for verdadeiro, reproduz a animação
      } else {
        lottieRef.current.pause(); // Se isPlaying for falso, pausa a animação
      }
    }
  }, [isPlaying]); // Atualiza sempre que isPlaying mudar

  // Função para iniciar a gravação
  const startRecording = () => {
    setIsRecording(true);
    // Código para iniciar a gravação...
  };

  // Função para parar a gravação
  const stopRecording = () => {
    setIsRecording(false);
    // Código para parar a gravação...
  };

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      {/* Botão de microfone */}
      <span
        className="absolute right-3 z-10 top-[50%] translate-y-[-50%] text-white text-2xl duration-200 transition-all ease-linear hover:text-custom-pink max-md:text-2xl cursor-pointer"
        onClick={onOpen}
      >
        <MdKeyboardVoice />
      </span>
      {/* Modal de gravação */}
      <Modal isOpen={isOpen} onClose={() =>{
        stopRecording()
        onClose()
        
        }} isCentered >
        <ModalOverlay />
        <ModalContent
          background={"#1d2123"}
          textColor={"#d9d9d9"}
          margin={"0px 16px"}
        >
          <ModalBody>
            <div className="flex items-center justify-center flex-col my-10">
              {isRecording ? (
                <h3 className="uppercase font-semibold text-xl">Speak now</h3>
              ) : (
                <h3 className="uppercase font-semibold text-xl">Start press</h3>
              )}
              {/* Componente Lottie */}
              <Lottie
                animationData={gif}
                width={200}
                height={200}
                renderer="svg"
                lottieRef={lottieRef}
              />
              <p className="text-custom-textColor/50 text-lg mb-10">
                {transcript ? transcript : " Say your search..."}
              </p>
              {/* Botão de microfone */}
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
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export { Voice };
