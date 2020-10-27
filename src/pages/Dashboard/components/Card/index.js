import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

// import TrendingUpIcon from '@material-ui/icons/TrendingUp';

import { useContextAuthManager } from 'components/Auth/AuthManager';

import MuiSkeleton from '@material-ui/lab/Skeleton';

const StyledAvatar = styled(Avatar)`
  && {
    width: 90%;
    height: 200px;
  }
`;

const Skeleton = styled(MuiSkeleton)`
  && {
    height: 20vh;
  }
`;

const CardComponent = ({ icon }) => {
  const { info } = useContextAuthManager();

  if (!info.name) {
    return <Skeleton variant="rect" />;
  }

  return (
    <Card>
      <CardHeader
        avatar={<Avatar>{info.name[0]}</Avatar>}
        title={info.name}
        subheader={info.email}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Box display="flex" justifyContent="center">
              <StyledAvatar variant="rounded">{icon}</StyledAvatar>
            </Box>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography gutterBottom>
              Sie suchen nach digitalen Lösungen, die Ihre Kunden begeistern, um
              die Sie der Wettbewerb beneidet, die den gesetzten
              Investitionsrahmen nicht sprengen, die sicher und zuverlässig
              funktionieren? Dann sollten wir miteinander reden!
            </Typography>
            <Typography gutterBottom>
              Als Digitalisierungspartner setzen wir alles daran, die
              Herausforderungen und Probleme unserer Kunden genau zu verstehen.
              Wir hören zu. Jede Branche hat ihre eigenen Regeln, jedes
              Unternehmen seine eigene Kultur. Wir beantworten gern Fragen zu
              Zukunftsthemen wie Blockchain oder Künstlicher Intelligenz.
              International aufgestellt, verfügen wir über eigene
              Forschungsressourcen. Das versetzt uns in die Lage, neue
              technologische Entwicklungen sehr schnell zu evaluieren und
              praktische Anwendungsszenarien zu entwickeln. Davon profitieren
              unsere Kunden.
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

CardComponent.propTypes = {
  icon: PropTypes.node
};

export default withRouter(CardComponent);
