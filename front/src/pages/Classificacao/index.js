import React, { useState, useContext, useEffect} from "react";
import Container from '@mui/material/Container';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { api } from "../../services/service";
import { alpha, Typography } from "@mui/material";

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

function Classificacao() {

  const navigate = useNavigate(); 
  const { setLoginDto } = useContext( AuthContext );
  const [ isFetching , setIsFetching] = useState(false);
  const [ mensagem, setMensagem ] = useState("");
  const [ openAlert, setOpenAlert ] = useState(false);

  const [usuarios, setUsuarios] = useState([]);

  useEffect(()=> {
    const loginDto = JSON.parse(localStorage.getItem('loginDto'));
    api.defaults.headers.Authorization = `Bearer ${loginDto.token}`;

    setIsFetching(true);
    api.get('usuario/classificacao')
    .then(response => {
      console.log("response", response.data.data);
      let list = response.data.data;
      list.sort(function(a, b) {
        return b.pontos - a.pontos;
      });

      let aux = list[0].pontos;
      console.log(aux)
      let cont = 1;
      list.forEach((element, index) => {
        if (element.pontos === aux) {
          list[index].posicao = cont;
        } else {
          aux = element.pontos;
          cont++;
          list[index].posicao = cont;
        }
      });

      setUsuarios(list);
      console.log(usuarios)
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

  }, []);

  const getColor = (number) => {
    if (number === 1) {
      return "#1EF508";
    }
    if (number === 2) {
      return "#DCF508";
    }
    if (number === 3) {
      return "#F57708";
    }
    return "#FFF"
    
  }
  
  return (
    <Container sx={{padding: 2}}>
        
        <TableContainer component={Paper} sx={{marginTop: 2}}>
        <Table sx={{ minWidth: '100%' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Posição</StyledTableCell>
              <StyledTableCell>Nome (Apelido)</StyledTableCell>
              <StyledTableCell align="right">Pontos</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell 
                    component="th" 
                    scope="row"
                    sx={{background: alpha(getColor(row.posicao), 0.1)}}
                  >
                    <Typography>{row.posicao}</Typography>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row"  sx={{background: alpha(getColor(row.posicao), 0.1)}}>
                    {row.nome}
                  </StyledTableCell>
                  <StyledTableCell align="right"  sx={{background: alpha(getColor(row.posicao), 0.1)}}>
                    {row.pontos}
                  </StyledTableCell>
                </StyledTableRow>
              
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isFetching}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

export default Classificacao;