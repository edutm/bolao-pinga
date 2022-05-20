import React, { useEffect, useState, useContext } from "react";
import styled from '@emotion/styled';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate  } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth'


const DivGrow1 = styled.div`
  flex: 1;
`;

const LogoContainer = styled.div`
  justify-content: center;
`;

function Header() {

  const navigate = useNavigate(); 
  const { loginDto, setLoginDto, logged, senhaCadastrada } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const loginHandler = () => {
    handleCloseNavMenu();
    navigate("login");
  }

  const logoutHandler = () => {
    handleCloseNavMenu();
    setLoginDto(null);
    localStorage.removeItem('loginDto');
    navigate("login");
  }

  const classificacaoHandler = () => {
    navigate("classificacao")
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
    <Box  
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        flexDirection: "column"
      }} 
    >
      <img 
        width="150"
        src="../../assets/images/logo-time.png"
        alt="new"
      />
      <Typography textAlign="center" color="#FFF" variant="h5">Bolão Pinga na Copa</Typography>
    </Box>
    <AppBar position="static">
      <Container  disableGutters>
        <Toolbar>
          { logged && 
            <Container disableGutters>
              <Container disableGutters>
                {senhaCadastrada &&
                  <Container disableGutters sx={{display: 'flex', flexDirection: 'row'}}>
                    <Button 
                      color="inherit"
                      sx={{display: {xs: 'none', md: 'flex'}}}
                    >
                      Home
                    </Button>
                    <Button 
                      color="inherit"
                      sx={{display: {xs: 'none', md: 'flex'}}}
                    >
                      Palpites
                    </Button>
                    <Button 
                      color="inherit"
                      sx={{display: {xs: 'none', md: 'flex'}}}
                      onClick={classificacaoHandler}
                    >
                      Classificação
                    </Button>
                    
                  </Container>
                }
              
              
              
              </Container>
              <Container
                disableGutters 
                sx={{ 
                  display:"flex", 
                  alignItems: "center", 
                  justifyContent: "flex-end",
                }}
              >
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleOpenNavMenu}
                    sx={{ mr: 2, display: {xs: 'flex', md: 'none'} }}
                >
                  <MenuIcon />
                </IconButton>
              </Container>
            </Container>
          }
          { !senhaCadastrada && <DivGrow1 />}
          { logged && 
            <Button 
              variant="outlined"
              color="inherit"
              sx={{display: {xs: 'none', md: 'flex'}}}
              onClick={logoutHandler}
            >
              Sair
            </Button>
          }
          { (!logged && window.location.pathname !== '/login')  && 
            <Container 
              disableGutters
              sx={{ 
                display:"flex", 
                alignItems: "center", 
                justifyContent: "flex-end",
              }}
            >
              <Button 
                variant="outlined"
                color="inherit"
                onClick={loginHandler}
              >
                entrar
              </Button>
            </Container>
          }
          <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            {senhaCadastrada &&
              <Container disableGutters>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">HOME</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">PALPITES</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">CLASSIFICAÇÃO</Typography>
                </MenuItem>
              </Container>
            }
             <Container disableGutters>
              <MenuItem onClick={logoutHandler}>
                <Typography textAlign="center">SAIR</Typography>
              </MenuItem>
             </Container>
             
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
}

export default Header;