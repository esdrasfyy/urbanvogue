import React from "react";
import { QRCode } from "react-qrcode-logo";

const QrCode = ({ url }: { url: string }) => {
  return (
    <QRCode
      value={url}
      size={150}
      bgColor={"#1d2123"}
      fgColor={"#ffffff"}
      logoImage={"https://i.imgur.com/5oEtItm.png"}
      logoWidth={30}
      logoHeight={30}
      qrStyle={"dots"}
    />
  );
};

export { QrCode };
