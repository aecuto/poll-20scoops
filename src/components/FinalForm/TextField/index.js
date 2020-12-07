import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const TextFieldComponent = ({ input, label, meta, ...rest }) => {
  const error =
    (meta.touched && meta.error) ||
    (!meta.dirtySinceLastSubmit && meta.submitError);

  return (
    <TextField
      {...rest}
      {...input}
      id={`${input.name}-field`}
      label={label}
      variant="outlined"
      fullWidth
      error={Boolean(error)}
      helperText={error}
    />
  );
};

TextFieldComponent.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object
};

export default TextFieldComponent;
