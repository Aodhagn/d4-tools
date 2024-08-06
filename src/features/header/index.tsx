import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../../app/store";
import { LoginButton } from "../login/loginButton";

import './header.css';

export const Header = () => (
  <AppBar position='static' className='bordered-container-bottom'>
      <Toolbar className='toolbar'>
        <Typography variant='h3' sx={{flexGrow: 1, display: {xs: 'none', sm: 'flex'}}}>Diablo 4 Calculator</Typography>
        <Typography variant='h5' sx={{flexGrow: 1, display: {xs: 'flex', sm: 'none'}}}>Diablo 4 Calculator</Typography>
        {/* <Button href='/notifications' variant='outlined' color='secondary' className='notification-icon'>
          <NotificationsIcon />
        </Button>
        <PersistGate persistor={persistor} onBeforeLift={() => console.log('Lifting gate')}>
          <LoginButton />
        </PersistGate> */}
      </Toolbar>
    </AppBar>
)