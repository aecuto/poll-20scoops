import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Form, Field } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import {
  composeValidators,
  required,
  email,
  minLength
} from 'utils/form/validators';

import TextField from 'components/Field/TextField';

const GridRow = styled(Grid)`
  && {
    margin-bottom: 10px;
  }
`;

const UserForm = ({ onSubmit, initialValues }) => {
  return (
    <Grid container justify="center">
      <Grid item xs={10} sm={6}>
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({ handleSubmit, form, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <GridRow container>
                <Field
                  name="name"
                  component={TextField}
                  type="text"
                  label="Name"
                  validate={required('Name')}
                />
              </GridRow>

              <GridRow container>
                <Field
                  name="email"
                  component={TextField}
                  type="text"
                  label="Email"
                  validate={composeValidators(required('Email'), email)}
                />
              </GridRow>

              {!initialValues.name && (
                <GridRow container>
                  <Field
                    name="password"
                    component={TextField}
                    type="password"
                    label="Password"
                    validate={composeValidators(
                      required('Password'),
                      minLength(6)
                    )}
                  />
                </GridRow>
              )}

              <GridRow container justify="center" spacing={3}>
                <Grid item xs={12} sm={3}>
                  <Button
                    type="submit"
                    disabled={submitting || pristine}
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Reset
                  </Button>
                </Grid>
              </GridRow>
            </form>
          )}
        />
      </Grid>
    </Grid>
  );
};

UserForm.defaultProps = {
  onSubmit: () => ({}),
  initialValues: {}
};

UserForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func
};

export default UserForm;
