import ReCAPTCHA from "react-google-recaptcha";
import React from "react";

function Recaptcha() {
  const onChange = (value:any) => {
    
  };
  const clientKey = process.env.RECAPTCHA_CLIENT as string;
  return <ReCAPTCHA sitekey={clientKey || "6LdIGaopAAAAAL6NJWCuq6FsolfOpXUhvKDFCxD-"} theme="dark" size="invisible" onChange={onChange}/>;
}

export { Recaptcha };
