import { ProductCartI } from "@/contexts/ContextCart/types";

  export interface CartItemProps {
    key: number;
    dataId: ProductCartI | null;
    index: number;
    isLastItem: boolean;
  }