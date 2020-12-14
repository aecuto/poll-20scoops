import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Layout from 'components/Layout';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MuiDivider from '@material-ui/core/Divider';
import MuiPaper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import routeUrlProvider, { POLL_SAVE } from 'constants/route-paths';
import { reqList } from 'services/poll';
import { reqShare } from 'services/share-poll';

const Paper = styled(MuiPaper)`
  && {
    padding: 20px;
    cursor: pointer;
  }
`;

const Divider = styled(MuiDivider)`
  && {
    margin-bottom: 20px;
  }
`;

const Component = ({ history }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    reqList().then(list => setList(list));
  }, []);

  const onCreate = () => {
    history.push(routeUrlProvider.getForLink(POLL_SAVE, { pollId: 'create' }));
  };

  const onUpdate = pollId => {
    history.push(routeUrlProvider.getForLink(POLL_SAVE, { pollId }));
  };

  return (
    <Layout>
      <Grid container>
        <Grid item xs={8}>
          <Typography variant="h3">List</Typography>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <Input
              placeholder="search"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={1} style={{ textAlign: 'right' }}>
          <IconButton onClick={onCreate}>
            <AddCircleIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Divider />

      <Grid container spacing={3}>
        {list.map(data => (
          <Grid item xs={12} key={data.id}>
            <Paper onClick={() => onUpdate(data.id)}>
              <Grid container>
                <Grid item xs={6}>
                  {data.title}
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'right' }}>
                  <Button
                    variant="contained"
                    onClick={event => {
                      event.stopPropagation();
                      reqShare(data.title, data.id);
                    }}
                  >
                    Share Poll
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

Component.propTypes = {
  history: PropTypes.any
};

export default Component;
