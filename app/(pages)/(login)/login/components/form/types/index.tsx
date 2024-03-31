import * as yup from "yup";
export type Inputs = {
    credential: string;
    password: string;
  };
  export type FormLoginProps = {
    loading: boolean;
    handleLoading: Function;
  }

const schema = yup.object().shape({
  credential: yup
    .string()
    .required("This field is required!")
    .min(8, "Minimum characters are 8."),
  password: yup
    .string()
    .min(8, "Minimum characters are 8.")
    .required("This field is required!"),
});
export {schema}