import React from 'react';
import Grid from '@material-ui/core/Grid';

import { useContextAuthManager } from 'components/Auth/AuthManager';

const ComponentView = () => {
  const { userInfo } = useContextAuthManager();

  return (
    <Grid container spacing={3}>
      LIST {userInfo.uid}
    </Grid>
  );
};

export default ComponentView;
