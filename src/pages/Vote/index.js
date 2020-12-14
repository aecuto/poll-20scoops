import React, { useEffect, useState } from 'react';

import Layout from 'components/Layout';

import { db } from 'services/share-poll';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { formatDate } from 'utils/dateTime';

const Component = () => {
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

  return (
    <Layout>
      <Grid container spacing={3}>
        {list.map(data => (
          <Grid item xs={12} key={data.id}>
            <Paper style={{ padding: '10px' }}>
              {data.title} - {formatDate(data.created_at.toDate())}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Component;
