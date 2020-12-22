import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'components/Layout';

import Button from '@material-ui/core/Button';

import routeUrlProvider, { VOTE_LIST } from 'constants/route-paths';
import { withRouter } from 'react-router-dom';

import NoEncryptionIcon from '@material-ui/icons/NoEncryption';

const Component = ({ history }) => {
  const onBack = () => {
    history.push(routeUrlProvider.getForLink(VOTE_LIST));
  };

  return (
    <Layout>
      <Button
        onClick={() => onBack()}
        variant="outlined"
        color="secondary"
        endIcon={<NoEncryptionIcon />}
        size="large"
      >
        Permission Deny
      </Button>
    </Layout>
  );
};

Component.propTypes = {
  history: PropTypes.object
};

export default withRouter(Component);
