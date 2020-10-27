import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import MuiPaper from '@material-ui/core/Paper';

import UserForm from '../components/Form';

import MuiSkeleton from '@material-ui/lab/Skeleton';

const Paper = styled(MuiPaper)`
  && {
    padding: 20px;
  }
`;

const Skeleton = styled(MuiSkeleton)`
  && {
    height: 20vh;
  }
`;

const EditView = ({ user, onSubmit }) => {
  if (!user.id) {
    return <Skeleton animation="wave" variant="rect" />;
  }

  return (
    <Paper>
      <Typography variant="h1" gutterBottom>
        Edit User
      </Typography>
      <UserForm onSubmit={onSubmit} initialValues={user} />
    </Paper>
  );
};

EditView.propTypes = {
  onSubmit: PropTypes.func,
  user: PropTypes.object
};

export default EditView;
