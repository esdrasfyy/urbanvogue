import React from "react";
import { StepperCompleted } from "./completed";

function Stepper({ steps, stepCount }: { steps: string[]; stepCount: number }) {
  return (
    <ol className="flex items-center justify-between w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base mb-4">
      {steps.map((step, index, array) => {
        const isLastItem = index === array.length - 1;
        return (
          <StepperCompleted
            key={index}
            name={step}
            isLastStep={isLastItem}
            index={index + 1}
            stepCount={stepCount}
          />
        );
      })}
    </ol>
  );
}

export { Stepper };
