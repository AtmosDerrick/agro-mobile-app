import { React, createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [signin, setSignin] = useState(false);

  useEffect(() => {
    console.log(signin);
  });

  return (
    <UserContext.Provider
      value={{ user, setUser, userInfo, setUserInfo, signin, setSignin }}>
      {children}
    </UserContext.Provider>
  );
}
