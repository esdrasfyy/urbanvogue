import * as yup from "yup";

export interface Inputs {
  card_nickname: string;
  name_holder: string;
  cpf_holder: string;
  card_number: string;
  cvv: string;
  exp_year: string;
  exp_month: string;
}

const schema = yup.object().shape({
  card_nickname: yup
    .string()
    .required("This field is required")
    .min(3, "Minimum length of 3 characters."),
    name_holder: yup
    .string()
    .required("This field is required")
    .min(10, "Minimum length of 10 characters."),
    cpf_holder: yup
    .string()
    .required("This field is required")
    .min(11, "Minimum length of 11 characters.")
    .max(14, "Maximum length of 14 characters."),
    card_number: yup
    .string()
    .required("This field is required")
    .min(16, "Minimum length of 16 characters.")
    .max(19, "Maximum length of 19 characters."),
    cvv: yup
    .string()
    .required("This field is required")
    .min(3, "Minimum length of 3 characters.")
    .max(4, "Maximun length of 4 characters."),
    exp_year: yup
    .string()
    .required("This field is required")
    .min(2, "Use the MM/YY pattern.")
    .max(2, "Use the MM/YY pattern."),
    exp_month: yup
    .string()
    .required("This field is required")
    .min(2, "Use the MM/YY pattern.")
    .max(2, "Use the MM/YY pattern."),
});
export { schema };
