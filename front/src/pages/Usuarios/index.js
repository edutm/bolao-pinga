import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../../contexts/auth'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

import { api } from "../../services/service";
import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Modal, TextField, Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default () => {

  const { setLoginDto } = useContext( AuthContext );

  const navigate = useNavigate(); 

  const [usuarios, setUsuarios] = useState([]);
  const [ mensagem, setMensagem ] = useState("");
  const [ openAlert, setOpenAlert ] = useState(false);
  const [ isFetching , setIsFetching] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState();
  const [nome, setNome] = useState();
  const [celular, setCelular] = useState();
  const [senhaCadastrada, setSenhaCadastrada] = useState(false);
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    const loginDto = JSON.parse(localStorage.getItem('loginDto'));
    api.defaults.headers.Authorization = `Bearer ${loginDto.token}`;
    getUsuarios();
  }, []);

  const getUsuarios = () => {
    setIsFetching(true);
    api.get('usuario/lista')
      .then(response => {
        console.log("response", response.data.data);
        setUsuarios(response.data.data);
      })
      .catch(err=> {
        console.log("err", err);
        console.log("err", err.response.status);
        if (err.response?.status === 401) {
          setMensagem("Precisa logar novamente mané!");
          api.defaults.headers.Authorization = null;
          setLoginDto(null);
          localStorage.removeItem('loginDto');
          navigate('/login');
        } else {
          setMensagem("Erro! Tente denovo em alguns instantes.");
          setOpenAlert(true);
        }
      })
      .finally(() => {
        setIsFetching(false);
      });
  }

  const handleClose = () => {
    setOpenModal(false);
  }

  const handlerEdit = (usuario) => {
    console.log(usuario)
    setId(usuario.id);
    setNome(usuario.nome);
    setCelular(usuario.celular);
    setAtivo(usuario.ativo);
    setSenhaCadastrada(usuario.senhaCadastrada);
    setOpenModal(true);
  }

  const handlerSalvar = () => {
    console.log(id);
    console.log(nome);
    console.log(celular);
    console.log(senhaCadastrada);

    if (!nome || !celular) {
      setMensagem("Nome e Celular obrigatorio mane!");
      setOpenAlert(true);
      return;
    }

    setIsFetching(true);
    api.post('usuario/cadastrar', {id, nome, celular, senhaCadastrada, ativo})
      .then(response => {
        console.log("response", response)
        setMensagem("Usuario salvo com sucesso!");
        setOpenAlert(true);
        handleClose();
        getUsuarios();
      })
      .catch(err=> {
        console.log("err", err);
        console.log("err", err.response.status);
        if (err.response?.status === 401) {
          setMensagem("Precisa logar novamente mané!");
          api.defaults.headers.Authorization = null;
          setLoginDto(null);
          localStorage.removeItem('loginDto');
          navigate('/login');
        } else {
          if (err.response.data.errors) {
            setMensagem(err.response.data.errors.join('\r\n'));
          } else {
            setMensagem("Erro! Tente denovo em alguns instantes.");
          }
          setOpenAlert(true);
        }
      })
      .finally(() => {
        setIsFetching(false);
      });
   
  }

  const handlerNovo = () => {
    setId('');
    setNome('');
    setCelular('');
    setSenhaCadastrada(false);
    setAtivo(false);
    setOpenModal(true)
  }

  useEffect(()=> {
    const loginDto = JSON.parse(localStorage.getItem('loginDto'));
    api.defaults.headers.Authorization = `Bearer ${loginDto.token}`;
  }, []);
  
  return (
    <Container sx={{padding: 2}}>
      <Container>
        <Button 
          variant="outlined"
          onClick={handlerNovo}
        >
          ADD
        </Button>
      </Container>

      <TableContainer component={Paper} sx={{marginTop: 2}}>
        <Table sx={{ minWidth: '100%' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nome (Apelido)</StyledTableCell>
              <StyledTableCell align="right">Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.nome}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button 
                      variant="outlined" 
                      sx={{marginRight: 1}}
                      onClick={() => handlerEdit(row)}
                    >
                      Editar
                    </Button>  
                  </StyledTableCell>
                </StyledTableRow>
              
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
          }}
        >
          <Typography variant="h5" sx={{paddingBottom: 2}}>Editar</Typography>
          <TextField 
              id="nome" 
              label="Nome"
              type="text"
              sx={{paddingBottom: 1, width: '100%'}}
              value={nome}
              onChange={ (e) => setNome(e.target.value) }
          />
          <TextField 
              id="celular" 
              label="Celular"
              type="number"
              sx={{paddingBottom: 1, width: '100%'}}
              value={celular}
              onChange={ (e) => setCelular(e.target.value) }
          />
          <FormGroup>
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={senhaCadastrada}
                  onChange={() => setSenhaCadastrada(!senhaCadastrada)}
                />
              } 
              label="Senha Cadastrada" 
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={ativo}
                  onChange={() => setAtivo(!ativo)}
                />
              } 
              label="Ativo" 
            />
          </FormGroup>
          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button 
              variant="contained" 
              align="right"
              onClick={handlerSalvar}
            >
              Salvar
            </Button>  
          </Box>
        </Box>
      </Modal>
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isFetching}
        >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openAlert}
        onClose={() => setOpenAlert(!openAlert)}
        message={mensagem}
      />
    </Container>
  );
}
