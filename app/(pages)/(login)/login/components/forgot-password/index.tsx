import Link from "next/link";
import React from "react";

function ForgotPassword({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex justify-end">
      <Link
        href={"/forgot-password"}
        className="text-custom-textColor mt-5 font-light text-sm duration-300 ease-linear hover:text-custom-pink"
      >
        Forgot your password?
      </Link>
    </div>
  );
}

export { ForgotPassword };
