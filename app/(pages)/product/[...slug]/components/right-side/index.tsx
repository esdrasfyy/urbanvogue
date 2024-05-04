import React, { useContext, useState } from 'react'
import Link from 'next/link';
import { InputUi } from '../../../../../components/ui/inputs/default';
import { ContextCart } from '../../../../../contexts/ContextCart';
import { BsShare } from 'react-icons/bs';
import { SlArrowRightCircle } from 'react-icons/sl';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProductPageI } from '../../../../../interfaces/product/card';
import { ProductCartI } from '@/contexts/ContextCart/types';

  type Inputs = {
    cep: string;
  };
  
  const schema = yup.object().shape({
    cep: yup.string().required("This field is required!"),
  });
  interface RightSideProps {
    dataProduct: ProductPageI;
  }

function RightSide({dataProduct}:RightSideProps) {
    const priceValue = parseFloat(dataProduct.price);
  
    const installmentValue = parseInt((priceValue / 6).toFixed(2));
    const [selectColor, setSelectColor] = useState<string>(dataProduct?.colors[0]?.name_color);
    const [selectSize, setSelectSize] = useState<string>(dataProduct?.sizes[0]?.size);
    const [qtd, setQtd] = useState(1);

    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });



    const [heart, setHeart] = useState<boolean>(false);
    const context = useContext(ContextCart);

    const handleAddItem = () => {
        if (!context) {
          return;
        }
        const { addItemToCart } = context;
    
        const data: ProductCartI = {
          id: dataProduct?.id,
          price: dataProduct.price,
          quantity: qtd,
          size: selectSize,
          color: selectColor,
          image: dataProduct.images[0].url,
          title: dataProduct?.title,
          colors: dataProduct.colors,
          sizes: dataProduct.sizes
        };
    
        if (dataProduct?.id) {
          addItemToCart(data);
        }
      };
      const handleInputChange = (event: any) => {
        setQtd(event.target.value);
      };

  return (
    <div className="w-[60%] h-full font-semibold flex flex-col justify-between max-md:w-full">
    <div className="flex text-2xl font-bold">
      <p>{dataProduct?.title}</p>
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
          $ {parseFloat(dataProduct.price).toFixed(2)}
        </p>
      </div>
      <div> or </div>
      <div>
        <p className="text-base text-custom-textColor/60">
          6x of {installmentValue}
        </p>
      </div>
    </div>
    <menu id='menu'>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </menu>
    <form className="flex-col mt-4">
      <div className="w-full flex gap-2 items-center relative">
        <div className="flex w-full flex-col relative">
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
          className="hover:text-custom-pink duration-300 ease-linear rounded-sm absolute right-4 top-[38px] max-lg:top-[34px] z-10 flex items-center justify-center text-2xl"
        >
          <SlArrowRightCircle />
        </button>
      </div>
    </form>
    {dataProduct && dataProduct?.colors.length > 0 && (
      <div className="flex gap-2 mt-4">
        <p>Variations:</p>
        <ul className="flex gap-3">
          {dataProduct.colors.map((color, index) => {
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
    {dataProduct && dataProduct?.sizes.length > 0 && (
      <div className="flex gap-2 mt-4">
        <p>Sizes:</p>
        <ul className="flex gap-3">
          {dataProduct.sizes.map((size, index) => {
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
    {dataProduct?.quantidy && (
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
              setQtd(qtd < dataProduct?.quantidy ? qtd + 1 : qtd)
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
          className="w-full rounded-md py-2.5 max-md:text-base max-md:py-2 border-solid border-custom-pink border-2 duration-300 ease-linear bg-custom-pink/50 text-xl hover:bg-custom-pink shadow-snipped text-center"
        >
          BUY NOW
        </Link>
        <button className="min-w-[50px] px-[7px] text-[23px]  relative rounded-md duration-300 ease-linear hover:bg-custom-grayThree/50 shadow-snipped flex items-center justify-center">
          <BsShare />
        </button>
      </div>
      <div className="flex w-full mt-2 gap-3">
        <button
          className="shadow-snipped w-full rounded-md py-2.5 max-md:text-base max-md:py-2  border-solid border-custom-grayThree border-2 duration-300 ease-linear shadow-const first = useRef(second)ed text-xl hover:bg-custom-grayThree"
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
  )
}

export {RightSide}