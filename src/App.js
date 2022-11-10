import { CssBaseline } from '@mui/material';
import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles'
import Stepercomponent from './components/Stepercomponent';

const theme = createTheme({
  palette: {
    primary: {
      main: `#00008b`,
    },
    secondary: {
      main: `#F4CE2C`,
    },
  },
  typography: {
    fontFamily: "Roboto Slab, serif"
  }
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stepercomponent />
    </ThemeProvider>
  );
}

export default App;
