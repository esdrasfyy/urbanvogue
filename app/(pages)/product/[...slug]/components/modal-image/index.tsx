import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react'

interface ModalImageProps{
    selectImage: string;
    isOpen: boolean;
    onClose:() => void;
}
function ModalImage({selectImage, isOpen, onClose}:ModalImageProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent
      minWidth={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <div className="absolute top-[100px] mx-5 h-[70vh] max-sm:h-[50vh] object-cover flex items-center justify-center">
        <Image
          alt={selectImage}
          src={selectImage}
          width={200}
          height={200}
          className="h-full w-full"
         
        />
      </div>
    </ModalContent>
  </Modal>
  )
}

export {ModalImage};