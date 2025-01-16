import { useState, useContext, createContext } from "react";

const InfoContext = createContext();
const NavProvider = ({ children }) => {
  const [key, setKey] = useState({
    dark: false,
    bar:true,
    list:true
  });

  return (
    <InfoContext.Provider value={[key, setKey]}>
      {children}
    </InfoContext.Provider>
  );
};

// custom hook
const useInfo = () => useContext(InfoContext);

export { useInfo, NavProvider };