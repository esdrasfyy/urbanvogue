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
import { LeftSide } from "./components/left-side";
import { RightSide } from "./components/right-side";
import { ProductCartI } from "@/contexts/ContextCart/types";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

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
                    <LeftSide data={dataCard} />
                    <RightSide dataProduct={dataCard} />
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
              <SlideProducts
                query="order_by=created_at:desc"
                category="NEWS"
                notArrow={true}
              />
              <SlideProducts
                query="order_by=created_at:desc"
                category="NEWS"
                notArrow={true}
              />
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
