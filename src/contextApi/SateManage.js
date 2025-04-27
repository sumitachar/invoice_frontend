import { createContext, useState, useContext } from "react";

// Create a Context
const SateManage = createContext();

export const AppProvider = ({ children }) => {
  // Modal state
  const [shop_id, setShop_id] = useState(false)
    const [auth, setAuth] = useState(false);
    const [authLoading, setAuthLoading] = useState(true); 
  return (
    <SateManage.Provider
      value={{
        shop_id,
        setShop_id,
        auth,
        setAuth,
        authLoading,
        setAuthLoading
      }}
    >
      {children}
    </SateManage.Provider>
  );
};

// Custom Hook for using the context
export const useStateManage = () => useContext(SateManage);
