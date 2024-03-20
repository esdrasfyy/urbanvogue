import * as yup from "yup";
export interface InputsEdit {
    fullname: string;
    username: string;
    email: string;
    phone: string;
    gender: string;
    cpf: string;
    file?: FileList;
    birthdate: Date;
  }
  const phoneSchema = yup
    .string()
    .matches(
      /^(\+\d{1,2}\s?)?(\(\d{1,4}\)|\d{1,4})([\s.-]?\d{1,}){1,14}$/,
      "Por favor, insira um número de telefone válido"
    );
  const cpfSchema = yup
    .string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido");
  
  const schema = yup.object().shape({
    fullname: yup
      .string()
      .required("Este campo é obrigatório!")
      .min(8, "O mínimo de caracteres são 8."),
    username: yup
      .string()
      .required("Este campo é obrigatório!")
      .min(5, "O mínimo de caracteres são 5."),
    gender: yup
      .string()
      .required("Este campo é obrigatório!")
      .min(5, "O mínimo de caracteres são 5."),
    email: yup
      .string()
      .email("Deve ser um email válido!")
      .required("Este campo é obrigatório!"),
    phone: phoneSchema.required("O número de telefone é obrigatório"),
    cpf: cpfSchema.required("This field is required!"),
    birthdate: yup
      .date()
      .required("A data de nascimento é obrigatória.")
      .test("is-adult", "Você deve ter pelo menos 18 anos.", function (value) {
        const cutoffDate = new Date();
        cutoffDate.setFullYear(cutoffDate.getFullYear() - 18);
        return value && value <= cutoffDate;
      }),
  });
  export {schema}