import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Layout from 'components/Layout';
import Divider from 'components/Divider';
import GroupFilter from 'components/GroupFilter';

import { db, reqDelete } from 'services/share-poll';
import routeUrlProvider, {
  VOTE_ANSWER,
  VOTE_LIST
} from 'constants/route-paths';

import MuiPaper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import TimeAgo from 'react-timeago';
import AccessAlarmRoundedIcon from '@material-ui/icons/AccessAlarmRounded';
import { useTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useContextAuthManager } from 'components/Auth/AuthManager';

const Paper = styled(MuiPaper)`
  && {
    padding: 20px;
    cursor: pointer;
  }
`;

const Component = ({ history }) => {
  const { t } = useTranslation();
  const { isAdmin } = useContextAuthManager();

  const [list, setList] = useState([]);
  const [groupFilter, setGroupFilter] = useState('');

  useEffect(() => {
    if (groupFilter) {
      fetchList(5);
    }
  }, [groupFilter]);

  const fetchList = (limit = 0) => {
    const query = db
      .where('group', '==', groupFilter)
      .orderBy('created_at', 'desc');

    if (limit) {
      query.limit(limit).onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setList(list);
      });
    } else {
      query.onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setList(list);
      });
    }
  };

  const onClick = pollId => {
    history.push(routeUrlProvider.getForLink(VOTE_ANSWER, { pollId }));
  };

  const onShowAll = () => {
    fetchList();
  };

  const onDelete = shareId => {
    reqDelete(shareId);
  };

  const renderEmpty = () => {
    return (
      <>
        {!list.length && (
          <Grid item xs={12}>
            <MuiPaper variant="outlined" square style={{ padding: '20px' }}>
              <Grid container justify="center">
                <AccessAlarmRoundedIcon style={{ fontSize: '50px' }} />
                <Typography variant="h5" style={{ marginTop: '10px' }}>
                  {t('waiting_sharing')}
                </Typography>
              </Grid>
            </MuiPaper>
          </Grid>
        )}
      </>
    );
  };

  return (
    <Layout menu={VOTE_LIST}>
      <Grid container>
        <GroupFilter onSelect={setGroupFilter} />
      </Grid>

      <Divider />

      <Grid container spacing={3}>
        {!groupFilter ? null : renderEmpty()}
        {list.map((data, index) => (
          <Grid item xs={12} key={index}>
            <Paper
              onClick={() => onClick(data.pollId)}
              variant="outlined"
              square
            >
              <Typography variant="h5" paragraph>
                {`#${index + 1}. `}
                {data.title}
              </Typography>
              <Chip
                label={<TimeAgo date={data.created_at.toDate()} />}
                color={!index ? 'secondary' : 'default'}
              />

              {isAdmin ? (
                <IconButton
                  color="secondary"
                  onClick={event => {
                    event.stopPropagation();
                    onDelete(data.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              ) : null}
            </Paper>
          </Grid>
        ))}
        {list.length === 5 ? (
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button variant="outlined" onClick={() => onShowAll()}>
              {t('show_all')}
            </Button>
          </Grid>
        ) : null}
      </Grid>
    </Layout>
  );
};

Component.propTypes = {
  history: PropTypes.object
};

export default Component;
