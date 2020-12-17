import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Layout from 'components/Layout';

import Grid from '@material-ui/core/Grid';
import MuiPaper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MuiDivider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Delete from '@material-ui/icons/Delete';

import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';

import TextField from 'components/FinalForm/TextField';
import Snackbar from 'components/Snackbar';

import { reqCreate, reqGet, reqDelete, reqUpdate } from 'services/poll';
import routeUrlProvider, { POLL_SAVE, POLL_LIST } from 'constants/route-paths';
import { compact } from 'lodash';
import { required } from 'utils/form/validators';

const Divider = styled(MuiDivider)`
  && {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const Paper = styled(MuiPaper)`
  && {
    padding: 20px;
    margin-bottom: 10px;
  }
`;

const Component = ({ match, history }) => {
  const { pollId } = match.params;
  const isCreate = pollId === 'create';

  const [data, setData] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isCreate) {
      reqGet(pollId).then(data => setData(data));
    }
  }, [pollId]);

  const onSubmit = values => {
    const data = { ...values, answer: compact(values.answer) };

    if (isCreate) {
      return reqCreate(data).then(doc => {
        setMessage('Create Success!');
        history.push(
          routeUrlProvider.getForLink(POLL_SAVE, { pollId: doc.id })
        );
      });
    } else {
      return reqUpdate(pollId, data).then(() => setMessage('Update Success!'));
    }
  };

  const onDelete = () => {
    return reqDelete(pollId).then(() =>
      history.push(routeUrlProvider.getForLink(POLL_LIST))
    );
  };

  const autoAdd = (push, values, index) => {
    if (index === values.answer.length - 1) {
      push('answer', undefined);
    }
  };

  const validateAnswer = value => {
    if (!compact(value).length) {
      return 'required';
    }
  };

  const checkError = meta => {
    const error =
      (meta.touched && meta.error) ||
      (!meta.dirtySinceLastSubmit && meta.submitError);
    return error;
  };

  return (
    <Layout>
      <Snackbar message={message} severity="success" />
      <Paper>
        <Grid container style={{ marginBottom: '20px' }}>
          <Grid item xs={6}>
            <Typography variant="h1">
              {isCreate ? 'Create' : 'Editing'}
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            {!isCreate && (
              <IconButton color="secondary" onClick={onDelete}>
                <Delete />
              </IconButton>
            )}
          </Grid>
        </Grid>

        <Form
          onSubmit={onSubmit}
          mutators={arrayMutators}
          initialValues={{ answer: [null], ...data }}
          render={({
            handleSubmit,
            form: {
              mutators: { push }
            },
            pristine,
            submitting,
            values
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field
                      name="title"
                      label="Title"
                      component={TextField}
                      validate={required('Title')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="group"
                      label="Group (ex. okrs-q4-2020)"
                      component={TextField}
                      validate={required('Group')}
                    />
                  </Grid>
                </Grid>
                <Divider />

                <FieldArray name="answer" validate={validateAnswer}>
                  {({ fields, meta }) => (
                    <FormControl error={Boolean(checkError(meta))} fullWidth>
                      <FormLabel>
                        <Typography gutterBottom>
                          Answer Options
                          {checkError(meta) && ` (${checkError(meta)})`}
                        </Typography>
                      </FormLabel>
                      {fields.map((name, index) => (
                        <Field
                          key={index}
                          name={`${name}.label`}
                          component={TextField}
                          placeholder={`Answer #${index + 1}`}
                          onClick={() => autoAdd(push, values, index)}
                        />
                      ))}
                    </FormControl>
                  )}
                </FieldArray>

                <Divider />

                <Grid container justify="center">
                  <Button
                    color="primary"
                    type="submit"
                    disabled={submitting || pristine}
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Grid>
              </form>
            );
          }}
        />
      </Paper>
    </Layout>
  );
};

Component.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
};

export default Component;
