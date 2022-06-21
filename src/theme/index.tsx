import { createTheme, colors } from '@mui/material';
import shadows from './shadows';
import typography from './typography';

const theme = createTheme({
  palette: {
    background: {
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: '#0133a1'
    },
    secondary: {
      main: '#e7b45b'
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },
  shadows,
  typography
});

export default theme;
