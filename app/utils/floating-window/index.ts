import { useEffect } from "react";

const FloatingWindow = (url: string) => {
  const width = 600;
  const height = 600;
  const left = (window.outerWidth - width) / 2;
  const top = (window.outerHeight - height) / 2;

  useEffect(() => {
    const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`;
    window.open(url, "googleLogin", features);
  }, [url, width, height, left, top]);
};

export { FloatingWindow };
