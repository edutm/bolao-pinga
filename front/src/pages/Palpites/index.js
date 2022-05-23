import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import { api } from "../../services/service";
import { Avatar, Box, Card, CardContent, Container, Grid, Paper, TextField, Typography } from "@mui/material";

import moment from 'moment'; 

function Palpites() {

  const navigate = useNavigate(); 
  const [ mensagem, setMensagem ] = useState("");
  const [ openAlert, setOpenAlert ] = useState(false);
  const [ isFetching , setIsFetching] = useState(false);

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

  return (
    <>
  
      <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3}}>
    
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
            <Box key={palpite.id}>
              <Paper  elevation={2} sx={{marginTop: 1, padding: 1, display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Box>
                  <Typography>
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