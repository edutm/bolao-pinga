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
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);
 
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
                    <TextField id="placarMandante" sx={{maxWidth: 40}} value={palpite.placarMandante} type="number"/>
                    <Typography sx={{margin: 2}}>X</Typography>
                    <TextField id="placarVisitante" sx={{maxWidth: 40}} value={palpite.placarVisitante} type="number"/>
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