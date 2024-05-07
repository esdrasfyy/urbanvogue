import * as yup from "yup";
export interface InputPhone {
  phone: string;
}
const phoneSchema = yup
  .string()
  .matches(
    /^\(?\d{2}\)?\d{4,5}-?\d{4}$/,
    "incorrect format, follow the example: 11987654321"
  );

const schema = yup.object().shape({
  phone: phoneSchema.required("Este campo é obrigatório!"),
});
export { schema };
