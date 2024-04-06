"use client";
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";

import { ContextPayProps } from "./types/index";
import { AddressReadApi } from "../../services/user/address/read";
import { AddressI } from "../../interfaces/address";
import { ContextCart } from "../ContextCart/index";
import { ContextUser } from "../ContextUser";

const ContextPay = createContext<ContextPayProps | undefined>(undefined);

const PayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dataAddress, setDataAddress] = useState<AddressI[]>([]);
  const [address, setAddress] = useState<number | null>(null);
  const [cardId, setCardId] = useState<string>("");
  const [method, setMethod] = useState<string>("pix");
  const [coupon, setCoupon] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number | null>(null);

  const context = useContext(ContextCart);
  const contextUser = useContext(ContextUser);

  useEffect(() => {
    if (!context || !contextUser) {
      return;
    }

    const { user } = contextUser;

    const fetchData2 = async () => {
      if (user?.user_id) {
        const res = await AddressReadApi(user?.user_id);
        if (res.data?.address && res.data?.address?.length > 0) {
          setAddress(res.data.address[0]?.address_id);
          setDataAddress(res.data.address);
        }
      }
    };
    fetchData2();
  }, [contextUser?.user?.user_id]);

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
    handleAddressDefalt,
    handleDeleteAddress,
    handleDataAddress,
    cardId,
    setCardId,
    method,
    setMethod,
    coupon,
    setCoupon,
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
