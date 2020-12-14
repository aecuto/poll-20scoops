import PropTypes from 'prop-types';
import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const Component = ({ input, label, ...rest }) => {
  const handleChange = event => {
    input.onChange(event.target.value);
  };

  return (
    <FormControlLabel
      value={label}
      control={<Radio color="primary" />}
      label={label}
      onChange={handleChange}
      checked={label === input.value}
      {...rest}
    />
  );
};

Component.propTypes = {
  input: PropTypes.object,
  label: PropTypes.any
};

export default Component;
