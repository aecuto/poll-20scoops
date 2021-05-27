import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Particles from 'react-particles-js';
import ParticlesConfig from './particlesjs-config.json';

import { GoogleLoginButton } from 'react-social-login-buttons';

const Wrapper = styled.div`
  height: 100vh;
  background: rgb(35, 39, 65);
`;

const View = ({ googleSignIn }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Particles
        params={ParticlesConfig}
        style={{
          position: 'absolute'
        }}
      />

      <Grid
        container
        justify="center"
        alignItems="center"
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      >
        <Grid item lg={6} xs={10}>
          <Typography
            style={{
              textAlign: 'center',
              color: 'white',
              marginBottom: '20px',
              letterSpacing: '5px'
            }}
            variant="h2"
          >
            {t('project_title')}
          </Typography>
          <GoogleLoginButton onClick={googleSignIn} />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

View.propTypes = {
  googleSignIn: PropTypes.any
};

export default View;
