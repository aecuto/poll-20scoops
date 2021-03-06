import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const CustomizedSnackbars = ({ severity, message, autoHideDuration }) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (message.text) {
      setOpen(true);
    }
  }, [message.lastUpdated]);

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
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message.text}
      </Alert>
    </Snackbar>
  );
};

CustomizedSnackbars.propTypes = {
  autoHideDuration: PropTypes.number,
  message: PropTypes.object,
  severity: PropTypes.string
};

CustomizedSnackbars.defaultProps = {
  severity: 'info',
  message: { text: '' },
  autoHideDuration: 1500
};

export default CustomizedSnackbars;
