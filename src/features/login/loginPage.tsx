import { Container } from "@mui/material"
import { useEffect } from "react";
import { Navigate, useLocation, useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AsyncStatus } from "../../app/interface";
import { discordLogin, redirectAfterMs, resetShowWelcome } from "./loginSlice";

import './login.css';

export const LoginPage = () => {
  let { hash } = useLocation();
  const { loginStatus, showWelcome, userData: userdata } = useAppSelector(state => state.login);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (loginStatus === AsyncStatus.NONE) {
      const trimmedHash = hash.substring(1);
      console.log(trimmedHash);
      const paramList = trimmedHash.split('&');
      const params: any = paramList.reduce((acc, curr) => {
        const [key, val] = curr.split('=');
        return {
          ...acc,
          [key]: val,
        }
      }, {});
      console.log(params)

      dispatch(discordLogin({
        tokenType: params['token_type'],
        token: params['access_token'],
      }))
    }

    if (loginStatus === AsyncStatus.IDLE) {
      dispatch(redirectAfterMs(3000));
    }

    return () => {
      if (loginStatus === AsyncStatus.IDLE && !showWelcome) {
        dispatch(resetShowWelcome());
      }
    }
  }, [loginStatus]);

  let innerContent
  switch (loginStatus) {
    case AsyncStatus.IDLE:
      innerContent = <Navigate to='/' />;
      break;
    default: 
      innerContent = <h1>Logging you in...</h1>;
  }
  if (showWelcome) {
    innerContent = <><h1>Welcome {userdata?.username}!</h1><h2>Redirecting...</h2></>;
  }

  return (
    <Container className='login-page-container'>
      {innerContent}
    </Container>
  )
}