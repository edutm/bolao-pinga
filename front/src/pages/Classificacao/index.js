import React, { useState } from "react";
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { width } from "@mui/system";

import GrupoClassificacao from "../../components/GrupoClassificacao/indes";
import MataMataClassificacao from "../../components/MataMataClassificacao";


function Classificacao() {

  const [tabValue, setTabValue] = useState(0);
  
  return (
    <Container 
      sx={{
        height: "70vh",
      }}
    >
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
        }}>
          <Tabs 
            value={tabValue} 
            onChange={(e, v) => setTabValue(v)} 
            centered
            variant="fullWidth"
          >
              <Tab label="Fase de Grupos"/>
              <Tab label="Fase de Mata-Mata"/>
          </Tabs>
        </Box>
        { tabValue === 0 &&
          <>
          <GrupoClassificacao grupo={{nome: 'Grupo A'}}/>
          <GrupoClassificacao grupo={{nome: 'Grupo B'}}/>
          </>
        }
        { tabValue === 1 &&
         <MataMataClassificacao />
        }
    </Container>
  );
}

export default Classificacao;