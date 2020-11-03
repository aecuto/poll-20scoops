import React from 'react';
import Grid from '@material-ui/core/Grid';

import { useContextAuthManager } from 'components/Auth/AuthManager';

const DashboardView = () => {
  const { userInfo } = useContextAuthManager();

  return (
    <Grid container spacing={3}>
      Welcome {userInfo.displayName} ({userInfo.email})
    </Grid>
  );
};

export default DashboardView;
