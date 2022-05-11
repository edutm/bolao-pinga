import React from "react";
import { styled, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { Container, Typography } from "@mui/material";
import { flexbox } from "@mui/system";


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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  nome,
  pontos,
  partidas,
  vitorias,
  empates,
  derrotas,
  golsPro,
  golsContra,
  saldo,
  bandeira
) {
  return { bandeira, nome, pontos, partidas, vitorias, empates, derrotas, golsPro, golsContra, saldo};
}

const rows = [
  createData('Catar', 0, 0, 0, 0, 0, 0, 0, 0, '../../assets/images/bandeiras/catar.svg'),
  createData('Equador', 0, 0, 0, 0, 0, 0, 0, 0, '../../assets/images/bandeiras/equador.svg'),
  createData('Senegal', 0, 0, 0, 0, 0, 0, 0, 0, '../../assets/images/bandeiras/senegal.svg'),
  createData('Holanda', 0, 0, 0, 0, 0, 0, 0, 0, '../../assets/images/bandeiras/holanda.svg'),
];

const PaperContiner = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(1)
}));

function GrupoClassificacao({ grupo }) {
  const theme = useTheme();

  return (
    <TableContainer component={PaperContiner}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow sx={{backgroundColor: theme.palette.primary.main}}>
            <TableCell align="left" colSpan={9} sx={{color: '#FFF', border: 0}}>
              {grupo?.nome}
            </TableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell sx={{minWidth: 200}}>Equipe</StyledTableCell>
            <StyledTableCell align="center">Pts</StyledTableCell>
            <StyledTableCell align="center">PJ</StyledTableCell>
            <StyledTableCell align="center">VIT</StyledTableCell>
            <StyledTableCell align="center">E</StyledTableCell>
            <StyledTableCell align="center">DER</StyledTableCell>
            <StyledTableCell align="center">GP</StyledTableCell>
            <StyledTableCell align="center">GC</StyledTableCell>
            <StyledTableCell align="center">SG</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.nome}>
              <StyledTableCell component="th" scope="row">
                <Container 
                  disableGutters 
                  sx={{
                    display: 'flex', 
                    flexDirection: 'row',
                    alignItems: 'center',
                    
                  }}
                >
                  <Avatar 
                    variant="rounded" 
                    alt={row.nome} 
                    src={row.bandeira}
                    sx={{ objectFit : 'cover'}}
                  />
                  <Typography variant="subtitle1" sx={{paddingLeft: theme.spacing(1)}}>
                    {row.nome}
                  </Typography>
                  
                </Container> 
              </StyledTableCell>
              <StyledTableCell align="center">{row.pontos}</StyledTableCell>
              <StyledTableCell align="center">{row.partidas}</StyledTableCell>
              <StyledTableCell align="center">{row.vitorias}</StyledTableCell>
              <StyledTableCell align="center">{row.empates}</StyledTableCell>
              <StyledTableCell align="center">{row.derrotas}</StyledTableCell>
              <StyledTableCell align="center">{row.golsPro}</StyledTableCell>
              <StyledTableCell align="center">{row.golsContra}</StyledTableCell>
              <StyledTableCell align="center">{row.saldo}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GrupoClassificacao;