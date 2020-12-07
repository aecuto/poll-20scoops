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

import AddCircleIcon from '@material-ui/icons/AddCircle';
import Delete from '@material-ui/icons/Delete';
import BackspaceIcon from '@material-ui/icons/Backspace';

import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';

import TextField from 'components/FinalForm/TextField';

import { reqCreate, reqGet, reqDelete, reqUpdate } from 'services/poll';
import routeUrlProvider, { POLL_SAVE, POLL_LIST } from 'constants/route-paths';

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

  useEffect(() => {
    if (!isCreate) {
      reqGet(pollId).then(doc => setData(doc.data()));
    }
  }, [pollId]);

  const onSubmit = values => {
    if (isCreate) {
      return reqCreate(values).then(doc =>
        history.push(routeUrlProvider.getForLink(POLL_SAVE, { pollId: doc.id }))
      );
    } else {
      return reqUpdate(pollId, values);
    }
  };

  const onDelete = () => {
    return reqDelete(pollId).then(() =>
      history.push(routeUrlProvider.getForLink(POLL_LIST))
    );
  };

  return (
    <Layout>
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
                    <Field name="title" label="Title" component={TextField} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="description"
                      label="Description"
                      component={TextField}
                    />
                  </Grid>
                </Grid>

                <Divider />

                <Grid container>
                  <Typography>Answer Options</Typography>
                </Grid>

                <FieldArray name="answer">
                  {({ fields }) =>
                    fields.map((name, index) => (
                      <Paper key={name}>
                        <Grid container>
                          <Grid item xs={6}>
                            {`Answer #${index + 1}`}
                          </Grid>
                          <Grid item xs={6} style={{ textAlign: 'right' }}>
                            <IconButton
                              onClick={() => fields.remove(index)}
                              color="secondary"
                            >
                              <BackspaceIcon />
                            </IconButton>
                          </Grid>
                          <Grid item xs={12}>
                            <Field
                              name={`${name}.label`}
                              component={TextField}
                              placeholder="answer"
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    ))
                  }
                </FieldArray>

                <Grid container justify="center" style={{ margin: '20px' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddCircleIcon />}
                    onClick={() => push('answer', undefined)}
                  >
                    Add Answer
                  </Button>
                </Grid>

                <Grid container justify="center" style={{ margin: '20px' }}>
                  <Button
                    color="primary"
                    type="submit"
                    disabled={submitting || pristine}
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Grid>

                <pre>{JSON.stringify(values, 0, 2)}</pre>
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
