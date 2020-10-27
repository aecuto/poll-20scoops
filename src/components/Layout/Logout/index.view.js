import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@material-ui/core';
import MuiDialog from '@material-ui/core/Dialog';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Dialog = styled(MuiDialog)`
  && {
    .MuiPaper-rounded {
      border-radius: 0px;
      padding: 16px 8px 24px;
    }
  }
`;

const LogoutView = ({ handleOpen, handleClose, open, onClick }) => {
  const { t } = useTranslation();

  return (
    <>
      <ListItem button onClick={handleOpen}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle id="alert-dialog-title" disableTypography>
          <Typography variant="h3">{t('logout_title')}</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography paragraph>{t('logout_details')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            {t('logout_cancel')}
          </Button>
          <Button onClick={onClick} autoFocus>
            {t('logout_confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

LogoutView.propTypes = {
  handleClose: PropTypes.func,
  handleOpen: PropTypes.func,
  onClick: PropTypes.func,
  open: PropTypes.bool
};

export default LogoutView;
