import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Layout from 'components/Layout';
import { db } from 'services/vote';
import { reqGet } from 'services/poll';

import count from '../Result/count';

const Component = ({ match }) => {
  const { pollId } = match.params;

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
      count(poll, list);
    });
  };

  return <Layout>Result {pollId}</Layout>;
};

Component.propTypes = {
  match: PropTypes.object
};

export default Component;
