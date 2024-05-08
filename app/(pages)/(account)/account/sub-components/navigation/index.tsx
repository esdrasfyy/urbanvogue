import { IoIosHeartEmpty, IoMdNotificationsOutline } from "react-icons/io";
import { IoGiftOutline, IoWalletOutline } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";
import { GoChecklist } from "react-icons/go";
import Link from "next/link";
import React, { useContext } from "react";
import { ContextUser } from "@/contexts/ContextUser";

function Navigation() {
  const contextUser = useContext(ContextUser);
  if (!contextUser) {
    return;
  }
  const { user } = contextUser;
  return (
    <div className="w-full flex gap-5 flex-col mt-8">
      <nav className=" h-20 w-full bg-custom-grayOne rounded-md shadow-snipped">
        <ul className="w-full flex justify-between items-center h-full px-3">
          <li className="text-custom-pink text-3xl hover:bg-custom-grayThree/10 hover:scale-105 hover:shadow-snipped rounded-md duration-300 ease-linear ">
            <Link
              href={"/account/orders"}
              className="flex items-center justify-center p-4"
            >
              <GoChecklist />
            </Link>
          </li>
          <span className="flex w-[1px] h-8 bg-custom-grayThree"></span>
          <li className="text-custom-pink text-3xl hover:bg-custom-grayThree/10 hover:scale-105 hover:shadow-snipped rounded-md duration-300 ease-linear">
            <Link
              href={"/teste"}
              className="flex items-center justify-center p-4"
            >
              {" "}
              <IoIosHeartEmpty />
            </Link>
          </li>
          <span className="flex w-[1px] h-8 bg-custom-grayThree"></span>
          <li className="text-custom-pink text-3xl hover:bg-custom-grayThree/10 hover:scale-105 hover:shadow-snipped rounded-md duration-300 ease-linear ">
            <Link
              href={"/teste"}
              className="flex items-center justify-center p-4"
            >
              <IoMdNotificationsOutline />
            </Link>
          </li>
        </ul>
      </nav>
      <nav className=" h-20 w-full bg-custom-grayOne rounded-md shadow-snipped">
        <ul className="w-full flex justify-between items-center h-full px-3">
          <li className="text-custom-pink text-3xl hover:bg-custom-grayThree/10 hover:scale-105 hover:shadow-snipped rounded-md duration-300 ease-linear ">
            <Link
              href={"/teste"}
              className="flex items-center justify-center p-4"
            >
              <IoWalletOutline />
            </Link>
          </li>
          <span className="flex w-[1px] h-8 bg-custom-grayThree"></span>
          <li className="text-custom-pink text-3xl hover:bg-custom-grayThree/10 hover:scale-105 hover:shadow-snipped rounded-md duration-300 ease-linear ">
            <Link
              href={"/teste"}
              className="flex items-center justify-center p-4"
            >
              <IoGiftOutline />
            </Link>
          </li>
          <span className="flex w-[1px] h-8 bg-custom-grayThree"></span>
          <li className="text-custom-pink text-3xl hover:bg-custom-grayThree/10 hover:scale-105 hover:shadow-snipped rounded-md duration-300 ease-linear ">
            <Link
              href={"/account/edit"}
              className="relative flex items-center justify-center p-4"
            >
              <LiaUserEditSolid />
              {!user?.email ||
              !user.verify_email ||
              !user.phone ||
              !user.verify_phone ||
              !user.password_hash ? (
                <span className="w-[16px] h-[16px] flex items-center justify-center absolute top-0 right-0  text-white bg-red-600 rounded-full text-[9px] font-bold">
                  !
                </span>
              ) : null}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export { Navigation };
