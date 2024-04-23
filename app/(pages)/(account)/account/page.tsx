"use client";
import { ContextUser } from "@/contexts/ContextUser";
import { MoreOptions } from "./sub-components/more-options";
import { Navigation } from "./sub-components/navigation";
import Image from "next/image";
import React, { useContext } from "react";
import { NextPage } from "next";

const Account:NextPage = () => {
  const context = useContext(ContextUser);
  if (!context) {
    return;
  }
  const { user } = context;
  return (
    <section
      className={` min-w-full flex flex-col gap-8 items-center pt-[115px] px-4`}
    >
      <main className="max-w-[1050px] w-full bg-custom-grayTwo flex shadow-snipped relative rounded-md  mx-4">
        {" "}
        <span
          className="absolute left-0 w-full h-24
         bg-custom-grayThree rounded-md shadow-snipped"
        ></span>
        <div className="w-full flex z-10 pb-12 px-4 max-md:flex-col">
          <div className="w-full flex justify-center text-center gap-4">
            {" "}
            <div className="flex flex-col items-center mt-8 gap-4">
              <figure className="max-w-[120px] flex">
                <Image
                  src={
                    user?.profile_img ||
                    "https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg"
                  }
                  alt="user profile"
                  className="w-full object-cover rounded-full border-[6px] shadow-snipped border-solid border-custom-grayOne min-w-[115px] min-h-[115px] max-w-[115px] max-h-[115px]"
                  width={115}
                  height={115}
                />
              </figure>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl text-custom-textColor max-sm:text-xl font-semibold">
                  {user?.username}
                </h3>
                <p className="text-sm text-custom-textColor/50 max-sm:text-sm">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
          <Navigation />
        </div>
      </main>
      <MoreOptions />
    </section>
  );
}

export default Account;
