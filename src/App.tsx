import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, createTheme, ThemeProvider } from '@mui/material';
import { Header } from './features/header';
import { CalculatorPage } from './features/calculator';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#afafaf'
    },
    secondary: {
      main: '#afafaf'
    }
  },
  typography: {
    allVariants: {
      color: '#afafaf',
    },
    fontFamily: '"Exocet Blizzard", "Formal436 BT"'
  }
});

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Header />
            <Container id='main-container' maxWidth='md'>
              <Container className='bordered-container-vertical sub-container'>
                <Routes>
                  <Route path='/' element={<CalculatorPage />} />
                </Routes>
              </Container>
            </Container>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
