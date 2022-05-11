import React from "react";
import { Paper, Box, Typography, Avatar } from "@mui/material";
import { useTheme } from '@mui/material/styles';



function MataMataResultado() {

  const theme = useTheme();

  return (
    <Paper 
      variant="outlined"
      sx={{
        width: theme.spacing(30),
        height: theme.spacing(14),
        padding: theme.spacing(1)
      }}
    >
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant="subtitle2">30/01/2008</Typography>
        </Box>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'rows',
          }}
        >
          <Typography>FIM</Typography>
          <Typography sx={{marginLeft: theme.spacing(1)}}>(P)</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: theme.spacing(1)
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Avatar 
            variant="rounded" 
            alt="Catar" 
            src='../../assets/images/bandeiras/holanda.svg'
            sx={{ width: 24, height: 24 }}
          />
          <Typography sx={{marginLeft: theme.spacing(1)}}>Holanda</Typography>
        </Box>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'rows',
          }}
        >
          <Typography>1</Typography>
          <Typography sx={{marginLeft: theme.spacing(1)}}>(3)</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: theme.spacing(1)
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Avatar 
            variant="rounded" 
            alt="Catar" 
            src='../../assets/images/bandeiras/catar.svg'
            sx={{ width: 24, height: 24 }}
          />
          <Typography sx={{marginLeft: theme.spacing(1)}}>Catar</Typography>
        </Box>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'rows',
          }}
        >
          <Typography>1</Typography>
          <Typography sx={{marginLeft: theme.spacing(1)}}>(3)</Typography>
        </Box>
      </Box>
      
    </Paper>
  )
}

export default MataMataResultado;