import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Layout from 'components/Layout';

import { db } from 'services/share-poll';
import routeUrlProvider, { VOTE_ANSWER } from 'constants/route-paths';

import MuiPaper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { formatDate } from 'utils/dateTime';

const Paper = styled(MuiPaper)`
  && {
    padding: 20px;
    cursor: pointer;
  }
`;

const Component = ({ history }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    db.orderBy('created_at', 'desc').onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        list.push(doc.data());
      });
      setList(list);
    });
  }, []);

  const onClick = pollId => {
    console.log(pollId);
    history.push(routeUrlProvider.getForLink(VOTE_ANSWER, { pollId }));
  };

  return (
    <Layout>
      <Grid container spacing={3}>
        {list.map((data, index) => (
          <Grid item xs={12} key={index}>
            <Paper onClick={() => onClick(data.pollId)}>
              {data.title} - {formatDate(data.created_at.toDate())}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

Component.propTypes = {
  history: PropTypes.object
};

export default Component;
