import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const CustomizedSnackbars = ({ severity, message, autoHideDuration }) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

CustomizedSnackbars.propTypes = {
  autoHideDuration: PropTypes.number,
  message: PropTypes.string,
  severity: PropTypes.string
};

CustomizedSnackbars.defaultProps = {
  severity: 'info',
  message: '',
  autoHideDuration: 6000
};

export default CustomizedSnackbars;
