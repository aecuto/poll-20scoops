import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Layout from 'components/Layout';
import { db } from 'services/vote';
import { reqGet } from 'services/poll';

import count from '../Result/count';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from 'components/Button';

import LinearProgress from './LinearProgress';
import styled from 'styled-components';
import { VOTE_LIST } from 'constants/route-paths';
import { useTranslation } from 'react-i18next';
import { getList } from 'services/user';
import { CSVLink } from 'react-csv';
import DescriptionIcon from '@material-ui/icons/Description';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useContextAuthManager } from 'components/Auth/AuthManager';

const Space = styled.div`
  margin-bottom: 20px;
`;

const Component = ({ match, history }) => {
  const { t } = useTranslation();
  const { isAdmin } = useContextAuthManager();

  const { pollId } = match.params;
  const [data, setData] = useState({});
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const poll = await reqGet(pollId);
    db.where('pollId', '==', pollId).onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        list.push(doc.data());
      });
      setData(count(poll, list));
      setList(list);
    });
  };

  const onBack = () => {
    history.goBack();
  };

  const csvData = () => {
    const userList = getList();

    const headers = [
      { label: 'Name', key: 'displayName' },
      { label: 'Email', key: 'email' },
      { label: 'Answer', key: 'answer' }
    ];

    const data = [];
    list.forEach(value => {
      const user = userList[value.uid];
      const newData = {
        displayName: user.displayName,
        email: user.email,
        answer: value.answer
      };
      data.push(newData);
    });

    return { data, headers };
  };

  const renderData = () => {
    return (
      <Paper style={{ padding: '20px' }}>
        <Grid container justify="center">
          <Typography variant="h6">{data.title}</Typography>
        </Grid>
        <Grid container justify="center">
          <Typography>{`(${data.total} total votes)`}</Typography>
        </Grid>

        <Space />

        <Grid container justify="center">
          <Grid item xs={12} md={6}>
            {data.result.map((value, index) => (
              <LinearProgress
                key={index}
                percentage={value.percentage}
                label={value.label}
                count={value.count}
              />
            ))}
          </Grid>
        </Grid>

        <Space />

        <Grid container justify="center">
          {isAdmin && (
            <CSVLink
              data={csvData().data}
              headers={csvData().headers}
              filename={`${data.title}-${data.group}.csv`}
              style={{ textDecoration: 'none' }}
            >
              <Button
                style={{ marginRight: '10px', marginButtom: '10px' }}
                text={t('user_voted_csv')}
                startIcon={<DescriptionIcon />}
              />
            </CSVLink>
          )}

          <Button
            onClick={() => onBack()}
            color="secondary"
            text={t('back')}
            startIcon={<ArrowBackIcon />}
          />
        </Grid>
      </Paper>
    );
  };

  return <Layout menu={VOTE_LIST}>{data.title ? renderData() : null}</Layout>;
};

Component.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
};

export default Component;
