import React from "react";
import * as FaIcons from "react-icons/fa";
import {ButtonIconUiProps} from "@/components/ui/buttons/button-icon/types/index"

const iconsMap = {
  FaStar: FaIcons.FaStar,
  FaArrowRight: FaIcons.FaArrowRight,
  FaHome: FaIcons.FaHome,
};

function ButtonIconUi({
  type,
  icon,
  content,
  classname,
  disabled,
  onClick
}: ButtonIconUiProps) {
  const Icon = iconsMap[icon];

  return (
    <button
      type={type}
      className={`group bg-none border-2 border-custom-pink flex text-custom-textColor py-1.5 ${classname}  rounded text-xl duration-300 hover:bg-custom-pink`}
      disabled={disabled}
      onClick={() => onClick}
    >
      <span className="flex justify-between items-center px-3 max-w-[100%] w-full">
        <span className="ml-[45%] max-sm:ml-[15%]">{content}</span>
        <Icon
          size={20}
          className="transition-all ease-in-out -translate-x-7 group-hover:translate-x-0 duration-1000"
        />
      </span>
    </button>
  );
}

export {ButtonIconUi};