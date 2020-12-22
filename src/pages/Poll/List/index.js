import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDebouncedCallback } from 'use-debounce';

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

import routeUrlProvider, {
  POLL_SAVE,
  VOTE_RESULT
} from 'constants/route-paths';
import { reqList, reqGet, reqCreate } from 'services/poll';
import { reqShare } from 'services/share-poll';

import Snackbar from 'components/Snackbar';
import { omit } from 'lodash';
import { useContextAuthManager } from 'components/Auth/AuthManager';

import PermissionDeny from '../PermissionDeny';

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
  const { isAdmin } = useContextAuthManager();

  const [list, setList] = useState([]);
  const [message, setMessage] = useState({});
  const [search, setSearch] = useState('');
  const [lastChange, setLastChange] = useState(Date.now());

  useEffect(() => {
    reqList().then(list => setList(list));
  }, [lastChange]);

  const debounced = useDebouncedCallback(value => {
    setSearch(value);
  }, 300);

  const onCreate = () => {
    history.push(routeUrlProvider.getForLink(POLL_SAVE, { pollId: 'create' }));
  };

  const onUpdate = pollId => {
    history.push(routeUrlProvider.getForLink(POLL_SAVE, { pollId }));
  };

  const onResult = pollId => {
    history.push(routeUrlProvider.getForLink(VOTE_RESULT, { pollId }));
  };

  const onShare = data => {
    reqShare(data.title, data.id).then(() =>
      setMessage({
        text: `Poll ${data.title} have been shared.`,
        lastUpdated: Date.now()
      })
    );
  };

  const onDuplicate = pollId => {
    reqGet(pollId).then(data => {
      const newData = {
        ...omit(data, 'id'),
        title: `${data.title} (duplicate)`
      };
      reqCreate(newData).then(() => {
        setMessage({ text: 'Duplicate Success!', lastUpdated: Date.now() });
        setLastChange(Date.now());
      });
    });
  };

  if (!isAdmin) {
    return <PermissionDeny />;
  }

  return (
    <Layout>
      <Snackbar message={message} severity="success" autoHideDuration={5000} />

      <Grid container>
        <Grid item xs={12} md={8}>
          <Typography variant="h3">List</Typography>
        </Grid>
        <Grid item xs={11} md={3}>
          <FormControl fullWidth>
            <Input
              placeholder="search"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              onChange={event => debounced.callback(event.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={1} md={1} style={{ textAlign: 'right' }}>
          <IconButton onClick={onCreate}>
            <AddCircleIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Divider />

      <Grid container spacing={3}>
        {list
          .filter(data => data.title.includes(search))
          .map((data, index) => (
            <Grid item xs={12} key={data.id}>
              <Paper onClick={() => onUpdate(data.id)}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h3">
                      {`#${index + 1}. `} {data.title}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} style={{ textAlign: 'right' }}>
                    <Button
                      variant="contained"
                      style={{ marginRight: '10px' }}
                      onClick={event => {
                        event.stopPropagation();
                        onDuplicate(data.id);
                      }}
                      color="primary"
                    >
                      Duplicate
                    </Button>
                    <Button
                      variant="contained"
                      style={{ marginRight: '10px' }}
                      onClick={event => {
                        event.stopPropagation();
                        onResult(data.id);
                      }}
                    >
                      Result
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={event => {
                        event.stopPropagation();
                        onShare(data);
                      }}
                    >
                      Share
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
