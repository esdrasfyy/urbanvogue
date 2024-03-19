import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  IoIosArrowForward,
  IoIosHeartEmpty,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { IoGiftOutline, IoWalletOutline } from "react-icons/io5";
import { GoChecklist } from "react-icons/go";
import { LiaUserEditSolid } from "react-icons/lia";

function Account() {
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
                  esdrasfyy
                </h3>
                <p className="text-sm text-custom-textColor/50 max-sm:text-sm">
                  fernaando.esdras@gmail.com
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-5 flex-col mt-8">
            <div className=" h-20 w-full bg-custom-grayOne rounded-md shadow-snipped">
              <ul className="w-full flex justify-between items-center h-full px-3">
                <li className="text-custom-textColor text-3xl hover:bg-custom-grayThree/10 hover:text-custom-pink hover:shadow-snipped rounded-md duration-300 ease-linear ">
                  <Link
                    href={"/teste"}
                    className="flex items-center justify-center p-4"
                  >
                    <GoChecklist />
                  </Link>
                </li>
                <span className="flex w-[1px] h-8 bg-custom-grayThree"></span>
                <li className="text-custom-textColor text-3xl hover:bg-custom-grayThree/10 hover:text-custom-pink hover:shadow-snipped rounded-md duration-300 ease-linear">
                  <Link
                    href={"/teste"}
                    className="flex items-center justify-center p-4"
                  >
                    {" "}
                    <IoIosHeartEmpty />
                  </Link>
                </li>
                <span className="flex w-[1px] h-8 bg-custom-grayThree"></span>
                <li className="text-custom-textColor text-3xl hover:bg-custom-grayThree/10 hover:text-custom-pink hover:shadow-snipped rounded-md duration-300 ease-linear ">
                  <Link
                    href={"/teste"}
                    className="flex items-center justify-center p-4"
                  >
                    <IoMdNotificationsOutline />
                  </Link>
                </li>
              </ul>
            </div>
            <nav className=" h-20 w-full bg-custom-grayOne rounded-md shadow-snipped">
              <ul className="w-full flex justify-between items-center h-full px-3">
                <li className="text-custom-textColor text-3xl hover:bg-custom-grayThree/10 hover:text-custom-pink hover:shadow-snipped rounded-md duration-300 ease-linear ">
                  <Link
                    href={"/teste"}
                    className="flex items-center justify-center p-4"
                  >
                    <IoWalletOutline />
                  </Link>
                </li>
                <span className="flex w-[1px] h-8 bg-custom-grayThree"></span>
                <li className="text-custom-textColor text-3xl hover:bg-custom-grayThree/10 hover:text-custom-pink hover:shadow-snipped rounded-md duration-300 ease-linear ">
                  <Link
                    href={"/teste"}
                    className="flex items-center justify-center p-4"
                  >
                    <IoGiftOutline />
                  </Link>
                </li>
                <span className="flex w-[1px] h-8 bg-custom-grayThree"></span>
                <li className="text-custom-textColor text-3xl hover:bg-custom-grayThree/10 hover:text-custom-pink hover:shadow-snipped rounded-md duration-300 ease-linear ">
                  <Link
                    href={"/account/edit"}
                    className="flex items-center justify-center p-4"
                  >
                    <LiaUserEditSolid />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </main>
      <section className="max-w-[1050px] w-full bg-custom-grayTwo flex shadow-snipped relative rounded-md  mx-4">
        <nav className="w-full">
          <ul className="w-full flex flex-col">
            <li className="w-full p-4">
              <Link
                href={"teste"}
                className=" text-custom-textColor font-semibold w-full flex justify-between items-center bg-custom-grayThree/20 hover:bg-custom-grayThree/45 rounded-md shadow-snipped duration-300 ease-linear py-4 px-4"
              >
                <p>MY PROFILE</p>{" "}
                <span>
                  <IoIosArrowForward />
                </span>
              </Link>
            </li>
            <li className="w-full p-4">
              <Link
                href={"teste"}
                className=" text-custom-textColor font-semibold w-full flex justify-between items-center bg-custom-grayThree/20 hover:bg-custom-grayThree/45 rounded-md shadow-snipped duration-300 ease-linear py-4 px-4"
              >
                <p>CHATS</p>{" "}
                <span>
                  <IoIosArrowForward />
                </span>
              </Link>
            </li>
            <li className="w-full p-4">
              <Link
                href={"teste"}
                className=" text-custom-textColor font-semibold w-full flex justify-between items-center bg-custom-grayThree/20 hover:bg-custom-grayThree/45 rounded-md shadow-snipped duration-300 ease-linear py-4 px-4"
              >
                <p>SUPPORT</p>{" "}
                <span>
                  <IoIosArrowForward />
                </span>
              </Link>
            </li>
            <li className="w-full p-4">
              <Link
                href={"teste"}
                className=" text-custom-textColor font-semibold w-full flex justify-between items-center bg-custom-grayThree/20 hover:bg-custom-grayThree/45 rounded-md shadow-snipped duration-300 ease-linear py-4 px-4"
              >
                <p>GET THE APP</p>{" "}
                <span>
                  <IoIosArrowForward />
                </span>
              </Link>
            </li>
            <li className="w-full p-4">
              <Link
                href={"teste"}
                className=" text-custom-textColor font-semibold w-full flex justify-between items-center bg-custom-grayThree/20 hover:bg-custom-grayThree/45 rounded-md shadow-snipped duration-300 ease-linear py-4 px-4"
              >
                <p>SUGGESTIONS</p>{" "}
                <span>
                  <IoIosArrowForward />
                </span>
              </Link>
            </li>
            <li className="w-full p-4">
              <Link
                href={"teste"}
                className=" text-custom-textColor font-semibold w-full flex justify-between items-center bg-custom-grayThree/20 hover:bg-custom-grayThree/45 rounded-md shadow-snipped duration-300 ease-linear py-4 px-4"
              >
                <p>SETTINGS</p>{" "}
                <span>
                  <IoIosArrowForward />
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </section>
  );
}

export default Account;
