import * as yup from "yup"

export type Inputs = {
    fullname: string;
    username: string;
    email: string;
    password: string;
  };
export type FormRegisterProps = {
    loading: boolean;
    handleLoading: Function;
  }
  const schema = yup.object().shape({
    fullname: yup
      .string()
      .required("This field is required!")
      .min(8, "Minimum characters are 8."),
    username: yup
      .string()
      .required("This field is required!")
      .min(5, "Minimum characters are 5."),
    email: yup
      .string()
      .email("must be a valid email!")
      .required("This field is required!"),
    password: yup
      .string()
      .min(8, "Minimum characters are 8.")
      .required("This field is required!"),
  });
  export {schema}