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

import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';

import routeUrlProvider, {
  GROUP_LIST,
  GROUP_SAVE
} from 'constants/route-paths';
import { reqList } from 'services/group';

import Snackbar from 'components/Snackbar';
import { useContextAuthManager } from 'components/Auth/AuthManager';

import PermissionDeny from 'components/PermissionDeny';

import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const { isAdmin } = useContextAuthManager();

  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    reqList().then(list => setList(list));
  }, []);

  const debounced = useDebouncedCallback(value => {
    setSearch(value);
  }, 300);

  const onCreate = () => {
    history.push(
      routeUrlProvider.getForLink(GROUP_SAVE, { groupId: 'create' })
    );
  };

  const onUpdate = groupId => {
    history.push(routeUrlProvider.getForLink(GROUP_SAVE, { groupId }));
  };

  if (!isAdmin) {
    return <PermissionDeny />;
  }

  return (
    <Layout menu={GROUP_LIST}>
      <Grid container>
        <Grid item xs={12} md={8}>
          <Typography variant="h3">{t('list_title')}</Typography>
        </Grid>
        <Grid item xs={11} md={3}>
          <FormControl fullWidth>
            <Input
              placeholder={t('search')}
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
          .filter(data => data.name.includes(search))
          .map((data, index) => (
            <Grid item xs={12} key={data.id}>
              <Paper onClick={() => onUpdate(data.id)}>
                <Grid container spacing={3}>
                  <Typography variant="h5">
                    {index + 1}. <strong>{data.name}</strong>
                  </Typography>
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
