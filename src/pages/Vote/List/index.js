import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Layout from 'components/Layout';

import { db } from 'services/share-poll';
import routeUrlProvider, { VOTE_ANSWER } from 'constants/route-paths';

import MuiPaper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import TimeAgo from 'react-timeago';

const Paper = styled(MuiPaper)`
  && {
    padding: 20px;
    cursor: pointer;
  }
`;

const Component = ({ history }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    db.orderBy('created_at', 'desc')
      .limit(5)
      .onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          list.push(doc.data());
        });
        setList(list);
      });
  }, []);

  const onClick = pollId => {
    history.push(routeUrlProvider.getForLink(VOTE_ANSWER, { pollId }));
  };

  return (
    <Layout>
      <Grid container spacing={3}>
        {list.map((data, index) => (
          <Grid item xs={12} key={index}>
            <Paper
              onClick={() => onClick(data.pollId)}
              variant="outlined"
              square
            >
              <Typography variant="h5" paragraph>
                {`#${index + 1}. `}
                {data.title}
              </Typography>
              <Chip
                label={<TimeAgo date={data.created_at.toDate()} />}
                color={!index ? 'secondary' : 'default'}
              />
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
