import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

function ButtonPaginationUi({ page }: { page: string }) {
    const  searchParams = useSearchParams();
    const router = useRouter()
    const handlePage = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page);
        router.push("search?" + params.toString())
        
    };
  return (
    <li>
      <input
        type="button"
        onClick={handlePage}
        className="cursor-pointer shadow-snipped duration-300 ease-linear rounded-md flex items-center justify-center px-4 h-10 leading-tight text-custom-textColor bg-custom-grayTwo border border-custom-pink  hover:bg-custom-pink hover:text-custom-textColor dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        defaultValue={page}
      />
    </li>
  );
}

function PaginationUi() {
  return (
    <>
      <nav aria-label="Page navigation example" className="my-8">
        <ul className="flex items-center -space-x-px h-10 text-base gap-2 duration-300 ease-linear">
          <li>
            <a
              href="#"
              className="shadow-snipped duration-300 ease-linear flex items-center justify-center px-4 h-10 ms-0 leading-tight text-custom-textColor bg-custom-grayOne border border-gray-300 rounded-s-md hover:bg-custom-textColor hover:text-custom-grayOne"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </a>
          </li>
          <ButtonPaginationUi page={"1"} />
          <ButtonPaginationUi page={"2"} />
          <ButtonPaginationUi page={"3"} />
          <ButtonPaginationUi page={"4"} />
          <ButtonPaginationUi page={"5"} />

          <li>
            <a
              href="#"
              className="shadow-snipped duration-300 ease-linear flex items-center justify-center px-4 h-10 ms-0 leading-tight text-custom-textColor bg-custom-grayOne border border-gray-300 rounded-e-md hover:bg-custom-textColor hover:text-custom-grayOne"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export { PaginationUi };
