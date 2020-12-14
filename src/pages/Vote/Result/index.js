import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Layout from 'components/Layout';
import { db } from 'services/vote';
import { reqGet } from 'services/poll';

import { formatPercent } from 'utils/numeral';

import count from '../Result/count';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Component = ({ match }) => {
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

  console.log(data);

  const renderData = () => {
    return (
      <>
        <Typography variant="h1">{data.title}</Typography>
        <Grid container>
          {data.result.map(data => (
            <Grid item xs={12}>
              {data.label}-{formatPercent(data.percentage)}
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  return <Layout>{data.title ? renderData() : null}</Layout>;
};

Component.propTypes = {
  match: PropTypes.object
};

export default Component;
