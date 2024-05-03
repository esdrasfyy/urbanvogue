"use client";
import { Box, Slide, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";

function CookiesPrivacy() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  useEffect(() => {
    const AcceptCookies = localStorage.getItem("accept-cookies");
    if (!AcceptCookies) {
      return onOpen();
    }
    onClose();
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("accept-cookies", "true");
    onClose();
  };

  return (
    <aside>
      <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }} className="flex justify-center items-center w-full">
        <Box
         className="mb-3 rounded-md shadow-snipped bg-custom-grayTwo/95 z-40 w-[98vw] flex justify-between items-center py-4 px-[3vw] gap-5 max-md:flex-col"
        >
          <div className="w-3/5 max-md:w-full">
            <p className="text-custom-textColor text-xs">
              We use cookies and similar technologies to improve your shopping
              experience, including relevant content and personalized
              advertising. By continuing to browse, we understand that you are
              aware and agree. Access our Privacy Policy to find out more.
            </p>
          </div>
          <div className="w-2/5 flex justify-between gap-[10%] max-md:w-full max-sm:flex-col">
            <button
              onClick={handleAcceptCookies}
              className="text-custom-textColor font-semibold uppercase text-sm rounded-md w-full py-1.5 bg-custom-pink border-[2px] border-custom-pink duration-300 ease-linear hover:opacity-60"
            >
              Accept all cookies
            </button>
            <button className="text-custom-textColor font-semibold uppercase text-sm rounded-md w-full py-1.5 border-[2px] border-custom-pink max-sm:mt-4 duration-300 ease-linear hover:bg-custom-pink hover:opacity-60">
              Configure privacy
            </button>
          </div>
        </Box>
      </Slide>
    </aside>
  );
}

export { CookiesPrivacy };
