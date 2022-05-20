import React, { useContext, useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Palpites from "./pages/Palpites";
import Login from "./pages/Login";
import Classificacao from "./pages/Classificacao";
import CadastrarSenha from "./pages/CadastrarSenha"

import { AuthContext, AuthProvider } from './contexts/auth'

const AppRoutes  = () => {

  
  const Private = ({children}) => {
    //const { loginDto } =  useContext(AuthContext);
    const stringLoginDto = localStorage.getItem("loginDto");
    if (!stringLoginDto) {
      return <Navigate to="/login" />
    }

    const loginDto = JSON.parse(stringLoginDto);
    if (!loginDto.usuario.senhaCadastrada && window.location.pathname !== '/cadastrar-senha') {
      return <Navigate to="/cadastrar-senha" />
    } 
   
    return children;
  }

  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/palpites" element={<Private><Palpites /></Private>} />
            <Route exact path="/classificacao" element={<Private><Classificacao /></Private>} />
            <Route exact path="/cadastrar-senha" element={<Private><CadastrarSenha /></Private>} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default AppRoutes;
