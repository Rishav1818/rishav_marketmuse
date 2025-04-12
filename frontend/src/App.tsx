import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import QueryInput from './components/QueryInput';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <QueryInput />
      </Container>
    </ThemeProvider>
  );
}

export default App;
