"use client";
import React, { createContext, useEffect, useState, ReactNode } from "react";

import { ContextUserProps } from "./types/index";
import { UserI } from "../../interfaces/user";
import axios from "axios";

const ContextUser = createContext<ContextUserProps | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserI | null>(null);
  const [haveUser, setHaveUser] = useState<boolean>(false);
  const [emailForRecovery, setEmailForRecovery] = useState<string | null>(null)
  const api = process.env.API;
  const fetchUser = async () => {
    try {
      const res = await axios.post(
        `${api}login/credentials`,
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
    } catch (error) {
      setHaveUser(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [api]);

  const contextValue: ContextUserProps = {
    user,
    setUser,
    emailForRecovery,
    setEmailForRecovery,
    fetchUser,
  };

  return (
    <ContextUser.Provider value={contextValue}>{children}</ContextUser.Provider>
  );
};

export { ContextUser, UserProvider };
