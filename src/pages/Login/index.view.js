import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MuiPaper from '@material-ui/core/Paper';

import GoogleIcon from 'assets/icon/GoogleIcon';

const Paper = styled(MuiPaper)`
  && {
    padding: 20px;
  }
`;

const LoginView = ({ googleSignIn }) => {
  const { t } = useTranslation();
  return (
    <Container>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ minHeight: '80vh' }}
      >
        <Grid item lg={6} xs={10}>
          <Typography variant="h3" align="center" paragraph gutterBottom>
            {t('project_title')}
          </Typography>
          <Paper>
            <Typography variant="h4" align="center" paragraph>
              {t('login_title')}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={googleSignIn}
              startIcon={<GoogleIcon />}
            >
              Google Sign In
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

LoginView.propTypes = {
  googleSignIn: PropTypes.any
};

export default LoginView;
