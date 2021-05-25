import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const Component = ({ input, list, label, meta }) => {
  const handleChange = event => {
    input.onChange(event.target.value);
  };

  const error =
    (meta.touched && meta.error) ||
    (!meta.dirtySinceLastSubmit && meta.submitError);

  return (
    <FormControl
      variant="outlined"
      fullWidth
      disabled={!list.length}
      error={error}
    >
      <Select {...input} onChange={handleChange} displayEmpty>
        <MenuItem value="" disabled>
          <Typography noWrap>{label}</Typography>
        </MenuItem>
        {list.map(item => (
          <MenuItem value={item.id} key={item.id}>
            <Typography noWrap>{item.name}</Typography>
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

Component.propTypes = {
  list: PropTypes.array,
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object
};

export default Component;
