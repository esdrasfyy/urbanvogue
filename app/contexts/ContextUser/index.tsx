"use client";
import React, { createContext, useEffect, useState, ReactNode } from "react";

import { ContextUserProps } from "./types/index";
import { LoginApi } from "../../services/login";
import { UserI } from "../../interfaces/user";
import axios from "axios";

const ContextUser = createContext<ContextUserProps | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserI | null>(null);
  const [haveUser, setHaveUser] = useState<boolean>(false);

  const contextValue: ContextUserProps = {
    user,
    setUser,
  };
  const api = process.env.API;
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.post(
        `${api}login`,
        {
          credential: null,
          password: null,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200 && res?.data?.user) {
        setUser(res.data.user);
        setHaveUser(true);
        return;
      }
      setHaveUser(false);
      console.log(res);
    };
    fetchUser();
  }, [api]);
  return (
    <ContextUser.Provider value={contextValue}>{children}</ContextUser.Provider>
  );
};

export { ContextUser, UserProvider };
