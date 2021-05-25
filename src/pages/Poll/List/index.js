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
  POLL_LIST,
  POLL_SAVE,
  VOTE_RESULT
} from 'constants/route-paths';
import { reqList, reqGet, reqCreate } from 'services/poll';
import { reqShare } from 'services/share-poll';

import Snackbar from 'components/Snackbar';
import Button from 'components/Button';
import { omit } from 'lodash';
import { useContextAuthManager } from 'components/Auth/AuthManager';

import PermissionDeny from 'components/PermissionDeny';
import GroupFilter from 'components/GroupFilter';

import FileCopyIcon from '@material-ui/icons/FileCopy';
import EmojiEventsRoundedIcon from '@material-ui/icons/EmojiEventsRounded';
import ShareIcon from '@material-ui/icons/Share';
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
  const [message, setMessage] = useState({});
  const [search, setSearch] = useState('');
  const [lastChange, setLastChange] = useState(Date.now());
  const [groupFilter, setGroupFilter] = useState('');

  useEffect(() => {
    if (groupFilter) {
      reqList(groupFilter).then(list => setList(list));
    }
  }, [lastChange, groupFilter]);

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
    reqShare(data.title, data.id, data.group).then(() =>
      setMessage({
        text: `${data.title} ${t('shared')}`,
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
        setMessage({ text: t('duplicate_success'), lastUpdated: Date.now() });
        setLastChange(Date.now());
      });
    });
  };

  if (!isAdmin) {
    return <PermissionDeny />;
  }

  return (
    <Layout menu={POLL_LIST}>
      <Snackbar message={message} severity="success" autoHideDuration={5000} />

      <Grid container>
        <Grid item xs={12} md={8}>
          <GroupFilter onSelect={setGroupFilter} />
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
          .filter(data => data.title.includes(search))
          .map((data, index) => (
            <Grid item xs={12} key={data.id}>
              <Paper onClick={() => onUpdate(data.id)}>
                <Grid container spacing={3}>
                  <Typography variant="h3">
                    {`#${index + 1}. `} {data.title}
                  </Typography>

                  <Grid item xs={12} style={{ textAlign: 'right' }}>
                    <Button
                      color="primary"
                      onClick={event => {
                        event.stopPropagation();
                        onDuplicate(data.id);
                      }}
                      startIcon={<FileCopyIcon />}
                      text={t('duplicate')}
                    />
                    <Button
                      onClick={event => {
                        event.stopPropagation();
                        onResult(data.id);
                      }}
                      startIcon={<EmojiEventsRoundedIcon />}
                      text={t('result')}
                    />
                    <Button
                      color="secondary"
                      onClick={event => {
                        event.stopPropagation();
                        onShare(data);
                      }}
                      startIcon={<ShareIcon />}
                      text={t('share')}
                    />
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
