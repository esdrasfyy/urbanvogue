import * as yup from "yup";
export interface InputPassword {
  password: string;
  repeat: string;
}

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Este campo é obrigatório!")
    .min(8, "O mínimo de caracteres são 8."),
  repeat: yup
    .string()
    .required("Este campo é obrigatório!")
    .min(8, "O mínimo de caracteres são 8."),
});
export { schema };
