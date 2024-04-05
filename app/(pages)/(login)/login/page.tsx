"use client";
import { HiMiniArrowUturnLeft } from "react-icons/hi2";
import { FaFacebookF } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { FormLogin } from "@/(pages)/(login)/login/components/form/index";
import bg from "@/assets/urban-vogue/bg-gray-login.jpg";
import logo from "@/assets/urban-vogue/logo-big.png";
import { OAuthGoogle } from "./components/oauth/google";
import { OAuthGithub } from "./components/oauth/github";

function Login() {
  return (
    <section className="w-full bg-custom-grayOne flex justify-center items-center pt-32">
      <div className="max-w-[1050px] w-full mx-4 bg-custom-grayTwo flex shadow-snipped rounded-md">
        <div className="w-[100%] relative sm:w-[70%]">
          <nav className="flex w-full justify-between px-6 text-custom-textColor py-4 pt-8">
            <Link href="/">
              <HiMiniArrowUturnLeft className="text-2xl hover-snipped max-sm:text-xl" />
            </Link>
            <Link
              href="/register"
              className="text-xl hover-snipped max-sm:text-base"
            >
              Register
            </Link>
          </nav>
          <h2 className="w-full text-center mb-8 text-custom-pink text-3xl max-sm:text-2xl">
            Login
          </h2>
          <FormLogin />
          <div className="flex items-center gap-4 text-3xl justify-center mt-5">
            <OAuthGoogle />
            <button
              disabled
              className="text-xl text-custom-textColor/20 border border-custom-textColor/20 p-3 rounded-full duration-300 ease-linear"
            >
              <FaFacebookF />
            </button>
            <OAuthGithub />
          </div>
          <div className="w-full flex flex-col justify-end items-center text-custom-textColor pb-5">
            <p className="mt-8 pb-3">
              <Link href="/forgot-password">forgot password</Link> •
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
