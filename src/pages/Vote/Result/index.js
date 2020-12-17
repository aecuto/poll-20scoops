import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Layout from 'components/Layout';
import { db } from 'services/vote';
import { reqGet } from 'services/poll';

import count from '../Result/count';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import LinearProgress from './LinearProgress';
import styled from 'styled-components';

const Space = styled.div`
  margin-bottom: 20px;
`;

const Component = ({ match, history }) => {
  const { pollId } = match.params;
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const poll = await reqGet(pollId);
    db.where('pollId', '==', pollId).onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        list.push(doc.data());
      });
      setData(count(poll, list));
    });
  };

  const onBack = () => {
    history.goBack();
  };

  const renderData = () => {
    return (
      <Paper style={{ padding: '20px' }}>
        <Grid container justify="center">
          <Typography variant="h1">{data.title}</Typography>
        </Grid>
        <Grid container justify="center">
          <Typography>{`(${data.total} total votes)`}</Typography>
        </Grid>

        <Space />

        <Grid container justify="center">
          <Grid item xs={6}>
            {data.result.map((value, index) => (
              <LinearProgress
                key={index}
                percentage={value.percentage}
                label={value.label}
                count={value.count}
              />
            ))}
          </Grid>
        </Grid>

        <Space />

        <Grid container justify="center">
          <Button
            variant="contained"
            onClick={() => onBack()}
            color="secondary"
          >
            Back
          </Button>
        </Grid>
      </Paper>
    );
  };

  return <Layout>{data.title ? renderData() : null}</Layout>;
};

Component.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
};

export default Component;
