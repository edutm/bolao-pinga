import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginDto, setLoginDto] = useState(null);
  
  useEffect(() => {
    const loginDto = localStorage.getItem("loginDto");
    if (loginDto) {
      setLoginDto(JSON.parse(loginDto));
    }
  }, []);
  
  return (
    <AuthContext.Provider value={{loginDto, setLoginDto, logged: !!loginDto, senhaCadastrada: loginDto?.usuario?.senhaCadastrada}}>
      {children}
    </AuthContext.Provider>
  ) 
}