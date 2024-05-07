import * as yup from "yup";

export interface InputsEdit {
    fullname: string;
    username: string;
    gender: string;
    cpf?: string;
    file?: FileList;
    birthdate: Date;
}

const cpfSchema = yup
    .string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Invalid CPF");

const schema = yup.object().shape({
    fullname: yup
        .string()
        .required("This field is required!")
        .min(8, "Minimum 8 characters required."),
    username: yup
        .string()
        .required("This field is required!")
        .min(5, "Minimum 5 characters required."),
    gender: yup
        .string()
        .required("This field is required!")
        .min(5, "Minimum 5 characters required."),
    cpf: cpfSchema,
    birthdate: yup
        .date()
        .required("Birthdate is required.")
        .test("is-adult", "You must be at least 18 years old.", function (value) {
            const cutoffDate = new Date();
            cutoffDate.setFullYear(cutoffDate.getFullYear() - 18);
            return value && value <= cutoffDate;
        }),
});

export { schema };
