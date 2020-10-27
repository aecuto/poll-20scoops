import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import ListView from './index.view';

import { getList, remove } from 'services/users';

import Layout from 'components/Layout';

import routeUrlProvider, { USER_EDIT } from 'constants/route-paths';

const List = ({ history }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = () => {
    getList().then(res => setUsers(res.data));
  };

  const editLink = userId => {
    history.push(routeUrlProvider.getForLink(USER_EDIT, { userId }));
  };

  const removeItem = userId => {
    return remove(userId).then(() => fetchList());
  };

  const props = { users, editLink, removeItem };

  return (
    <Layout label="User List">
      <ListView {...props} />
    </Layout>
  );
};

List.propTypes = {
  history: PropTypes.object
};

export default List;
