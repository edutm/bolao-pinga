import React, { useEffect, useState, useContext } from "react";
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

import { api } from '../../services/service';
import { AuthContext } from '../../contexts/auth'

function Login({ location }) {

  const navigate = useNavigate(); 
  const { setLoginDto } = useContext( AuthContext );
  
  const [celular, setCelular] = useState("");
  const [senha, setSenha] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (!localStorage.getItem('loginDto')) {
      setLoginDto(null);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!celular || !senha) {
      setOpenAlert(true);
      setMensagem('Celular e Senha devem ser preenchidos.');
      return;
    }
    setIsFetching(true);
    api.post('login', {celular, senha})
      .then(response => {
        const loginDto = response.data.data;
        console.log('usuario', loginDto)
        api.defaults.headers.Authorization = `Bearer ${loginDto.token}`;
        setLoginDto(loginDto);
        localStorage.setItem('loginDto', JSON.stringify(loginDto));
        navigate('/palpites');

      })
      .catch(err => {
        console.log(err.response)
        if (err.response.data.errors) {
          setMensagem(err.response.data.errors.join('\r\n'));
        } else {
          setMensagem("Usuario ou senha errados mané.");
        }
        setOpenAlert(true);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }

  return (
    <Container
        sx={{
            height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
      <form action="" onSubmit={handleSubmit}>
        <Paper sx={{padding: 5, display: "flex", flexDirection: "column"}}>
            <TextField 
              id="celular" 
              label="Celular"
              type="number"
              sx={{paddingBottom: 5}}
              value={celular}
              onChange={ (e) => setCelular(e.target.value) }
            />
            <TextField 
              id="senha" 
              label="Senha" 
              type="password"
              autoComplete="current-password"
              sx={{paddingBottom: 5}}
              value={senha}
              onChange={ (e) => setSenha(e.target.value) }
            />
            <Button 
              variant="contained"
              type="submit"
            >ENTRAR</Button>
        </Paper>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openAlert}
        onClose={() => setOpenAlert(!openAlert)}
        message={mensagem}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isFetching}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

export default Login;