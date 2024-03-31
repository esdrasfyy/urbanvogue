"use client";
import bg from "@/assets/urban-vogue/bg-gray-login.jpg";
import {LoadingSpinner} from "@/components/ui/loading";
import { HiMiniArrowUturnLeft } from "react-icons/hi2";
import logo from "@/assets/urban-vogue/logo-big.png";
import {FormRegister} from "./components/form";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";


function Register() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoading = (load: boolean) => {
    setLoading(load);
  };



  return (
    <section className="w-full h-screen bg-custom-grayOne flex justify-center items-center pt-12">
      <div className=" max-w-[1050px] w-full mx-4 bg-custom-grayTwo flex  shadow-snipped rounded-md">
        <aside className="w-[30%] min-h-full relative hidden justify-center items-center sm:flex">
          <Image
            src={bg}
            alt="bg-gray"
            className="absolute w-full h-full z-0 rounded-l-md shadow-snipped"
          />{" "}
          <figure className="z-10 flex flex-col justify-center items-center text-xl">
            <Image src={logo} alt="logo image" width={100} />
            <p className="max-w-[50%] font-logo text-3xl mt-4 text-custom-textColor">
              URBAN VOGUE
            </p>
          </figure>
        </aside>
        <div className="  w-[100%] sm:w-[70%] relative">
          {loading ? (
            <div className="absolute w-full h-full bg-custom-grayOne/90 z-40 flex justify-center text-custom-pink items-center">
              <LoadingSpinner />
            </div>
          ) : (
            ""
          )}
          <nav className="flex w-full justify-between px-6 text-custom-textColor pb-4 pt-8">
            <Link href="/login">
              <HiMiniArrowUturnLeft className="text-2xl hover-snipped max-sm:text-xl" />
            </Link>
          </nav>
          <h2 className="w-full text-center text-custom-pink text-3xl max-sm:text-2xl mb-2">
            Register
          </h2>
          <FormRegister handleLoading={handleLoading} loading={loading} />
        </div>
      </div>
    </section>
  );
}

export default Register;
