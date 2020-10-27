import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import MuiPaper from '@material-ui/core/Paper';

import UserForm from '../components/Form';

const Paper = styled(MuiPaper)`
  && {
    padding: 20px;
  }
`;

const CreateView = ({ onSubmit }) => {
  return (
    <Paper>
      <Typography variant="h1" gutterBottom>
        Create User
      </Typography>
      <UserForm onSubmit={onSubmit} />
    </Paper>
  );
};

CreateView.propTypes = {
  onSubmit: PropTypes.func
};

export default CreateView;
