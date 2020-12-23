import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import MuiLinearProgress from '@material-ui/core/LinearProgress';

import Typography from '@material-ui/core/Typography';
import { formatPercent } from 'utils/numeral';
import { useTranslation } from 'react-i18next';

const Wraper = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const LinearProgress = styled(MuiLinearProgress)`
  && {
    height: 35px;
  }
`;

const LinearProgressText = styled(Typography)`
  && {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    margin-top: -30px;
  }
`;

const Component = ({ percentage, label, count }) => {
  const { t } = useTranslation();
  return (
    <Wraper>
      <Typography variant="h5">{`${label} (${count} ${t(
        'votes'
      )})`}</Typography>
      <LinearProgress variant="determinate" value={percentage * 100} />
      <LinearProgressText>{formatPercent(percentage)}</LinearProgressText>
    </Wraper>
  );
};

Component.propTypes = {
  count: PropTypes.any,
  label: PropTypes.any,
  percentage: PropTypes.number
};

export default Component;
