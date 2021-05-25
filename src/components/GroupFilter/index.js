import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reqList } from 'services/group';

const Component = ({ onSelect }) => {
  const [list, setList] = useState([]);
  const [select, setSelect] = useState('');

  useEffect(() => {
    reqList().then(data => {
      setList(data);
      setSelect(data[0].id);
      onSelect(data[0].id);
    });
  }, []);

  const handleChange = event => {
    const { value } = event.target;
    setSelect(value);
    onSelect(value);
  };

  return (
    <Select onChange={handleChange} value={select}>
      {list.map(item => (
        <MenuItem value={item.id} key={item.id}>
          <Typography noWrap>{item.name}</Typography>
        </MenuItem>
      ))}
    </Select>
  );
};

Component.propTypes = {
  onSelect: PropTypes.func
};

export default Component;
