import Image from "next/image";
import React from "react";
import {
  FaAngry,
  FaGrinHearts,
} from "react-icons/fa";
import {RatingView} from "../../../../../../../components/ui/rating/rating-view";
import { Modal, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { CommentI } from "../../../../../../../interfaces/comment";

interface Url {
  url: string;
}

interface CommentProps {
  comment: CommentI;
}
function CommentCard({ comment }: CommentProps) {
  function formatarData(data: string): string {
    const partesData = data.split("-");
    const dataFormatada = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;
    return dataFormatada;
  }
  const rating = parseFloat(comment.rating);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
  <>
    <li className="w-full flex flex-col bg-custom-grayTwo p-5 rounded-sm shadow-snipped">
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minWidth={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <div className="absolute top-[100px] mx-5 min-h-[50vh] min-w-[70vw] object-cover flex items-center justify-center">
            <Image
              alt={comment.urls[0].url}
              src={comment.urls[0].url}
              width={999}
              height={999}
              quality={100}
            />
          </div>
        </ModalContent>
      </Modal>

      <div className="flex justify-between w-full">
        <div className="flex justify-between gap-3">
          <figure className="rounded-full object-cover">
            <Image
              alt="a"
              src={comment.user_img}
              className="rounded-full min-h-[45px] min-w-[45px] max-h-[45px] max-w-[45px] h-full w-full"
              width={800}
              height={800}
              />
          </figure>
          <div className="flex flex-col">
            <p className="text-lg">{comment.username} </p>
            <div className="flex text-custom-pink">
              <RatingView rating={rating} />
            </div>
          </div>
        </div>
        <div className="max-sm:hidden">
          <span className="text-custom-grayThree">
            {formatarData(comment.timespost.toString().split("T")[0])}
          </span>{" "}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mt-2">
          <p>{comment.text_comment}</p>
        </div>
        <div className="flex w-full justify-between mt-2 max-sm:flex-col max-sm:gap-4">
          <div className="mt-2 cursor-pointer">
            <Image
              alt="a"
              src={comment.urls[0].url}
              width={800}
              onClick={onOpen}
              height={800}
              className="w-24 h-24"
              />
          </div>
          <div className="min-h-full flex items-end justify-end pt-1 gap-2 max-sm:justify-start max-sm:flex-col max-sm:mt-4">
            {comment.recommend ? (
              <div className="flex items-center gap-3 max-sm:gap-1 max-sm:text-sm">
                <p>Recommend this product!</p>
                <span className="text-xl text-custom-pink">
                  <FaGrinHearts />
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <p>Does not recommend! </p>
                <span className="text-custom-grayThree text-xl">
                  <FaAngry />
                </span>
              </div>
            )}
            <div className="hidden max-sm:block">
              <span className="text-custom-grayThree">
                {formatarData(comment.timespost.toString().split("T")[0])}
              </span>{" "}
            </div>
          </div>
        </div>
      </div>
    </li>
              </>
  );
}

export default CommentCard;
