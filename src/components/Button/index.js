import PropTypes from 'prop-types';
import React from 'react';
import MuiButton from '@material-ui/core/Button';
import styled from 'styled-components';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import theme from 'styles/muiTheme';

const Button = styled(MuiButton)`
  && {
    margin-right: 10px;
    .MuiButton-startIcon {
      margin-right: ${({ matches }) => matches};
    }
  }
`;

const Component = ({ text, ...rest }) => {
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Button variant="contained" matches={matches ? '8px' : '0px'} {...rest}>
      {matches ? text : ''}
    </Button>
  );
};

Component.propTypes = {
  text: PropTypes.any
};

export default Component;
