import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Palpites from "./pages/Palpites";
import Login from "./pages/Login";
import Classificacao from "./pages/Classificacao";

const AppRoutes  = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/palpites" element={<Palpites />} />
          <Route exact path="/classificacao" element={<Classificacao />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default AppRoutes;
