import * as yup from "yup";
export type Inputs = {
  code: string;
};

export const schema = yup.object().shape({
  code: yup
    .string()
    .required("This field is required!")
    .min(4, "Enter a valid format!"),
});

interface CouponResponse {
  status: number;
  msg: string;
  code: string;
  category?: string | null;
  brand?: string | null;
  description?: string;
  percentage?: number;
}

export interface ApiResponse {
  data: CouponResponse | null;
  error: string | null;
  status: number;
}
