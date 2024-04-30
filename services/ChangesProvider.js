import React, { useContext, useState } from "react";

const ChangesContext = React.createContext();
export const useChanges = () => useContext(ChangesContext);

const ChangesProvider = ({ children }) => {
  const [lists, setLists] = useState([]);

  return (
    <ChangesContext.Provider value={{ lists, setLists }}>
      {children}
    </ChangesContext.Provider>
  );
};

export default ChangesProvider;
