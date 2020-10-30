import React from 'react';
import Grid from '@material-ui/core/Grid';

import { useContextAuthManager } from 'components/Auth/AuthManager';

const DashboardView = () => {
  const { info } = useContextAuthManager();
  console.log(info);
  return (
    <Grid container spacing={3}>
      Welcome {info.displayName} ({info.email})
    </Grid>
  );
};

export default DashboardView;
