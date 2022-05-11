import React from "react";
import { Container, Paper, Box, Typography, Avatar } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import MataMataOitavas from "../MataMataOitavas";
import MataMataResultado from "../MataMataResultado";

function MataMataClassificacao() {

  const theme = useTheme();

  return (
    <Container
      disableGutters
      sx={{
        backgroundColor: '#FFF',
        padding: theme.spacing(1),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%'
        }}
        overflow='auto'
      > 
        <MataMataOitavas />


        <Box>

          

        </Box>
      </Box>
    </Container>
  );
}

export default MataMataClassificacao;