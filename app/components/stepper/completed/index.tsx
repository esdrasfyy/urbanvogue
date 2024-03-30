import React from "react";
import { IconType } from 'react-icons';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { TbCircleNumber1,  TbCircleNumber2, TbCircleNumber3, TbCircleNumber4} from "react-icons/tb";

interface ProgressImage {
    [key: number]: IconType | null;
  }
  
  const networkImageMap: ProgressImage = {
    1: TbCircleNumber1,
    2: TbCircleNumber2,
    3: TbCircleNumber3,
    4: TbCircleNumber4,
  };

  function StepperCompleted({
    name,
    isLastStep,
    index,
    stepCount,
  }: {
    name: string;
    isLastStep: boolean;
    index: number;
    stepCount: number;
  }) {
      const ProgressIcon = networkImageMap[index];
    return (
      <li className={`flex items-center ${index <= stepCount ? "text-custom-pink font-semibold" : "text-custom-textColor"}`}>
        <span className={`flex flex-row items-center text-xs text-center gap-2`}>
          <span className="text-2xl">
              {ProgressIcon && index > stepCount && <ProgressIcon/>}
              {index === stepCount && <PiClockCounterClockwiseBold/>}
              {index < stepCount && <IoMdCheckmarkCircleOutline/>}
          </span>
          {name}
        </span>
      </li>
    );
  }
export { StepperCompleted };
