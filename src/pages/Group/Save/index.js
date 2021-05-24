import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Layout from 'components/Layout';

import Grid from '@material-ui/core/Grid';
import MuiPaper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MuiDivider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import Delete from '@material-ui/icons/Delete';

import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import TextField from 'components/FinalForm/TextField';
import Snackbar from 'components/Snackbar';

import { reqCreate, reqGet, reqDelete, reqUpdate } from 'services/group';
import routeUrlProvider, {
  GROUP_LIST,
  GROUP_SAVE
} from 'constants/route-paths';

import { required } from 'utils/form/validators';
import { useTranslation } from 'react-i18next';

const Divider = styled(MuiDivider)`
  && {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const Paper = styled(MuiPaper)`
  && {
    padding: 20px;
    margin-bottom: 10px;
  }
`;

const Component = ({ match, history }) => {
  const { t } = useTranslation();
  const { groupId } = match.params;
  const isCreate = groupId === 'create';

  const [data, setData] = useState({});
  const [message, setMessage] = useState({});

  useEffect(() => {
    if (!isCreate) {
      reqGet(groupId).then(data => setData(data));
    }
  }, [groupId]);

  const onSubmit = values => {
    const data = values;

    if (isCreate) {
      return reqCreate(data).then(doc => {
        setMessage({ text: t('create_success'), lastUpdated: Date.now() });
        history.push(routeUrlProvider.getForLink(GROUP_LIST));
      });
    } else {
      return reqUpdate(groupId, data).then(() =>
        setMessage({ text: t('update_success'), lastUpdated: Date.now() })
      );
    }
  };

  const onDelete = () => {
    return reqDelete(groupId).then(() =>
      history.push(routeUrlProvider.getForLink(GROUP_LIST))
    );
  };

  return (
    <Layout menu={GROUP_LIST}>
      <Snackbar message={message} severity="success" />
      <Paper>
        <Grid container style={{ marginBottom: '20px' }}>
          <Grid item xs={6}>
            <Typography variant="h1">
              {isCreate ? t('create') : t('edit')}
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            {!isCreate && (
              <IconButton color="secondary" onClick={onDelete}>
                <Delete />
              </IconButton>
            )}
          </Grid>
        </Grid>

        <Form
          onSubmit={onSubmit}
          mutators={arrayMutators}
          initialValues={data}
          render={({ handleSubmit, pristine, submitting }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field
                      name="name"
                      label={t('group_name')}
                      component={TextField}
                      validate={required(t('group_name'))}
                    />
                  </Grid>
                </Grid>
                <Divider />

                <Divider />

                <Grid container justify="center">
                  <Button
                    color="primary"
                    type="submit"
                    disabled={submitting || pristine}
                    variant="contained"
                  >
                    {t('submit')}
                  </Button>
                </Grid>
              </form>
            );
          }}
        />
      </Paper>
    </Layout>
  );
};

Component.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
};

export default Component;
