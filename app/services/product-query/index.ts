import axios from "axios";

async function ProductQueryApi(query: string) {
  try {
    const url_default = `https://urban-back.onrender.com/product/filter?${query}`;
    const data = await axios.get<any[]>(url_default);
    if (!data) {
      console.log("n oego produto");
    }
    return {
      data: data.data,
      status: data.status,
    };
  } catch (error) {
    console.log(error);
  }
}
export {ProductQueryApi};