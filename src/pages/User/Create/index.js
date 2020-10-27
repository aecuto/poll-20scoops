import PropTypes from 'prop-types';
import React from 'react';

import CreateView from './index.view';
import routeUrlProvider, { USER_LIST } from 'constants/route-paths';
import { create } from 'services/users';
import Layout from 'components/Layout';

const Create = ({ history }) => {
  const onSubmit = values => {
    create(values).then(() =>
      history.push(routeUrlProvider.getForLink(USER_LIST))
    );
  };

  const props = {
    onSubmit
  };

  return (
    <Layout label="User Create">
      <CreateView {...props} />
    </Layout>
  );
};

Create.propTypes = {
  history: PropTypes.object
};

export default Create;
