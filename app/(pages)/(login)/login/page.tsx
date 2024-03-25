"use client"
import React, { useState } from "react";
import { useDisclosure, Modal } from "@chakra-ui/react";
import { HiMiniArrowUturnLeft } from "react-icons/hi2";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";
import { ResetPassword } from "@/(pages)/(login)/login/components/reset-password/reset-password/index";
import { FormLogin } from "@/(pages)/(login)/login/components/form/index";
import { LoadingSpinner } from "@/components/ui/loading/index";
import bg from "@/assets/urban-vogue/bg-gray-login.jpg";
import logo from "@/assets/urban-vogue/logo-big.png";
import {getGoogleOAuthURL} from "@/utils/get-google-url"

function Login() {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const handleLoading = (load:boolean) => {
    setLoading(load);
  };

  return (
    <section className="w-full h-screen bg-custom-grayOne flex justify-center items-center pt-12">
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ResetPassword />
      </Modal>
      <div className="max-w-[1050px] w-full mx-8 bg-custom-grayTwo flex shadow-snipped rounded-md">
        <div className="w-[100%] relative sm:w-[70%]">
          {loading && (
            <div className="absolute w-full h-full text-custom-pink bg-custom-grayOne/90 z-40 flex justify-center items-center">
              <LoadingSpinner />
            </div>
          )}
          <nav className="flex w-full justify-between px-6 text-custom-textColor py-4 pt-8">
            <Link href="/">
              <HiMiniArrowUturnLeft className="text-2xl hover-snipped max-sm:text-xl" />
            </Link>
            <Link href="/register" className="text-xl hover-snipped max-sm:text-base">
              Register
            </Link>
          </nav>
          <h2 className="w-full text-center mb-8 text-custom-pink text-3xl max-sm:text-2xl">
            Login
          </h2>
          <FormLogin handleLoading={handleLoading} loading={loading} onOpen={onOpen} />
          <div className="flex items-center gap-4 text-3xl justify-center">
            <Link className="text-xl text-custom-textColor border border-custom-textColor p-3 rounded-full hover:text-custom-grayTwo hover:bg-custom-textColor duration-300 ease-linear" href={getGoogleOAuthURL()}>
              <FaGoogle />
            </Link>

            <button className="text-xl text-custom-textColor border border-custom-textColor p-3 rounded-full hover:text-custom-grayTwo hover:bg-custom-textColor duration-300 ease-linear">
              <FaFacebookF />
            </button>
            <button className="text-xl text-custom-textColor border border-custom-textColor p-3 rounded-full hover:text-custom-grayTwo hover:bg-custom-textColor duration-300 ease-linear">
              <TbBrandGithubFilled />
            </button>
          </div>
          <div className="w-full flex flex-col justify-end items-center text-custom-textColor pb-5">
            <p className="mt-8 pb-3">
              <Link href="forgot-password">forgot password</Link> •
              <Link href="privacy"> privacy policy</Link>
            </p>
          </div>
        </div>
        <aside className="w-[30%] min-h-full relative hidden justify-center items-center sm:flex">
          <Image
            src={bg}
            priority
            alt="bg-gray"
            className="absolute w-full h-full z-0 rounded-r-md shadow-snipped"
          />
          <figure className="z-10 flex flex-col justify-center items-center text-xl">
            <Image src={logo} alt="logo image" width={100} />
            <p className="max-w-[50%] font-logo text-3xl mt-4 text-custom-textColor">
              URBAN VOGUE
            </p>
          </figure>
        </aside>
      </div>
    </section>
  );
}

export default Login;