import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [datasFromSearch,setDatasFromSearch] = useState([]);

  return (
    <UserContext.Provider
      value={{
        search,
        setSearch,
        datasFromSearch,
        setDatasFromSearch
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
