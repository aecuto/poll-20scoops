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
import routeUrlProvider, { VOTE_RESULT } from 'constants/route-paths';

const Paper = styled(MuiPaper)`
  && {
    padding: 20px;
  }
`;

const Component = ({ match, history }) => {
  const { pollId } = match.params;
  const [data, setData] = useState({});

  useEffect(() => {
    reqGet(pollId).then(setData);
  }, []);

  const onSubmit = values => {
    return reqVote(values).then(() => onResult());
  };

  const onResult = () => {
    history.push(routeUrlProvider.getForLink(VOTE_RESULT, { pollId }));
  };

  const renderVoteAnswer = () => {
    return (
      <Paper>
        <Grid container justify="center">
          <Grid item xs={6}>
            <Grid container>
              <Typography variant="h1">{data.title}</Typography>
            </Grid>
            <Divider style={{ marginBottom: '20px' }} />
            <Form
              onSubmit={onSubmit}
              initialValues={{ pollId: data.id }}
              render={({ handleSubmit, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3} justify="center">
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
                      <Button variant="contained" onClick={() => onResult()}>
                        Result
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  };

  return <Layout>{data.title ? renderVoteAnswer() : null}</Layout>;
};

Component.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
};

export default Component;
