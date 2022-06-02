import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { width } from "@mui/system";

import { api } from "../../services/service";

function Classificacao() {


  const testes = [
    {nome: "Eduardo", pontos: 5},
    {nome: "Mimi", pontos: 1},
    {nome: "Fofa", pontos: 51},
  ]

  const [usuarios, setUsuarios] = useState([]);

  useEffect(()=> {
    const loginDto = JSON.parse(localStorage.getItem('loginDto'));
    api.defaults.headers.Authorization = `Bearer ${loginDto.token}`;
  }, []);
  
  return (
    <Container >
        
    </Container>
  );
}

export default Classificacao;