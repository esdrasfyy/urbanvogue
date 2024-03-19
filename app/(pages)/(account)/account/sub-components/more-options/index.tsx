import { IoIosArrowForward } from 'react-icons/io'
import Link from 'next/link'
import React from 'react'

function MoreOptions() {
  return (
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
  )
}

export {MoreOptions}