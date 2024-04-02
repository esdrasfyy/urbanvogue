import axios from "axios";
async function PaymentPixApi({
  user_id,
  products_ids,
  coupon,
}: {
  user_id: number;
  products_ids: number[];
  coupon: string | null;
}) {
  const api = process.env.API;
  try {
    if (!user_id) {
      throw new Error("user_id parameter is empty or undefined.");
    }
    const response = await axios.post(`${api}payment/pix`, {
      user_id,
      products_ids,
      coupon,
    });

    console.log(response);
  } catch (error: any) {
    console.log(error);
  }
}
export { PaymentPixApi };
