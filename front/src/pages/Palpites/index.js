import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import { api } from "../../services/service";

function Palpites() {

  const navigate = useNavigate(); 
  const [ mensagem, setMensagem ] = useState("");
  const [ openAlert, setOpenAlert ] = useState(false);
  const [ isFetching , setIsFetching] = useState(false);

  useEffect(()=> {
    /*api.get('usuario/lista')
      .then(response => {
        console.log("response", response);
      })
      .catch(err=> {
        console.log("err", err);
      })
      .finally(() => {
        setIsFetching(false);
      });*/
  }, []);
 
  return (
    <>
      <h1>tewt</h1>
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