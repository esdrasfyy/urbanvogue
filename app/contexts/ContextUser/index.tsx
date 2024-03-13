import React, { createContext, useEffect, useState, ReactNode } from "react";

import { ContextUserProps } from "@/contexts/ContextUser/types/index";
import { LoginApi } from "@/services/login";
import { UserI } from "@/interfaces/user";

const ContextUser = createContext<ContextUserProps | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserI | null>(null);
  const [haveUser, setHaveUser] = useState<boolean>(false)

  const contextValue: ContextUserProps = {
    user,
    setUser,
  };
  useEffect(() => {
    const fetchUser = async () => {
      const res = await LoginApi({credential:null, password: null});
      if (res.status === 200 && res.data) {
        setUser(res.data?.user);
      }
    };
    fetchUser();
  }, []);
  return (
    <ContextUser.Provider value={contextValue}>{children}</ContextUser.Provider>
  );
};

export { ContextUser, UserProvider };
