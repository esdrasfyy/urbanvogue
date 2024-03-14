"use client";
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";

import { ContextPayProps, Product } from "@/contexts/ContextPay/types/index";
import { AddressReadApi } from "@/services/user/address/read";
import { AddressI } from "@/interfaces/address";
import { ContextCart } from "../ContextCart";
import { ProductI } from "@/interfaces/product/card";
import { ProductsByIdsApi } from "@/services/products-by-ids";
import { ContextUser } from "../ContextUser";

const ContextPay = createContext<ContextPayProps | undefined>(undefined);

const PayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dataAddress, setDataAddress] = useState<AddressI[]>([]);
  const [address, setAddress] = useState<number>(1);
  const [cardId, setCardId] = useState<string>("");
  const [method, setMethod] = useState<string>("pix");
  const [total, setTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number | null>(null);
  const [dataProducts, setDataProducts] = useState<ProductI[] | null>(null);

  const context = useContext(ContextCart);
  const contextUser = useContext(ContextUser);

  useEffect(() => {
    if (!context || !contextUser) {
      return;
    }

    const { cartSummary } = context;
    const { setUser, user } = contextUser;

    const fetchData2 = async () => {
      if (user?.user?.user_id) {
        const res = await AddressReadApi(user?.user?.user_id);
        if (res.data?.address && res.data?.address?.length > 0) {
          setAddress(res.data.address[0]?.address_id);
          setDataAddress(res.data.address);
        }
      }
    };

    const fetchData = async (): Promise<void> => {
      const ids =
        cartSummary?.products.map((product: Product) => product.id).join("&") ??
        "";

      try {
        const res = await ProductsByIdsApi({ ids });
        if (res?.status === 200 && res.data?.products) {
          setDataProducts(res?.data?.products);
        } else {
          console.error("Resposta da requisição não contém dados esperados.");
        }
      } catch (error: any) {
        console.error("Erro na requisição do produto:", error);
      }
    };

    fetchData2();
    fetchData();
  }, [context, contextUser]);

  const handleDataAddress = (data: AddressI) => {
    const old = dataAddress;
    old.push(data);
    setDataAddress(old);
  };
  const handleDeleteAddress = (id: number) => {
    const newData = dataAddress.filter((address) => address.address_id !== id);
    setDataAddress(newData);
    if (id === address) {
      setAddress(newData[0]?.address_id);
    }
  };
  const handleAddressDefalt = (id: number) => {
    setAddress(id);
  };

  const contextValue: ContextPayProps = {
    address,
    setAddress,
    dataAddress,
    setDataAddress,
    dataProducts,
    setDataProducts,
    handleAddressDefalt,
    handleDeleteAddress,
    handleDataAddress,
    cardId,
    setCardId,
    method,
    setMethod,
    total,
    setTotal,
    discount,
    setDiscount,
  };

  return (
    <ContextPay.Provider value={contextValue}>{children}</ContextPay.Provider>
  );
};

export { ContextPay, PayProvider };
