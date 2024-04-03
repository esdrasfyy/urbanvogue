import { ProductCartI } from "@/contexts/ContextCart/types";
import axios from "axios";
async function PaymentPixApi({
  payment_method,
  address_id,
  user_id,
  coupon,
  products,
}: {
  user_id: number;
  address_id: number;
  payment_method: string;
  coupon: string | null;
  products: ProductCartI[];
}) {
  const api = process.env.API;
  try {
    if (!user_id) {
      throw new Error("user_id parameter is empty or undefined.");
    }
    const response = await axios.post(`${api}payment/pix`, {
      user_id,
      coupon,
      products,
      payment_method,
      address_id,
    });

    console.log(response.data);
  } catch (error: any) {
    console.log(error);
  }
}
export { PaymentPixApi };
