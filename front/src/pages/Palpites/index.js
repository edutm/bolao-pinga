import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import { api } from "../../services/service";
import { Avatar, Box, Card, CardContent, Container, FormControl, getStepConnectorUtilityClass, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";

import moment from 'moment'; 

function Palpites() {

  const navigate = useNavigate(); 
  const [ mensagem, setMensagem ] = useState("");
  const [ openAlert, setOpenAlert ] = useState(false);
  const [ isFetching , setIsFetching] = useState(false);
  const [ filtro , setFiltro] = useState('TODOS');

  const [palpites, setPalpites] = useState([]);

  useEffect(()=> {
    setIsFetching(true);
    api.get('palpite')
      .then(response => {
        console.log("response", response.data.data);
        setPalpites(response.data.data);
      })
      .catch(err=> {
        console.log("err", err);
        console.log("err", err.response.status);
        if (err.response?.status === 401) {
          setMensagem("Precisa logar novamente mané!");
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
 
  const handlePlacarPalpite = (e, palpite) => {
    e.preventDefault();

    const newPalpites = [...palpites];
    newPalpites.forEach((p) => {
      const newPalpite = {...palpite};
      if (p.id === newPalpite.id) {

        if(e.target.id === 'placarMandante') {
          newPalpite.placarMandante = e.target.value.substring(1,2);
        } else {
          newPalpite.placarVisitante = e.target.value.substring(1,2);
        }

        setIsFetching(true);
        api.put('palpite', newPalpite)
          .then(response => {
            console.log("response", response)
            p.placarMandante = newPalpite.placarMandante;
            p.placarVisitante = newPalpite.placarVisitante;
            setMensagem("Palpite salvo com sucesso!");
            setOpenAlert(true);
          })
          .catch(err=> {
            console.log("err", err);
            console.log("err", err.response.status);
            if (err.response?.status === 401) {
              setMensagem("Precisa logar novamente mané!");
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
    });
    setPalpites(newPalpites);
  }

  const getPontosColor = (palpite) => {
    return palpite.pontos === 0 ? 'red' :
            palpite.pontos === 3 ? '#cde55a' : 'green';
  }

  const handlerFiltro = (e) => {
    console.log(e.target.value);
    setFiltro(e.target.value);
  }

  return (
    <>
  
      <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3}}>
        <Box sx={{minWidth: 300}}>
          <FormControl fullWidth>
            <InputLabel id="filtro-label">FILTRO</InputLabel>
            <Select
              labelId="filtro-label"
              id="filtro"
              value={filtro}
              label="FILTRO"
              onChange={handlerFiltro}
              defaultValue={filtro}
            >
              <MenuItem value={'TODOS'}>TODOS</MenuItem>
              <MenuItem value={'JOGOS_DE_HOJE'}>JOGOS DE HOJE</MenuItem>
              <MenuItem value={'JOGOS_DE_AMANHA'}>JOGOS DE AMANHÃ</MenuItem>
              <MenuItem value={'FASE DE GRUPO'}>FASE DE GRUPO</MenuItem>
              <MenuItem value={'OITAVAS_DE_FINAL'}>OITAVAS DE FINAL</MenuItem>
              <MenuItem value={'QUARTAS_DE_FINAL'}>QUARTAS DE FINAL</MenuItem>
              <MenuItem value={'SEMIFINAL'}>SEMIFINAL</MenuItem>
              <MenuItem value={'TERCEIRO_LUGAR'}>TERCEIRO LUGAR</MenuItem>
              <MenuItem value={'FINAL'}>FINAL</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography variant="h2" component="div" >
          Palpites
        </Typography>
        <Container 
          sx={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
          }}
        >
          {palpites.map((palpite) => (
            <Box 
              key={palpite.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Paper 
                sx={{
                  background: 'black',
                  minWidth: 200,
                  minHeight: 20,
                  marginTop: 2,
                  padding: 0.3
                }}
              >
                <Typography color={'white'} align="center">
                  {palpite.partida.fase ===  'grupo' ?
                    `Fase de Grupo - ${palpite.partida.rodada}ª rodada` : 
                    palpite.partida.fase === 'oitavas' ?
                    'Oitavas de Final' : 
                    palpite.partida.fase === 'quartas' ?
                    'Quartas de Final' :
                    palpite.partida.fase === 'semi' ?
                    'Semifinal' :
                    palpite.partida.fase === 'terceiro' ?
                    'Terceiro Lugar' :
                    palpite.partida.fase === 'final' ?
                    'Final' :
                    palpite.partida.fase
                  }
                </Typography>
              </Paper>
              <Paper  elevation={2} sx={{padding: 1, display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Box>
                  <Typography sx={{fontWeight: 600}}>
                    {moment(palpite.partida.data).format('DD/MM [ - ] H:mm [hrs]')}
                  </Typography>

                </Box>
                <Box sx={{padding: 1, display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                  
                  <Box 
                    sx={{
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      flexDirection: 'column',
                      minWidth: 150
                    }}
                  >
                    <Avatar  
                      variant="rounded" 
                      alt={'Catar'} 
                      src={`../../assets/images/bandeiras/${palpite.partida.mandante?.bandeira}.svg`}
                      sx={{ objectFit : 'cover', border: 1, borderColor: 'gray'}}
                    />
                    <Typography variant="caption" component="div">
                      {palpite.partida.mandante?.nome || 'indefinido'}
                    </Typography>
                  </Box>
                  <Box  
                    sx={{
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      flexDirection: 'row',
                      minWidth: 100
                    }}
                  >
                    <TextField 
                      id="placarMandante" 
                      sx={{maxWidth: 40}} 
                      value={palpite.placarMandante} 
                      type="number"
                      onChange={(e) => handlePlacarPalpite(e, palpite)}
                      disabled={palpite.partida.encerrada}
                    />
                    <Typography sx={{margin: 2}}>X</Typography>
                    <TextField 
                      id="placarVisitante" 
                      sx={{maxWidth: 40}} 
                      value={palpite.placarVisitante} 
                      type="number"
                      onChange={(e) => handlePlacarPalpite(e, palpite)}
                      disabled={palpite.partida.encerrada}
                    />
                  </Box>
                  <Box  
                    sx={{
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      flexDirection: 'column',
                      minWidth: 150
                    }}
                  >
                    <Avatar  
                      variant="rounded" 
                      alt={'Catar'} 
                      src={`../../assets/images/bandeiras/${palpite.partida.visitante?.bandeira}.svg`}
                      sx={{ objectFit : 'cover', border: 1, borderColor: 'gray'}}
                    />
                    <Typography variant="caption" component="div">
                    {palpite.partida.visitante?.nome || 'indefinido'}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                {palpite.partida.encerrada &&
                  <>
                    <Typography textAlign="center">
                      Resultado da Partida
                    </Typography>
                    <Typography sx={{fontWeight: 600, display: 'flex', flexDirection: 'row', alignItems: 'center'}} textAlign="center">
                      {(palpite.partida.penaltyMandante > 0 || palpite.partida.penaltyVisitante > 0) && 
                        <Typography variant="caption">({palpite.partida.penaltyMandante})</Typography>
                      }
                        {palpite.partida.placarMandante} X {palpite.partida.placarVisitante}
                      {(palpite.partida.penaltyMandante > 0 || palpite.partida.penaltyVisitante > 0) && 
                        <Typography variant="caption">({palpite.partida.penaltyVisitante})</Typography>
                      }
                    </Typography>
                    <Typography sx={{fontWeight: 600, color: getPontosColor(palpite)}} textAlign="center">
                      {palpite.pontos} pontos
                    </Typography>
                  </>
                }
                </Box>
              </Paper>
            </Box>
          ))}
        </Container>
      </Container>
  
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
    </>
  )
}

export default Palpites;