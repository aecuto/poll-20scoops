import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Layout from 'components/Layout';
import Divider from 'components/Divider';
import GroupFilter from 'components/GroupFilter';

import { db } from 'services/share-poll';
import routeUrlProvider, {
  VOTE_ANSWER,
  VOTE_LIST
} from 'constants/route-paths';

import MuiPaper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import TimeAgo from 'react-timeago';
import AccessAlarmRoundedIcon from '@material-ui/icons/AccessAlarmRounded';
import { useTranslation } from 'react-i18next';

const Paper = styled(MuiPaper)`
  && {
    padding: 20px;
    cursor: pointer;
  }
`;

const Component = ({ history }) => {
  const { t } = useTranslation();
  const [list, setList] = useState([]);
  const [groupFilter, setGroupFilter] = useState('');

  useEffect(() => {
    if (groupFilter) {
      db.orderBy('created_at', 'desc')
        .limit(5)
        .onSnapshot(querySnapshot => {
          const list = [];
          querySnapshot.forEach(doc => {
            list.push(doc.data());
          });
          setList(list.filter(item => item.group === groupFilter));
        });
    }
  }, [groupFilter]);

  const onClick = pollId => {
    history.push(routeUrlProvider.getForLink(VOTE_ANSWER, { pollId }));
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
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

Component.propTypes = {
  history: PropTypes.object
};

export default Component;
