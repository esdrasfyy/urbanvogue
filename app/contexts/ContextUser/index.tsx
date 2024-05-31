"use client";
import React, { createContext, useEffect, useState, ReactNode, useCallback } from "react";

import { ContextUserProps } from "./types/index";
import { UserI } from "../../interfaces/user";
import axios from "axios";

const ContextUser = createContext<ContextUserProps | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserI | null>(null);
  const [emailForRecovery, setEmailForRecovery] = useState<string | null>(null);
  const api = process.env.API;
  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(
        `${api}login/oauth`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200 && res?.data?.user) {
        setUser(res.data.user);
        return;
      }
    } catch (error:any) {
      console.log(error.message);
    }
  }, [api]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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
