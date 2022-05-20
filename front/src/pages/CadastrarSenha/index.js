import React, { useEffect, useState, useContext } from "react";
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { api } from '../../services/service';
import { AuthContext } from '../../contexts/auth'


function CadastrarSenha() {
  const navigate = useNavigate(); 
  const { setLoginDto } = useContext( AuthContext );

  const [openAlert, setOpenAlert] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");

  const handlerActive = (e) => {
    e.preventDefault();
    if (senha.length < 6) {
      setMensagem("Senha muito curta mané.")
      setOpenAlert(true)
      return;
    }

    if (senha !== confirmacaoSenha) {
      setMensagem("confirmação da senha esta diferente da senha mané.")
      setOpenAlert(true)
      return;
    }

    setIsFetching(true);
    api.put('usuario/cadastrar-senha', {senha, confirmacaoSenha})
      .then(response => {
        const loginDto = JSON.parse(localStorage.getItem('loginDto'));
        loginDto.usuario = response.data.data;
        setLoginDto(loginDto);
        localStorage.setItem('loginDto', JSON.stringify(loginDto));
        navigate('/palpites');

      })
      .catch(err => {
        console.log(err.response.data.errors)
        if (err.response.data.errors) {
          setMensagem(err.response.data.errors.join('\r\n'));
        } else {
          setMensagem("Erro, tente novamente mais tarde.");
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
            justifyContent: "center",
            flexDirection: "column"
            
        }}
    >
      <Typography sx={{fontSize: 30, paddingTop: 5}} variant="h1" component="div" gutterBottom>
        Cadastrar Nova Senha
      </Typography>
      <form action="" onSubmit={handlerActive}>
        <Paper sx={{padding: 5, display: "flex", flexDirection: "column"}}>
            <TextField 
              id="senha" 
              label="Senha" 
              type="password"
              autoComplete="current-password"
              sx={{paddingBottom: 5}}
              value={senha}
              onChange={ (e) => setSenha(e.target.value) }
            />
            <TextField 
              id="confirmaSenha" 
              label="Confirmar Senha" 
              type="password"
              autoComplete="current-password"
              sx={{paddingBottom: 5}}
              value={confirmacaoSenha}
              onChange={ (e) => setConfirmacaoSenha(e.target.value) }
            />
            <Button 
              variant="contained"
              type="submit"
            >Cadastrar</Button>
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

export default CadastrarSenha;