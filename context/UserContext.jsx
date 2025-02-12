import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  return (
    <UserContext.Provider
      value={{
        search,
        setSearch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
