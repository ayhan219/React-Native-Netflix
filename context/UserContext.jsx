import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [datasFromSearch,setDatasFromSearch] = useState([]);
  const [singleData,setSingleData] = useState([]);

  return (
    <UserContext.Provider
      value={{
        search,
        setSearch,
        datasFromSearch,
        setDatasFromSearch,
        singleData,
        setSingleData
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
