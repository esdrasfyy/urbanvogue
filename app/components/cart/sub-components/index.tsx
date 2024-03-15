import React from "react";
interface LoadingProps{
    isLastItem:boolean
}
function Loading({isLastItem}:LoadingProps) {
  return (
    <>
      <div role="status" className={`${isLastItem && "border-solid border-b-[1px] pb-6 border-custom-grayThree" }flex animate-pulse`}>
        <div className="flex rounded-md items-center justify-center h-[100px] min-w-[65px] max-w-[65px] mb-4 bg-custom-grayThree dark:bg-custom-grayThree">
          <svg
            className="rounded-md w-5 h-5 text-custom-grayOne dark:text-custom-grayOne"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 20"
          >
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
          </svg>
        </div>
        <div className="flex flex-col w-full">
          <div className="h-3.5 bg-custom-grayThree rounded-full dark:bg-gray-700 w-[155px] mt-1 ml-2"></div>
          <div className="h-3.5 bg-custom-grayThree rounded-full dark:bg-gray-700 w-[40%] mt-4 ml-2"></div>
          <div className="flex gap-3 w-full">
            <div className="h-9 bg-custom-grayThree rounded-full dark:bg-gray-700 w-full mt-4 ml-2"></div>
            <div className="h-9 bg-custom-grayThree rounded-full dark:bg-gray-700 w-full mt-4 ml-2"></div>
          </div>
        </div>
        <div className="flex flex-col min-h-full justify-between items-end">
          <div className="h-6 bg-custom-grayThree rounded-full dark:bg-gray-700 w-[125px] mt-1 ml-2"></div>
          <div className="bg-custom-grayThree rounded-full dark:bg-gray-700 w-[25px] h-[25px] mb-5 ml-2"></div>
        </div>
      </div>
    </>
  );
}

export { Loading };
