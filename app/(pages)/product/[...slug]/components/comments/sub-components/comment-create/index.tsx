import React, { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TbArrowBadgeRight } from "react-icons/tb";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { TextAreaUi } from "../../../../../../../components/ui/inputs/textarea/index";
import { RatingUi } from "../../../../../../../components/ui/rating/rating-ui/index";
import Image from "next/image";
import { FaAngry, FaGrinHearts } from "react-icons/fa";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../../../../../services/firebase/index";
import { CreateCommentApi } from "../../../../../../../services/comments/create/index";
import { LoadingSpinner } from "../../../../../../../components/ui/loading/index";
import { ContextUser } from "../../../../../../../contexts/ContextUser";

type Inputs = {
  recommend: boolean;
  comment: string;
  file?: FileList;
};

const schema = yup.object().shape({
  recommend: yup.boolean().required("This field is required!"),
  comment: yup
    .string()
    .required("This field is required!")
    .min(20, "Minimo de 20 caracteres")
    .max(255, "Maximo de 255 caracteres"),
});

interface CreateCommentProps {
  img: string;
  title: string;
  id: number;
}
function CreateComment({ img, title, id }: CreateCommentProps) {
  const context = useContext(ContextUser);

  const [loading, setLoading] = useState(false);
  const [recommendValue, setRecommendValue] = useState(true);
  const [rating, setRating] = useState(1);
  const toast = useToast();

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!context) {
      return;
    }
    const { user } = context;
    const { comment, recommend, file } = data;
    try {
      setLoading(true);
      let url = "";

      if (file && file.length > 0) {
        const storageRef = ref(storage, `images/${file[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, file[0]);
        await uploadTask;

        url = await getDownloadURL(uploadTask.snapshot.ref);
      }
      console.log(typeof user?.user.user_id);

      const result = await CreateCommentApi({
        comment: {
          text_comment: comment,
          user_id: Number(user?.user.user_id),
          user_img: user?.user.profile_img || "",
          username: user?.user.username || "",
          product_id: Number(id),
          rating: rating.toFixed(1),
          recommend: recommend,
        },
        urls: [{ url: url }],
      });
      console.log(result);

      if (result && !result.error && result.status === 201) {
        toast({
          title: "Comment created.",
          description: "Thank you for your feedback.",
          status: "success",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
          position: "top-right",
        });
        setInterval(() => {
          onClose();
        }, 2500);
      }
      if (result.status !== 201) {
        toast({
          title: "Failed to create comment.",
          description: `${result.data?.msg || "Try again later."}`,
          status: "error",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
          position: "top-right",
        });
        setInterval(() => {
          onClose();
        }, 2500);
      }
    } catch (error) {
      console.error("Erro durante o upload:", error);
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const verifyUser = () => {
    if (!context) {
      return;
    }
    const { user } = context;

    if (!user || !user.user) {
      return alert("necessario fazer login");
    }
    onOpen();
  };

  return (
    <div className="pb-3 mt-6">
      <button
        onClick={verifyUser}
        className="flex items-center mt-3 gap-3 group"
      >
        Evaluate Product{" "}
        <span className="text-xl text-custom-pink mt-0.5 duration-300 ease-linear  group-hover:translate-x-2">
          <TbArrowBadgeRight />
        </span>
      </button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        size={"3xl"}
        onClose={onClose}
      >
        <ModalOverlay
          bg="none"
          backdropFilter="saturate(150%) blur(4px)"
          backdropInvert="50%"
          backdropBlur="3px"
        />
        <ModalContent
          backgroundColor={"#171a1b"}
          textColor={"#d9d9d9"}
          borderRadius={"4px"}
          position={"relative"}
        >
          <ModalHeader>Make your comment</ModalHeader>
          <ModalCloseButton />
          <div className="px-7 mt-3">
            <div className="flex gap-3 line-clamp-2">
              <div>
                <Image
                  alt="a"
                  src={img}
                  width={100}
                  height={100}
                  className="w-16 h-20 rounded-sm border-solid border-custom-pink border-2"
                />
              </div>
              <div>
                <p>{title}</p>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <RatingUi
                label="Rating"
                star={rating}
                onRatingChange={handleRatingChange}
              />
              <div className=" mt-4">
                <h3 className="text-sm">Do you recommend this product?</h3>
                <label className="relative inline-flex items-center cursor-pointer mt-4">
                  <input
                    type="checkbox"
                    checked={recommendValue}
                    onClick={() => setRecommendValue(!recommendValue)}
                    className="sr-only peer"
                    {...register("recommend")}
                  />
                  <div className="w-11 h-6 bg-custom-grayThree peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-custom-pink"></div>
                  <span
                    className={`ms-3 text-2xl font-medium ${
                      recommendValue
                        ? "text-custom-pink"
                        : "text-custom-grayThree"
                    }`}
                  >
                    {recommendValue ? <FaGrinHearts /> : <FaAngry />}
                  </span>
                </label>
              </div>
              <div className="flex flex-col mt-5">
                <TextAreaUi
                  label="Write a comment:"
                  type="text"
                  pleaceholder="Share more about what you think of the product to help other buyers."
                  classname="w-full text-custom-textColor bg-custom-pink "
                  name="comment"
                  register={register}
                  error={errors?.comment?.message}
                  autofocus={true}
                  disabled={loading ? true : false}
                />
              </div>
              <div className="pb-6 flex justify-between gap-3 items-center max-sm:flex-wrap">
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-custom-textColor"
                    htmlFor="file_input"
                  >
                    Upload file
                  </label>
                  <input
                    className="input-file"
                    aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                    {...register("file")}
                  />
                  <p
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="file_input_help"
                  >
                    SVG, PNG, JPG or WEBP (MAX. 800x400px).
                  </p>
                </div>
                <div className="flex gap-3 mt-1 justify-end max-sm:w-full">
                  <button
                    disabled={loading}
                    onClick={onClose}
                    className="py-1.5 px-6 border-2 border-custom-pink/40 rounded-md hover:bg-custom-pink duration-300 ease-linear"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={loading}
                    type="submit"
                    className="py-2 px-6 bg-custom-pink/40 rounded-md hover:bg-custom-pink duration-300 ease-linear"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
          {loading && (
            <div className="absolute w-full h-full bg-custom-grayTwo/80 text-custom-pink  rounded-md flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default CreateComment;
