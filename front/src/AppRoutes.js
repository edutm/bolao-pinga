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

import { AuthContext, AuthProvider } from './contexts/auth'

const AppRoutes  = () => {

  
  const Private = ({children}) => {
    //const { user } =  useContext(AuthContext);
    const user = localStorage.getItem("user");
    if (!user) {
      return <Navigate to="/login" />
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
            <Route exact path="/" element={<Home />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default AppRoutes;
