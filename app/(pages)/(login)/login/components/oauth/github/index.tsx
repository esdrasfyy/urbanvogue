import { getGithubUrl } from "@/utils/get-github-url";
import { TbBrandGithubFilled } from "react-icons/tb";
import Link from "next/link";
import React from "react";

function OAuthGithub() {
  return (
    <Link
      className="text-xl text-custom-textColor border border-custom-textColor p-3 rounded-full hover:text-custom-grayTwo hover:bg-custom-textColor duration-300 ease-linear"
      href={getGithubUrl()}
    >
      <TbBrandGithubFilled />
    </Link>
  );
}

export {OAuthGithub};
