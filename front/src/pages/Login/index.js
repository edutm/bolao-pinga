import React from "react";
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate  } from 'react-router-dom';

function Login() {

  let navigate = useNavigate(); 

  return (
    <Container
        sx={{
            height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
      <Paper sx={{padding: 5, display: "flex", flexDirection: "column"}}>
        <TextField 
          id="celular" 
          label="Celular"
          sx={{paddingBottom: 5}}
        />
        <TextField 
          id="senha" 
          label="Senha" 
          type="password"
          autoComplete="current-password"
          sx={{paddingBottom: 5}}
        />
        <Button 
          variant="contained"
          onClick={() => { navigate("/") }}
        >ENTRAR</Button>

      </Paper>
    </Container>
  );
}

export default Login;