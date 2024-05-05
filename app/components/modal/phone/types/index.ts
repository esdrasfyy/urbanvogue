import * as yup from "yup";
export interface InputPhone {
  phone: string;
}
const phoneSchema = yup
  .string()
  .matches(
    /^(\+\d{1,2}\s?)?(\(\d{1,4}\)|\d{1,4})([\s.-]?\d{1,}){1,14}$/,
    "Por favor, insira um número de telefone válido"
  );

const schema = yup.object().shape({
  phone: yup
    .string()
    .required("Este campo é obrigatório!")
    .min(8, "O mínimo de caracteres são 8."),
});
export { schema };
