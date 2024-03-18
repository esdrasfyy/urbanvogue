"use client";
import {
  Divider,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { RatingView } from "../../../components/ui/rating/rating-view/index";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { InputUi } from "../../../components/ui/inputs/default/index";
import { ProductPageI } from "../../../interfaces/product/card/index";
import { ProductByIdApi } from "../../../services/products-by-ids";
import { SlideProducts } from "../../../components/carousel/index";
import { ContextCart } from "../../../contexts/ContextCart/index";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Accordions } from "./components/accordions/index";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SlArrowRightCircle } from "react-icons/sl";
import Comments from "./components/comments/index";
import { BsShare } from "react-icons/bs";
import Loading from "./loading";
import Image from "next/image";
import Link from "next/link";
import * as yup from "yup";

type Inputs = {
  cep: string;
};

const schema = yup.object().shape({
  cep: yup.string().required("This field is required!"),
});

interface ProductCart {
  id: number;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}
interface ProductResponse {
  products: ProductPageI[];
  notFoundIds: number[];
}

function Page({ params }: any) {
  const [selectImage, setSelectImage] = useState("");
  const [selectColor, setSelectColor] = useState("");
  const [selectSize, setSelectSize] = useState("");
  const [qtd, setQtd] = useState(1);
  const [heart, setHeart] = useState(false);
  const [dataCard, setDataCard] = useState<ProductPageI | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [installment, setInstallment] = useState<number>();

  const context = useContext(ContextCart);

  useEffect(() => {
    const fetchData = async () => {
      const id = params.slug[0];

      await ProductByIdApi({ id }).then((response) => {
        
        if (response.status === 200) {
          if (response?.data?.product) {
            const { price, images, sizes, colors } = response.data.product;
            if (price) {
              const priceValue = parseFloat(price);
              setPrice(priceValue);

              const installment = (priceValue / 6).toFixed(2);
              setInstallment(parseFloat(installment));
            }

            if (images?.length > 0) {
              setSelectImage(images[0].url);
            }
            if (sizes?.length > 0) {
              setSelectSize(sizes[0].size);
            }
            if (colors?.length > 0) {
              setSelectColor(colors[0].name_color);
            }

            setDataCard(response.data.product);
          }
        }
      });
    };

    fetchData();
  }, [params.slug]);

  const handleAddItem = () => {
    if (!context) {
      return;
    }
    const { addItemToCart } = context;

    const data = {
      id: dataCard?.id,
      price: price,
      quantity: qtd,
      size: selectSize,
      color: selectColor,
    };

    if (dataCard?.id) {
      addItemToCart(data as ProductCart);
    }
  };

  const handleImageClick = (url: string) => {
    setSelectImage(url);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const cep = data.cep;
    try {
      alert("cep pesquisado");
    } catch (error) {
      alert("cep nao pesquisado");
    } finally {
    }
  };

  const handleInputChange = (event: any) => {
    setQtd(event.target.value);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <main className="h-full w-full max-w-[1050px] flex flex-col items-center justify-center overflow-hidden px-4">
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
                quality={100}
              />
            </div>
          </ModalContent>
        </Modal>
        {dataCard && (
          <Suspense fallback={<Loading />}>
            <section className="h-full mt-28 bg-custom-grayTwo max-w-[1050px] w-full mx-12 max-md:mx-2 p-4 shadow-snipped text-custom-textColor rounded-md">
              <div className="flex w-full h-[573px] gap-4 flex-col max-md:h-auto">
                <div className="flex w-full justify-between max-md:flex-col max-md:gap-3">
                  <div className="flex text-base items-center text-custom-textColor max-md:text-xs">
                    <span>SHOP</span>
                    <span className="text-2xl">
                      <MdKeyboardDoubleArrowRight className="" />
                    </span>
                    <span className="line-clamp-1 text-custom-pink underline uppercase">
                      {dataCard?.title.split("-")[1]}
                    </span>
                  </div>
                  <div className="flex justify-between font-normal gap-12">
                    <div className="flex items-center gap-3">
                      <span>{dataCard?.rating.toFixed(1)}</span>
                      <span className="flex text-custom-pink">
                        <RatingView rating={dataCard?.rating || 3.0} />
                      </span>
                      <span className="flex gap-1">
                        {" "}
                        |{" "}
                        <span className="text-custom-pink">
                          {dataCard?.quantityRatings}
                        </span>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span>{dataCard?.sold}</span>
                      <span>sold</span>
                    </div>
                  </div>
                </div>
                <div className="flex w-full gap-3 h-full max-md:flex-col">
                  <div className="w-[40%] h-full flex gap-4 max-md:w-full max-md:h-[530px]">
                    <div>
                      <ul className="flex flex-col gap-[16.5px] min-h-full">
                        {dataCard?.images &&
                          dataCard.images.slice(0, 5).map((imagem, index) => (
                            <li
                              className={`w-14 h-[93px]  cursor-pointer ${
                                selectImage === imagem.url
                                  ? "border-2 border-solid border-custom-pink"
                                  : "border-2 border-solid border-custom-grayThree opacity-40"
                              } rounded-md relative`}
                              key={index}
                            >
                              <Image
                                alt={imagem?.url}
                                loading="lazy"
                                blurDataURL={imagem?.url}
                                fill
                                src={imagem?.url}
                                onMouseOver={() =>
                                  handleImageClick(imagem?.url)
                                }
                                onClick={() => handleImageClick(imagem?.url)}
                                className="shadow-snipped w-full h-full rounded-md"
                              />
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="min-h-[100%] w-[100%] flex relative">
                      {dataCard?.images && dataCard.images.length > 0 && (
                        <Image
                          loading="lazy"
                          blurDataURL={selectImage}
                          alt={selectImage}
                          src={selectImage}
                          fill
                          className="cursor-zoom-in h-full w-full shadow-snipped rounded-md"
                          onClick={onOpen}
                        />
                      )}
                    </div>
                  </div>
                  <div className="w-[60%] h-full font-semibold flex flex-col justify-between max-md:w-full">
                    <div className="flex text-2xl font-bold">
                      <p>{dataCard?.title}</p>
                    </div>
                    <div className="flex">
                      <p className="font-light ">
                        Sold and delivered by{" "}
                        <span className="text-custom-pink">Urban Vogue</span>
                      </p>
                      <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-lg font-semibold text-custom-pink rounded-full dark:bg-gray-700 dark:text-blue-400">
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="currentColor"
                            d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
                          />
                          <path
                            fill="#fff"
                            d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
                          />
                        </svg>
                        <span className="sr-only">Icon description</span>
                      </span>
                    </div>
                    <div className="flex gap-8 mt-4 items-center flex-wrap  ">
                      <div>
                        <p className="text-3xl text-custom-pink">
                          $ {price.toFixed(2)}
                        </p>
                      </div>
                      <div> or </div>
                      <div>
                        <p className="text-base text-custom-textColor/60">
                          6x of {installment?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <form className="flex-col mt-4">
                      <div className="w-full flex gap-2 items-center relative">
                        <div className="flex w-full flex-col">
                          <InputUi
                            type="text"
                            pleaceholder="00000-000"
                            label="calculate shipping"
                            name="cep"
                            classname="shadow-snipped"
                            register={register}
                          />
                        </div>
                        <button
                          type="submit"
                          className="hover:text-custom-pink duration-300 ease-linear py-3.5 rounded-sm absolute right-4 top-[25px] z-10 flex items-center justify-center text-2xl"
                        >
                          <SlArrowRightCircle />
                        </button>
                      </div>
                    </form>
                    {dataCard && dataCard?.colors.length > 0 && (
                      <div className="flex gap-2 mt-4">
                        <p>Variations:</p>
                        <ul className="flex gap-3">
                          {dataCard.colors.map((color, index) => {
                            return (
                              color.name_color !== undefined && (
                                <li
                                  className="cursor-pointer shadow-snipped"
                                  key={index}
                                >
                                  <span
                                    className={`text-sm  px-2 py-[2px] rounded-xl font-medium hover:bg-custom-grayTwo ease-in-out duration-300 hover:text-custom-pink hover:border-custom-pink  ${
                                      selectColor === color.name_color
                                        ? "bg-custom-grayTwo text-custom-pink border-custom-pink border-[1px] border-solid"
                                        : "border-[1px] border-solid bg-custom-grayThree"
                                    }`}
                                    onClick={() =>
                                      setSelectColor(color.name_color)
                                    }
                                  >
                                    {color.name_color}
                                  </span>
                                </li>
                              )
                            );
                          })}
                        </ul>
                      </div>
                    )}
                    {dataCard && dataCard?.sizes.length > 0 && (
                      <div className="flex gap-2 mt-4">
                        <p>Sizes:</p>
                        <ul className="flex gap-3">
                          {dataCard.sizes.map((size, index) => {
                            return (
                              size.size !== undefined && (
                                <li
                                  className="cursor-pointer shadow-snipped"
                                  key={index}
                                >
                                  <span
                                    className={`text-sm  px-2 py-[2px] rounded-xl font-medium hover:bg-custom-grayTwo ease-in-out duration-300 hover:text-custom-pink hover:border-custom-pink  ${
                                      selectSize === size.size
                                        ? "bg-custom-grayTwo text-custom-pink border-custom-pink border-[1px] border-solid"
                                        : "border-[1px] border-solid bg-custom-grayThree"
                                    }`}
                                    onClick={() => setSelectSize(size.size)}
                                  >
                                    {size.size}
                                  </span>
                                </li>
                              )
                            );
                          })}
                        </ul>
                      </div>
                    )}
                    {dataCard?.quantidy && (
                      <div className="flex gap-3 mt-4 items-center">
                        <p>Qtd:</p>
                        <div className="relative flex items-center">
                          <button
                            type="button"
                            onClick={() => setQtd(qtd > 1 ? qtd - 1 : qtd)}
                            id="decrement-button"
                            data-input-counter-decrement="counter-input"
                            className="flex-shrink-0 shadow-snipped bg-custom-grayTwo hover:bg-custom-grayOne duration-300 ease-linear inline-flex items-center justify-center border border-custom-pink h-7 w-7 focus:ring-custom-pink dark:focus:ring-gray-700 focus:ring-1 focus:outline-none rounded-full"
                          >
                            <svg
                              className="w-3.5 h-3.5 text-custom-pink dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <input
                            type="number"
                            id="counter-input"
                            data-input-counter
                            onChange={handleInputChange}
                            className="flex-shrink-0 -mx-1 text-custom-pink font-extrabold dark:text-white border-0 bg-transparent text-lg focus:outline-none focus:ring-0 max-w-[3.5rem] text-center"
                            placeholder=""
                            value={qtd}
                            required
                          />
                          <button
                            type="button"
                            id="increment-button"
                            data-input-counter-increment="counter-input"
                            className="flex-shrink-0 bg-custom-grayTwo shadow-snipped hover:bg-custom-grayOne duration-300 ease-linear inline-flex items-center justify-center border border-custom-pink h-7 w-7 focus:ring-custom-pink dark:focus:ring-gray-700 focus:ring-1 focus:outline-none rounded-full"
                            onClick={() =>
                              setQtd(qtd < dataCard?.quantidy ? qtd + 1 : qtd)
                            }
                          >
                            <svg
                              className="w-3.5 h-3.5 text-custom-pink dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col gap-4 mt-2">
                      <div className="flex w-full mt-2 gap-3">
                        <Link
                          href={"/checkout"}
                          className="w-full rounded-md py-2.5 border-solid border-custom-pink border-2 duration-300 ease-linear bg-custom-pink/50 text-xl hover:bg-custom-pink shadow-snipped text-center"
                        >
                          BUY NOW
                        </Link>
                        <button className="min-w-[50px] px-[7px] text-[23px] relative rounded-md duration-300 ease-linear hover:bg-custom-grayThree/50 shadow-snipped flex items-center justify-center">
                          <BsShare />
                        </button>
                      </div>
                      <div className="flex w-full mt-2 gap-3">
                        <button
                          className="shadow-snipped w-full rounded-md py-2.5 border-solid border-custom-grayThree border-2 duration-300 ease-linear shadow-const first = useRef(second)ed text-xl hover:bg-custom-grayThree"
                          onClick={handleAddItem}
                        >
                          ADD CART
                        </button>
                        <button className="min-w-[50px] px-[7px] text-2xl relative rounded-md duration-300 ease-linear hover:bg-custom-grayThree/50 shadow-snipped">
                          <span
                            className={`heart ${heart ? "heartActived" : ""}`}
                            onClick={() => setHeart(!heart)}
                          ></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Divider orientation="horizontal" className="mt-12" />
              {dataCard && dataCard.details.length > 0 && (
                <Accordions
                  details={dataCard?.details}
                  summary={dataCard?.summary}
                />
              )}
            </section>
            <section className="mt-2 border-solid border-4 border-custom-grayTwo h-full bg-custom-grayOne max-w-[1050px] w-full mx-12 pb-12 max-md:mx-2 p-4 shadow-snipped text-custom-textColor flex flex-col gap-12 pt-12 rounded-md">
              <SlideProducts query="order_by=created_at:desc" category="NEWS" notArrow={true} />
              <SlideProducts query="order_by=created_at:desc" category="NEWS" notArrow={true}/>
            </section>
            <Comments
              title={dataCard?.title || " "}
              img={dataCard?.images[0].url || " "}
              id={params.slug[0]}
              percentage={dataCard?.percentage || 100}
              rating={dataCard?.rating || 3.0}
              quantityRatings={dataCard?.quantityRatings || 0}
            />
          </Suspense>
        )}
      </main>
    </>
  );
}

export default Page;
