import { getGoogleOAuthURL } from "@/utils/get-google-url";
import Link from "next/link";
import React from "react";
import { FaGoogle } from "react-icons/fa";

function OAuthGoogle() {
  return (
    <Link
      className="text-xl text-custom-textColor border border-custom-textColor p-3 rounded-full hover:text-custom-grayTwo hover:bg-custom-textColor duration-300 ease-linear"
      href={getGoogleOAuthURL()}
    >
      <FaGoogle />
    </Link>
  );
}

export default OAuthGoogle;
