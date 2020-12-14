import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { Form, Field } from 'react-final-form';
import styled from 'styled-components';

import Layout from 'components/Layout';
import { reqGet } from 'services/poll';
import { reqVote } from 'services/vote';

import MuiPaper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import Radio from 'components/FinalForm/Radio';

const Paper = styled(MuiPaper)`
  && {
    padding: 20px;
  }
`;

const Component = ({ match }) => {
  const { pollId } = match.params;
  const [data, setData] = useState({});

  useEffect(() => {
    reqGet(pollId).then(setData);
  }, []);

  const onSubmit = values => {
    return reqVote(values);
  };

  const renderVoteAnswer = () => {
    return (
      <Paper>
        <Grid container>
          <Typography variant="h1">{data.title}</Typography>
        </Grid>
        <Divider style={{ marginBottom: '20px' }} />
        <Form
          onSubmit={onSubmit}
          initialValues={{ pollId: data.id }}
          render={({ handleSubmit, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {data.answer.map((answer, index) => (
                  <Grid item xs={12} key={index}>
                    <Field
                      name="answer"
                      component={Radio}
                      label={answer.label}
                    />
                  </Grid>
                ))}
              </Grid>

              <Divider style={{ marginBottom: '20px' }} />

              <Grid container>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={pristine || submitting}
                  >
                    Vote
                  </Button>
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'right' }}>
                  <Button variant="contained">Result</Button>
                </Grid>
              </Grid>

              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          )}
        />
      </Paper>
    );
  };

  return <Layout>{data.title ? renderVoteAnswer() : null}</Layout>;
};

Component.propTypes = {
  match: PropTypes.object
};

export default Component;
