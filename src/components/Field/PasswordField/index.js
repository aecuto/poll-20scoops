import PropTypes from 'prop-types';
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const PasswordField = ({ input, label, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl variant="outlined" style={{ width: '100%' }}>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        {...input}
        id={`${input.name}-field`}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} edge="end">
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={70}
        {...rest}
      />
    </FormControl>
  );
};

PasswordField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string
};

export default PasswordField;
