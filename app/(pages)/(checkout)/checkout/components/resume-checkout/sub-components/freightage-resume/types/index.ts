import * as yup from "yup"
export type Inputs = {
    cep: string;
  };
  
 export const schema = yup.object().shape({
    cep: yup.string().required("This field is required!"),
  });