import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [datasForSearch,setDatasFromSearch] = useState([]);

  return (
    <UserContext.Provider
      value={{
        search,
        setSearch,
        datasForSearch,
        setDatasFromSearch
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
