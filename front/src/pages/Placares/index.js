import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import { api } from "../../services/service";
import { 
  Avatar, 
  Box, 
  Modal, 
  FormGroup, 
  Container, 
  FormControlLabel, 
  Checkbox, 
  Button, 
  Paper, 
  Typography,
  TextField
} from "@mui/material";

import moment from 'moment'; 

function Placares() {

  const navigate = useNavigate(); 
  const [ mensagem, setMensagem ] = useState("");
  const [ openAlert, setOpenAlert ] = useState(false);
  const [ isFetching , setIsFetching] = useState(false);
  const { setLoginDto } = useContext( AuthContext );
  const [openModal, setOpenModal] = useState(false);
  const [partidas, setPartidas] = useState([]);
  const [partida, setPartida] = useState([]);

  const [encerrada, setEncerrada] = useState(false);
  
  const handleClose = () => {
    setOpenModal(false);
  }

  useEffect(()=> {
    const loginDto = JSON.parse(localStorage.getItem('loginDto'));
    api.defaults.headers.Authorization = `Bearer ${loginDto.token}`;
    getPartidas();
  }, []);

  const getPartidas = () => {
    setIsFetching(true);
    api.get('partida')
      .then(response => {
        console.log("response", response.data.data);
        setPartidas(response.data.data);
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
 
  const handlerSalvar = (e) => {
    e.preventDefault();
    setIsFetching(true);
    api.put('partida', partida)
      .then(response => {
        console.log("response", response)
        setOpenModal(false);
        setMensagem("Partida salvo com sucesso!");
        setOpenAlert(true);
        getPartidas();
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

  const handlerEdit = (partida) => {
    console.log(partida);
    setPartida(partida);
    setOpenModal(true);
  }

  const handlePlacarPartida = (e) => {
    e.preventDefault();

    var newPartida = {...partida};
    if(e.target.id === 'placarMandante') {
      newPartida.placarMandante = e.target.value.substring(1,2);
    } else {
      //newPalpite.placarVisitante = e.target.value.substring(1,2
      newPartida.placarVisitante = e.target.value.substring(1,2);
    }
    setPartida(newPartida);
  }

  const handlePenaltyPartida = (e) => {
    e.preventDefault();

    var newPartida = {...partida};
    if(e.target.id === 'penaltyMandante') {
      newPartida.penaltyMandante = e.target.value.substring(1,2);
    } else {
      //newPalpite.placarVisitante = e.target.value.substring(1,2
      newPartida.penaltyVisitante = e.target.value.substring(1,2);
    }
    setPartida(newPartida);
  }

  const handleEncerrada = () => {
    var newPartida = {...partida};
    newPartida.encerrada = !newPartida.encerrada;
    setPartida(newPartida);
  }

  return (
    <>
      <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3}}>
        <Typography variant="h2" component="div" >
          Partidas
        </Typography>
        <Container 
          sx={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
          }}
        >
          {partidas.map((partida) => (
            <Box 
              key={partida.id}
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
                  {partida.fase ===  'grupo' ?
                    `Fase de Grupo - ${partida.rodada}ª rodada` : 
                    partida.fase === 'oitavas' ?
                    'Oitavas de Final' : 
                    partida.fase === 'quartas' ?
                    'Quartas de Final' :
                    partida.fase === 'semi' ?
                    'Semifinal' :
                    partida.fase === 'terceiro' ?
                    'Terceiro Lugar' :
                    partida.fase === 'final' ?
                    'Final' :
                    partida.fase
                  }
                </Typography>
              </Paper>
              <Paper onClick={() => handlerEdit(partida)} elevation={2} sx={{padding: 1, display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Box>
                  <Typography sx={{fontWeight: 600}}>
                    {moment(partida.data).format('DD/MM [ - ] H:mm [hrs]')}
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
                      alt={partida.mandante?.nome} 
                      src={`../../assets/images/bandeiras/${partida.mandante?.bandeira}.svg`}
                      sx={{ objectFit : 'cover', border: 1, borderColor: 'gray'}}
                    />
                    <Typography variant="caption" component="div">
                      {partida.mandante?.nome || 'indefinido'}
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
                    <Typography variant="h4">
                      <Typography variant="caption">({partida.penaltyMandante})</Typography>
                      {partida.placarMandante}
                    </Typography>
                    <Typography sx={{margin: 2}}>X</Typography>
                    <Typography variant="h4">
                      {partida.placarVisitante}
                      <Typography variant="caption">({partida.penaltyVisitante})</Typography>  
                    </Typography>
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
                      alt={partida.visitante?.nome} 
                      src={`../../assets/images/bandeiras/${partida.visitante?.bandeira}.svg`}
                      sx={{ objectFit : 'cover', border: 1, borderColor: 'gray'}}
                    />
                    <Typography variant="caption" component="div">
                    {partida.visitante?.nome || 'indefinido'}
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
          <Typography variant="h5" sx={{paddingBottom: 2}}>Partida</Typography>
          
          <Box  
            sx={{
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              flexDirection: 'row',
            }}
          >
            <Typography>{partida?.mandante?.nome} </Typography>
            <TextField 
              id="placarMandante" 
              sx={{maxWidth: 40, minWidth: 40}} 
              value={partida.placarMandante} 
              type="number"
              onChange={(e) => handlePlacarPartida(e)}
              disabled={partida.encerrada}
            />
            <Typography sx={{margin: 2}}>X</Typography>
            <TextField 
              id="placarVisitante" 
              sx={{maxWidth: 40, minWidth: 40}} 
              value={partida.placarVisitante} 
              type="number"
              onChange={(e) => handlePlacarPartida(e)}
              disabled={partida.encerrada}
            />
            <Typography>{partida?.visitante?.nome} </Typography>
          </Box>
          <Box  
            sx={{
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              flexDirection: 'row',
            
            }}
          >
            <TextField 
              id="penaltyMandante" 
              sx={{width: 40, minWidth: 40}} 
              value={partida.penaltyMandante} 
              type="number"
              onChange={(e) => handlePenaltyPartida(e)}
              disabled={partida.encerrada}
            />
            <Typography sx={{margin: 2}}>X</Typography>
            <TextField 
              id="penaltyVisitante" 
              sx={{width: 40, minWidth: 40}} 
              value={partida.penaltyVisitante} 
              type="number"
              onChange={(e) => handlePenaltyPartida(e)}
              disabled={partida.encerrada}
            />
          </Box>

          <FormGroup>
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={partida.encerrada}
                  onChange={handleEncerrada}
                />
              } 
              label="Encerrada" 
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
    </>
  )
}

export default Placares;