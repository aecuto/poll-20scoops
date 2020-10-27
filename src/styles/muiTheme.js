import { createMuiTheme } from '@material-ui/core/styles';
import { color } from './color';

export default createMuiTheme({
  palette: {
    type: 'light',
    background: {
      default: color.grey[100]
    }
  },
  typography: {
    fontFamily: 'Rubik',
    h1: {
      fontWeight: 700,
      fontSize: '40px'
    },
    h2: {
      fontWeight: 700,
      fontSize: '32px'
    },
    h3: {
      fontWeight: 700,
      fontSize: '24px'
    },
    button: {
      fontWeight: 700,
      fontSize: '18px'
    },
    body1: {
      fontWeight: 500,
      fontSize: '16px'
    },
    body2: {
      fontWeight: 500,
      fontSize: '14px'
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '12px'
    },
    caption: {
      fontWeight: 500,
      fontSize: '10px'
    }
  }
});
