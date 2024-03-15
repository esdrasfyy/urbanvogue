import React from "react";
interface LoadingProps {
  isLastItem: boolean;
}
function Loading({ isLastItem }: LoadingProps) {
  return (
    <>
      <div
        role="status"
        className={`${
          !isLastItem &&
          "border-solid border-b-[1px] pb-6 border-custom-grayThree"
        }flex animate-pulse h-[80px] mt-10`}
      >
        <div className="flex rounded-md items-center justify-center h-[100px] min-w-[65px] w-full mb-4 bg-custom-grayThree dark:bg-custom-grayThree"></div>
      </div>
    </>
  );
}

export { Loading };
