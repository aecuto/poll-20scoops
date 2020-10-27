import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Form, Field } from 'react-final-form';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MuiPaper from '@material-ui/core/Paper';

import TextField from 'components/Field/TextField';
import PasswordField from 'components/Field/PasswordField';
import Snackbar from 'components/Toast/Snackbar';

const Paper = styled(MuiPaper)`
  && {
    padding: 20px;
  }
`;

const LoginView = ({ onSubmit }) => {
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
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting, pristine, submitError }) => (
                <form onSubmit={handleSubmit}>
                  <Snackbar severity="error" message={submitError} />
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Field
                        name="email"
                        component={TextField}
                        type="email"
                        label={t('email')}
                        placeholder={t('email')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="password"
                        component={PasswordField}
                        type="password"
                        label={t('password')}
                        placeholder={t('password')}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        color="primary"
                        type="submit"
                        disabled={submitting || pristine}
                        fullWidth
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

LoginView.propTypes = {
  onSubmit: PropTypes.func
};

export default LoginView;
