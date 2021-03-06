import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { Form, Field } from 'react-final-form';
import styled from 'styled-components';

import Layout from 'components/Layout';
import { reqGet } from 'services/poll';
import { reqVote, getVote } from 'services/vote';

import MuiPaper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from 'components/Button';

import Radio from 'components/FinalForm/Radio';
import routeUrlProvider, {
  VOTE_LIST,
  VOTE_RESULT
} from 'constants/route-paths';
import { useContextAuthManager } from 'components/Auth/AuthManager';
import { useTranslation } from 'react-i18next';

import EmojiEventsRoundedIcon from '@material-ui/icons/EmojiEventsRounded';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Paper = styled(MuiPaper)`
  && {
    padding: 20px;
  }
`;

const Component = ({ match, history }) => {
  const { t } = useTranslation();
  const { pollId } = match.params;
  const { userInfo } = useContextAuthManager();

  const [data, setData] = useState({});
  const [voteData, setVoteData] = useState({});
  const isDiabled = !!voteData.answer;

  useEffect(() => {
    if (userInfo.uid) {
      fetchData();
    }
  }, [userInfo.uid]);

  const fetchData = () => {
    reqGet(pollId).then(setData);
    getVote(pollId, userInfo.uid).then(setVoteData);
  };

  const onSubmit = values => {
    const data = { ...values, uid: userInfo.uid };
    return reqVote(data).then(() => onResult());
  };

  const onResult = () => {
    history.push(routeUrlProvider.getForLink(VOTE_RESULT, { pollId }));
  };

  const onBack = () => {
    history.push(routeUrlProvider.getForLink(VOTE_LIST));
  };

  const renderVoteAnswer = () => {
    return (
      <Paper>
        <Grid container justify="center">
          <Grid item xs={12} md={6}>
            <Grid container>
              <Typography variant="h5">{data.title}</Typography>
            </Grid>
            <Divider style={{ marginBottom: '20px' }} />
            <Form
              onSubmit={onSubmit}
              initialValues={{ ...voteData, pollId: data.id }}
              render={({ handleSubmit, submitting, pristine }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3} justify="center">
                    {data.answer.map((answer, index) => (
                      <Grid item xs={12} key={index}>
                        <Field
                          name="answer"
                          component={Radio}
                          label={answer.label}
                          disabled={isDiabled}
                        />
                      </Grid>
                    ))}
                  </Grid>

                  <Divider style={{ marginBottom: '20px' }} />

                  <Grid container>
                    <Grid item xs={12} style={{ textAlign: 'right' }}>
                      <Button
                        type="submit"
                        color="primary"
                        disabled={pristine || submitting || isDiabled}
                        text={t('vote')}
                        startIcon={<ThumbUpAltRoundedIcon />}
                      />
                      <Button
                        onClick={() => onResult()}
                        text={t('result')}
                        startIcon={<EmojiEventsRoundedIcon />}
                      />
                      <Button
                        onClick={() => onBack()}
                        color="secondary"
                        text={t('back')}
                        startIcon={<ArrowBackIcon />}
                      />
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  };

  return (
    <Layout menu={VOTE_LIST}>{data.title ? renderVoteAnswer() : null}</Layout>
  );
};

Component.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
};

export default Component;
