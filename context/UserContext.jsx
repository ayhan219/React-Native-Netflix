import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [datasFromSearch,setDatasFromSearch] = useState([]);
  const [singleData,setSingleData] = useState([]);
  const [whereIsUser,setWhereIsUser] = useState("");

  return (
    <UserContext.Provider
      value={{
        search,
        setSearch,
        datasFromSearch,
        setDatasFromSearch,
        singleData,
        setSingleData,
        whereIsUser,
        setWhereIsUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
