import * as yup from "yup"
export const schema = yup.object().shape({
    email: yup
      .string()
      .email("must be a valid email!")
      .required("This field is required!"),
  });
  export type Inputs = {
    email: string;
  };
  
  export interface SendEmailProps {
    handleCount: (value: number) => void;
  }