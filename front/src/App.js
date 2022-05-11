import React from "react";
import styled from '@emotion/styled';
import {
  createTheme, 
  ThemeProvider
} from '@mui/material';
import AppRoutes from './AppRoutes';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#f44336',
    }
  },
  root: {
    maxWidth: '100%'
  }
});

const Container = styled.div`
  height: 100vh;
  background: white;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppRoutes />
      </Container>
    </ThemeProvider>
  );
}

export default App;
