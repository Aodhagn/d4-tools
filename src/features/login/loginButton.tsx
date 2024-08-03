import { ExpandMore, Logout } from "@mui/icons-material";
import { Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem, SvgIcon, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { persistor } from "../../app/store";
import { ReactComponent as DiscordSVGIcon } from './discord_icon.svg';
import { UserData } from "./interface";

import './login.css';
import { clearUserState } from "./loginSlice";

const DISCORD_URL = `https://discord.com/oauth2/authorize?response_type=token&client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&scope=identify`

export const LoginButton = () => {
  const { userData } = useAppSelector(state => state.login);
  console.log(userData)
  return (
    userData ? <ProfileButton {...userData} /> : <DiscordLoginButton />
  )
}

const DiscordLoginButton = () => {
  return (
    <Button
        variant='outlined'
        className={`login-button`}
        startIcon={<DiscordSVGIcon height={30} width={50} />}
        href={DISCORD_URL}>
      <Box sx={{flexGrow: 1, display: {xs: 'none', sm: 'flex'}}}>
        <h3 className='login-button-text'>Login with Discord</h3>
      </Box>
      <Box sx={{flexGrow: 1, display: {xs: 'flex', sm: 'none'}}}>
        <h5 className='login-button-text'>Login</h5>
      </Box>
    </Button>
  )
}

const ProfileButton = (userData: UserData) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onLogout = () => {
    dispatch(clearUserState());
  }
  return (
    <>
      <Box sx={{display: {xs: 'none', sm: 'block'}}} className='profile-button-box'>
        <Button
            variant='text'
            endIcon={<ExpandMore />}
            onClick={handleClick} >
          <Avatar 
              alt={userData.username} 
              src={`https://cdn.discordapp.com/avatars/${userData.userId}/${userData.avatar}.webp?size=40`}
              className='profile-button-avatar' />
          <h3 className='profile-button-username'>{userData.username}</h3>
        </Button>
      </Box>
      <Box sx={{display: {xs: 'block', sm: 'none'}}} className='profile-button-box'>
        <IconButton
            onClick={handleClick} >
          <Avatar 
              alt={userData.username} 
              src={`https://cdn.discordapp.com/avatars/${userData.userId}/${userData.avatar}.webp?size=40`}
              className='profile-button-avatar' />        
        </IconButton>
      </Box>
      <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }} >
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
    
  )
}

// Avatar url format: https://cdn.discordapp.com/avatars/${userId}/${avatarId}.webp?&{optional query params}
// https://cdn.discordapp.com/avatars/195547088409329664/3771314ad33aff450bee8af54c491a4b.webp?size=80