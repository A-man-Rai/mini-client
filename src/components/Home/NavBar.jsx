import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ReplyIcon from '@mui/icons-material/Reply';
import Login from '../Login/Login';
export default function NavBar({setMap,setIsLogged}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
           <ReplyIcon onClick={()=>{
                 setMap(true);
                 setIsLogged(false);
           }}/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ACCIDENT SURVEY
          </Typography>
          
          <Button color="inherit" onClick={()=>{
            setIsLogged(true)
            setMap(false)
          }} >Report Us</Button>
          <Login />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
