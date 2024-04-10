"use client";
import { Divider, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { HiClipboardList } from "react-icons/hi";
import {
  TbCircleNumber1,
  TbCircleNumber2,
  TbCircleNumber3,
  TbCircleNumber4,
  TbInfoHexagonFilled,
} from "react-icons/tb";
import Link from "next/link";
import { HiMiniCamera } from "react-icons/hi2";
import { MdContentCopy } from "react-icons/md";
import { FindPaymentPixApi } from "@/services/payments/find-payment/pix";
import { useRouter } from "next/navigation";
import { calculateTimeDifference, formatBrazilianDate } from "@/masks/date";
import { QrCode } from "@/components/qrcode";
import copy from "clipboard-copy";
import { ContextLoading } from "@/contexts/ContextLoading";
import { PaymentFindPixI } from "@/services/payments/find-payment/pix/types";

function PaymentPix({
  order_id,
  payment_id,
}: {
  order_id: string;
  payment_id: string;
}) {
  const contextLoading = useContext(ContextLoading)!;
  const [data, setData] = useState<PaymentFindPixI | null>(null);
  const [created, setCreated] = useState<string | null>(null);
  const [expiration, setExpiration] = useState<string>("--:--:--");
  const router = useRouter();
  const toast = useToast()
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const { setLoading, loading } = contextLoading;
    async function getData() {
      try {
        setLoading(true);
        const {
          data: res,
          status,
          error,
        } = await FindPaymentPixApi({order_id, payment_id });
        if (status === 200 && !error && res?.response) {
          const formatedDate = formatBrazilianDate(res?.response?.payment_pix[0]?.date_created!)
          setCreated(formatedDate);
          return setData(res?.response);
        }
        return router.back();
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }

    if (!data) {
      getData();
    }

    return () => clearInterval(intervalId);
  }, [order_id, payment_id]);

  useEffect(() => {
    if (data?.payment_pix[0]?.date_of_expiration) {
      const intervalId = setInterval(() => {
        const formatExpiration = calculateTimeDifference(
          data?.payment_pix[0]?.date_of_expiration!
        );
        setExpiration(formatExpiration);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [data]);

  const handlecopy = () => {
    copy(data?.payment_pix[0]?.qr_code!);
    toast({
      title: "Copied!",
      description: "Code copy and paste copied.",
      status: "success",
      duration: 9000,
      isClosable: true,
      variant: "left-accent",
      position: "top-right",
    });
  };
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
            <p className="flex items-center gap-2">
              Order accepted, awaiting payment{" "}
              <span className="text-custom-pink mt-0.5">
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
              </span>
            </p>
          </div>
          <div className="mt-5 text-custom-textColor/70 text-sm">
            <p>
              Your code expires in{" "}
              <span className="text-custom-pink font-semibold mx-1">
                {expiration}
              </span>
              , make payment within the deadline.
            </p>
          </div>
          <div className="mt-3 text-custom-textColor/70 text-sm">
            <p>
              Page diretamente em uma pagina do{" "}
              <Link
                href={`${data?.payment_pix[0]?.ticket_url}`}
                target="blank"
                className="text-custom-pink font-semibold text-sm underline"
              >
                MERCADO PAGO.
              </Link>
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
              <span className="font-semibold">Payment number:</span>{" "}
              {data?.payment_pix[0].payment_id}
            </p>
          </div>
          <div className="mt-3 text-sm">
            <p>
              <span className="font-semibold">Order created:</span> {created}
            </p>
          </div>
          <div className="mt-3 text-sm">
            <p>
              <span className="font-semibold">Price:</span>{" "}BRL
              {data?.payment_pix[0]?.currency +
                " " +
                data?.payment_pix[0]?.transaction_amount}
            </p>
          </div>
          <div className="mt-3 text-sm">
            <p>
              <span className="font-semibold">Status:</span>{" "}
              {data?.payment_pix[0]?.status}
            </p>
          </div>
          <div className="mt-3 text-sm">
            <p>
              <span className="font-semibold">Street:</span> {data?.street}
            </p>
            <p className="mt-3 text-sm">
              <span className="font-semibold">Number:</span> {data?.number}
            </p>
            <p className="mt-3 text-sm">
              <span className="font-semibold">CEP:</span> {data?.cep} |{" "}
              {data?.city},{data?.state}
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
              <QrCode url={data?.payment_pix[0].qr_code!} />
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
                <button
                  className="text-xl text-custom-pink"
                  onClick={() => handlecopy()}
                >
                  <MdContentCopy />
                </button>
              </div>
              <div className="flex h-full w-full">
                <p className="max-w-full text-sm text-custom-textColor/70">
                  {data?.payment_pix[0]?.qr_code}
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
