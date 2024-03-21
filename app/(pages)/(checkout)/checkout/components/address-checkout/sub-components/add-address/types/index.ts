import * as yup from "yup";

export interface Inputs {
    type?: string;
    cep: string;
    street: string;
    number: number;
    state?: string;
    city: string;
    references?: string;
  }
  const formatCEP = (valor: string) => {
    valor = valor.replace(/\D/g, "");
    if (valor.length > 5) {
      valor = valor.replace(/^(\d{5})(\d{1,3})/, "$1-$2");
    }
    return valor;
  };
  
  const schema = yup.object().shape({
    cep: yup
      .string()
      .transform((value, originalValue) => {
        if (originalValue != null) {
          return formatCEP(originalValue);
        }
        return value;
      })
      .required("CEP is required")
      .matches(/^\d{5}-\d{3}$/, "Invalid CEP"),
    street: yup
      .string()
      .required("Street is required")
      .min(8, "Minimum length of 8 characters."),
    number: yup.number().required("Number is required").typeError("Invalid"),
    city: yup
      .string()
      .required("City is required")
      .min(5, "Minimum length of 5 characters"),
    references: yup.string(),
  });
  export { schema,}