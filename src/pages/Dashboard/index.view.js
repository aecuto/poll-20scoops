import React from 'react';
import Grid from '@material-ui/core/Grid';

import Card from './components/Card';
import PeopleIcon from '@material-ui/icons/People';
import UpdateIcon from '@material-ui/icons/Update';
import TimelineIcon from '@material-ui/icons/Timeline';
import ExtensionIcon from '@material-ui/icons/Extension';

const DashboardView = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card icon={<PeopleIcon style={{ fontSize: '5em' }} />} />
      </Grid>
      <Grid item xs={12}>
        <Card icon={<UpdateIcon style={{ fontSize: '5em' }} />} opacity />
      </Grid>
      <Grid item xs={12}>
        <Card icon={<TimelineIcon style={{ fontSize: '5em' }} />} />
      </Grid>
      <Grid item xs={12}>
        <Card icon={<ExtensionIcon style={{ fontSize: '5em' }} />} opacity />
      </Grid>
    </Grid>
  );
};

export default DashboardView;
