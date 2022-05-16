import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const recoverdUser = localStorage.getItem("user");
    if (recoverdUser) {
      setUser(JSON.parse(recoverdUser));
    }
  }, []);
  
  return (
    <AuthContext.Provider value={{user, setUser, logged: !!user}}>
      {children}
    </AuthContext.Provider>
  ) 
}