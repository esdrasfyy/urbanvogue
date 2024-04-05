import { Divider } from "@chakra-ui/react";
import React from "react";
import { FaPager } from "react-icons/fa";
import { HiClipboardList, HiOutlineInformationCircle } from "react-icons/hi";
import { FiInfo } from "react-icons/fi";
import {
  TbCircleNumber1,
  TbCircleNumber2,
  TbCircleNumber3,
  TbCircleNumber4,
  TbInfoHexagonFilled,
} from "react-icons/tb";
import Link from "next/link";
import qrcode from "@/assets/qrcode2.png";
import Image from "next/image";
import { HiMiniCamera } from "react-icons/hi2";
import { MdContentCopy } from "react-icons/md";
function PaymentPix() {
  return (
    <main className="max-w-[1100px] w-full flex mt-36 px-4 ">
      <div className="flex gap-5 max-lg:flex-col w-full">
        <div className="bg-custom-grayTwo rounded-md shadow-snipped p-5 text-custom-textColor min-w-[350px] max-[900px]:flex-row max-lg:w-full max-sm:min-w-0 ">
          <h2 className="flex gap-3 items-center text-xl">
            <span className="text-custom-pink text-2xl">
              <HiClipboardList />
            </span>
            ORDER INFORMATION
          </h2>
          <div className="flex w-full gap-3 items-center mt-5 font-semibold">
            <p className="flex items-center gap-2">Order accepted, awaiting payment <span className="text-custom-pink mt-0.5">
              {" "}
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
            </span></p>
            
          </div>
          <div className="mt-5 text-custom-textColor/70 text-sm">
            <p>
              Your code expires in{" "}
              <span className="text-custom-pink font-semibold mx-1">
                00:20:46
              </span>
              , make payment within the deadline.
            </p>
          </div>
          <div className="mt-3 text-custom-textColor/70 text-sm">
            <p>
              Page diretamente em uma pagina do{" "}
              <span className="text-custom-pink font-semibold text-sm">
                MERCADO PAGO.
              </span>
            </p>
          </div>
          <Divider className="my-5" />
          <h2 className="flex gap-3 items-center text-xl">
            <span className="text-custom-pink text-2xl">
              <HiClipboardList />
            </span>
            ORDER RESUME
          </h2>
          <div className="mt-3 text-sm">
            <p>
              <span className="font-semibold">Method:</span> pix
            </p>
          </div>
          <div className="mt-3 text-sm">
            <p>
              <span className="font-semibold">Order number:</span> 983923013302
            </p>
          </div>
          <div className="mt-3 text-sm">
            <p>
              <span className="font-semibold">Order created:</span> 2024-03-07
              08:52
            </p>
          </div>
          <div className="mt-3 text-sm">
            <p>
              <span className="font-semibold">Price:</span> $60,89
            </p>
          </div>
          <div className="mt-3 text-sm">
            <p>
              <span className="font-semibold">Status:</span> pending
            </p>
          </div>
          <div className="mt-3 text-sm">
            <p>
              <span className="font-semibold">Street:</span> Rua Vereda Alfa
            </p>
            <p className="mt-3 text-sm">
              <span className="font-semibold">Number:</span> 35
            </p>
            <p className="mt-3 text-sm">
              <span className="font-semibold">CEP:</span> 08450-384 | Sao Paulo,
              SP
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-5">
          <div className="w-full bg-custom-grayTwo rounded-md shadow-snipped p-5 text-custom-textColor">
            <h2 className="flex gap-3 items-center text-xl">
              <span className="text-custom-pink text-2xl">
                <TbInfoHexagonFilled />
              </span>
              PIX PAYMENT GUIDE
            </h2>
            <div className="flex gap-3 mt-5 items-center">
              <span className="text-2xl text-custom-pink">
                <TbCircleNumber1 />
              </span>
              <p className="text-sm text-custom-textColor/70">
                Acesse o app do seu banco ou internet banking de preferência.
              </p>
            </div>
            <div className="flex gap-3 mt-4 items-center">
              <span className="text-2xl text-custom-pink">
                <TbCircleNumber2 />
              </span>
              <p className="text-sm text-custom-textColor/70">
                Escolha pagar via Pix.
              </p>
            </div>
            <div className="flex gap-3 mt-4 items-center">
              <span className="text-2xl text-custom-pink">
                <TbCircleNumber3 />
              </span>
              <p className="text-sm text-custom-textColor/70">
                Escaneie o QR Code ou copie e cole o código Pix acima.
              </p>
            </div>
            <div className="flex gap-3 mt-4 items-center">
              <span className="text-2xl text-custom-pink">
                <TbCircleNumber4 />
              </span>
              <p className="text-sm text-custom-textColor/70">
                Seu pagamento será aprovado em alguns segundos.{" "}
              </p>
            </div>
            <div className="flex mt-5">
              <p className="text-custom-textColor/30 text-xs">
                Confira alguns cuidados ao efetuar pagamentos via pix, e evite
                cair em golpes ou fraudes. Acesse
                <Link
                  href={
                    "https://www.serasa.com.br/premium/blog/golpes-e-fraudes-com-pix/"
                  }
                  target="blank"
                  className="text-custom-pink font-bold"
                >
                  {" "}
                  SERASA.
                </Link>
              </p>
            </div>
          </div>
          <div className="flex gap-5 max-sm:flex-col">
            <div className="bg-custom-grayTwo rounded-md shadow-snipped p-5 text-custom-textColor flex items-center justify-center max-w-2/5 w-full gap-2">
              <Image alt="qrcode" src={qrcode} width={170} />
              <h3 className="flex items-center writing2 uppercase">
                SCAM{" "}
                <span className="text-custom-pink">
                  <HiMiniCamera />
                </span>
              </h3>
            </div>
            <div className="bg-custom-grayTwo rounded-md shadow-snipped p-5 text-custom-textColor flex gap-5 flex-col items-start w-3/5 max-sm:w-full">
              <div className="flex w-full justify-between">
                <h3 className="text-xl">PIX COPY AND PASTE</h3>
                <button className="text-xl text-custom-pink">
                  <MdContentCopy />
                </button>
              </div>
              <div className="flex h-full w-full">
                <p className="max-w-full text-sm text-custom-textColor/70">
                  00020126580014br.gov.bcb.pix0136b76aa9c2-2ec4-4110-954e-ebfe34f05b6152040000530398654041.005802BR5910ES1TBSky246012S?ympg
                  Mkylo62230519mpqrinter13173548886304086E
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center text-custom-textColor gap-5 max-md:flex-wrap">
            <div className="flex gap-5 w-full">
              <button className="py-2 w-full font-semibold bg-custom-grayTwo text-xs rounded-md shadow-snipped uppercase">
                order details
              </button>
              <button className="py-2 w-full font-semibold bg-custom-grayTwo text-xs rounded-md shadow-snipped uppercase">
                Check Payment
              </button>
            </div>
            <div className="flex gap-5 w-full">
              <button className="py-2 w-full font-semibold bg-custom-grayTwo text-xs rounded-md shadow-snipped uppercase">
                My orders
              </button>
              <button className="py-2 w-full font-semibold bg-custom-grayTwo text-xs rounded-md shadow-snipped uppercase">
                help
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export { PaymentPix };
