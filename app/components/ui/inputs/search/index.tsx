"use client";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { MdKeyboardVoice } from "react-icons/md";
import { SearchInputProps } from "./types";
import { useRouter, useSearchParams } from "next/navigation";
import gif from "@/assets/gifs/Animation - 1712939579857.json";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Lottie from "lottie-react";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import { Voice } from "@/components/voice";

function SearchInputUi({ classname }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>(searchParams.get("query") || "");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value) {
      return router.push(`/search?query=${value}&page=1`);
    }
  };
  const lottieRef = useRef<any>(); // Ref para o componente Lottie
  const [isPlaying, setIsPlaying] = useState(true); // Estado para controlar a reprodução da animação

  const togglePlay = () => {
    if (lottieRef.current) {
      if (isPlaying) {
        lottieRef.current.pause(); // Pausa a animação
      } else {
        lottieRef.current.play(); // Reproduz a animação
      }
      setIsPlaying(!isPlaying); // Inverte o estado de reprodução da animação
    }
  };


  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <form
      className={`relative ${classname} shadow-snipped rounded-full `}
      onSubmit={(e) => onSubmit(e)}
    >
      <div className={`relative w-full`}>
        <input
          type="search"
          className={`shadow-snipped duration-300 ease-linear relative bg-custom-grayThree border-custom-grayThree border-2 rounded-3xl py-[3px] pl-16 text-white transition-all hover:opacity-70 w-full outline-none searchInput text-lg max-[400px]:pl-12 focus:outline-none focus:ring-0 focus:border-custom-pink focus:border-2  ring-0`}
          placeholder="ex: Camisa"
          onChange={handleChange}
          value={value}
        />
        <button
          type="submit"
          className="absolute left-0 top-[50%] -translate-y-1/2 bg-white text-grayOnerounded-full duration-200 transition-all ease-linear hover:opacity-60 z-10 p-[6px] text-2xl rounded-full"
        >
          <HiSearch />
        </button>
       <Voice/>
      </div>
    </form>
  );
}

export { SearchInputUi };
