"use client";
import React, { useEffect, useState } from "react";
import { SendEmail } from "./components/send-email";
import { HiMiniArrowUturnLeft } from "react-icons/hi2";
import Link from "next/link";
import { Stepper } from "@/components/stepper";
import { SendCode } from "./components/send-code";
import { ResetPassword } from "./components/reset-password";

function ForgotPassword() {
  const [stepCount, setStepCount] = useState<number>(1);

  const handleCount = (value: number) => {
    setStepCount(value);
  };

  let componentStep;

  switch (stepCount) {
    case 1:
      componentStep = <SendEmail handleCount={handleCount} />;
      break;
    case 2:
      componentStep = <SendCode handleCount={handleCount}/>;
      break;
    case 3:
      componentStep = <ResetPassword handleCount={handleCount}/>;
      break;
    default:
      componentStep = <SendEmail handleCount={handleCount} />;
      break;
  }
  useEffect(() => {
    console.log(stepCount);
  }, [stepCount]);

  const listSteps = ["Send Email", "Send Code", "Reset Passoword"];
  return (
    <main className="m-auto max-w-xl w-full mx-4 text-custom-textColor">
      <Stepper steps={listSteps} stepCount={stepCount} />
      <section className="shadow-snipped rounded-md p-4 bg-custom-grayTwo relative">
        <div className="w-fit">
          <Link href={"/login"}>
            <HiMiniArrowUturnLeft className="text-2xl hover-snipped max-sm:text-xl" />
          </Link>
        </div>
        <div>
          <h2 className="w-full text-center mb-8 text-custom-pink text-2xl max-sm:text-xl">
            Forgot you password?
          </h2>
        </div>
        {componentStep}
      </section>
    </main>
  );
}

export default ForgotPassword;
