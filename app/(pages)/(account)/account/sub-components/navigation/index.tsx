import { IoIosHeartEmpty, IoMdNotificationsOutline } from 'react-icons/io'
import { IoGiftOutline, IoWalletOutline } from 'react-icons/io5'
import { LiaUserEditSolid } from 'react-icons/lia'
import { GoChecklist } from 'react-icons/go'
import Link from 'next/link'
import React from 'react'

function Navigation() {
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
                    className="flex items-center justify-center p-4"
                  >
                    <LiaUserEditSolid />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
  )
}

export {Navigation}